"use server";

import prisma from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { wait } from "@/lib/utils";
import { loginSchema, LoginSchema } from "@/schema/loginSchema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(values: LoginSchema) {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  if (!user.password?.length) {
    return {
      errors: {
        password: ["Password not set"],
      },
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password!);
  if (!isPasswordValid) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name!,
    profile: user.profile!,
  });

  redirect("/admin");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
