"use server";

export type SessionPayload = {
  id: string;
  email: string;
  name: string;
  profile: string;
  userId: string;
  expiresAt: number;
};

import { generateSessionToken, invalidateSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/auth";

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

  const token = generateSessionToken();
  await createSession(token, user);
  redirect("/admin");
}

export async function logoutAction() {
  await invalidateSession();
  redirect("/login");
}
