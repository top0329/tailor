import { AUTH_SECRET } from "@/lib/constants";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getId = async (req: NextRequest) => {
  const auth = req.cookies.get("Authentication")?.value;
  if (!auth) return;
  const decoded = jwt.verify(auth, AUTH_SECRET);

  console.log(decoded);
  const user = (decoded as { user: string }).user;

  return user;
};
