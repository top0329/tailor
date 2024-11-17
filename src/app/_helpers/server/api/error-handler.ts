import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export { errorHandler };

function errorHandler(err: Error | string) {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return NextResponse.json({ message: err }, { status: statusCode });
  }

  if (err.name === "JsonWebTokenError") {
    // jwt authentication error
    cookies().delete("authorization");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.error(err);
  return NextResponse.json({ message: err.message }, { status: 500 });
}
