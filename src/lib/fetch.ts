import { cookies } from "next/headers";
import { BASE_URL } from "./constants";

const getHeaders = () => ({ Cookie: cookies().toString() });

export const POST = async (route: string, body: any) => {
  const res = await fetch(`${BASE_URL}${route}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
  });
  return await res.json();
};
