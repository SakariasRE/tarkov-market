import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";

export { hashPassword, verifyPassword };

const SESSION_COOKIE = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "dev-only-secret-change-me";
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(userId: number): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${userId}.${expiresAt}`;

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string): number | null {
  const parts = token.split(".");

  if (parts.length !== 3) return null;

  const [rawUserId, rawExpiresAt, signature] = parts;
  const payload = `${rawUserId}.${rawExpiresAt}`;
  const expected = sign(payload);

  if (signature.length !== expected.length) return null;

  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  if (Number(rawExpiresAt) < Date.now()) return null;

  const userId = Number(rawUserId);

  return Number.isInteger(userId) ? userId : null;
}

export async function setSessionCookie(userId: number): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const userId = verifySessionToken(token);

  if (userId === null) return null;

  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });
}
