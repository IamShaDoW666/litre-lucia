import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import { redirect } from "next/navigation";
import prisma from "./prisma";

export const verifySession = cache(async () => {
  console.log("VERIFYING SESSION");
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.id) {
    redirect("/login");
  }

  return { isAuth: true, userData: session };
});

export const getUser = cache(async () => {
  console.log("Fetching user from DB");
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.userData.id as string,
      },
    });
    return user;
  } catch (error) {
    console.log("Failed to fetch user", error);
    return null;
  }
});
