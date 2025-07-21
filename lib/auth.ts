import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}
