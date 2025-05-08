import "server-only";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { getIronSession, type IronSession } from 'iron-session';

import type { User } from "@prisma/client";
import { cookies } from "next/headers";
import { SessionPayload } from "@/actions/auth";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  user: User
): Promise<IronSession<SessionPayload>> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = await getIronSession<SessionPayload>(await cookies(), { cookieName: "session", password: process.env.SESSION_SECRET!, cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  } })
  session.email = user.email;
  session.id = sessionId;
  session.userId = user.id;
  session.profile = user.profile!;
  session.name = user.name!;
  session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).getTime()
  await session.save();
  return session;
}

export async function validateSessionToken(
): Promise<SessionValidationResult> {  
  const result = await getIronSession<SessionPayload>(await cookies(), { password:  process.env.SESSION_SECRET!, cookieName: "session" });
  if (result === null) {
    return null
  }

  if (Date.now() >= result!.expiresAt) {
    result.destroy()
    return null
  }
  return result
}

export async function invalidateSession(): Promise<void> {
  const result = await getIronSession<SessionPayload>(await cookies(), { password:  process.env.SESSION_SECRET!, cookieName: "session" });
  result.destroy()
}

export type SessionValidationResult =
  |IronSession<SessionPayload>
  | null
