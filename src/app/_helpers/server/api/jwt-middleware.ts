import { NextRequest } from "next/server";

import { auth } from "../auth";

export { jwtMiddleware };

async function jwtMiddleware(req: NextRequest) {
  if (isPublicPath(req)) return;
  const id = auth.verifyToken();

  req.headers.set("userId", id);
}

function isPublicPath(req: NextRequest) {
  const publicPaths = ["POST:/api/auth/register", "POST:/api/auth/verify-otp"];
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}
