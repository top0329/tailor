import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { JWT_SECRET } from "@/constants/env";
import { usersRepo } from "./users-repo";

export const auth = {
  isAuthenticated,
  verifyToken,
  isProfileFilled,
};

function isAuthenticated() {
  try {
    verifyToken();
    return true;
  } catch {
    return false;
  }
}

function verifyToken() {
  const token = cookies().get("authorization")?.value ?? "";
  const decoded = jwt.verify(token, JWT_SECRET);
  const id = decoded.sub as string;
  return id;
}

function isProfileFilled() {
  try {
    const id = verifyToken();
    return usersRepo.isProfileFilled(id);
  } catch {
    return false;
  }
}
