import { NextRequest, NextResponse } from "next/server";

import { jwtMiddleware, errorHandler, validateMiddleware } from "./";

export { apiHandler };

function apiHandler(handler: any) {
  const wrappedHandler: any = {};
  const httpMethods = ["GET", "POST", "PUT", "DELETE"];

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== "function") return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        const json = await req.json();
        req.json = () => json;
      } catch {}

      try {
        // global middleware
        await jwtMiddleware(req);
        await validateMiddleware(req, handler[method].schema);

        const responseBody = await handler[method](req, ...args);
        return NextResponse.json(responseBody || {});
      } catch (err: any) {
        // global error handler
        return errorHandler(err);
      }
    };
  });

  return wrappedHandler;
}
