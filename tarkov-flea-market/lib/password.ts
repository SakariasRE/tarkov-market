import { randomBytes, scrypt, timingSafeEqual } from "crypto";

function scryptAsync(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt);

  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [salt, key] = stored.split(":");

  if (!salt || !key) return false;

  const derivedKey = await scryptAsync(password, salt);
  const storedKey = Buffer.from(key, "hex");

  if (storedKey.length !== derivedKey.length) return false;

  return timingSafeEqual(storedKey, derivedKey);
}
