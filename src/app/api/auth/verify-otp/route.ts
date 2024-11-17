import { cookies } from "next/headers";
import Joi from "joi";

import { usersRepo } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";

module.exports = apiHandler({
  POST: verifyOTP,
});

async function verifyOTP(req: Request) {
  const body = await req.json();

  const { user, token } = await usersRepo.verifyOTP(body);

  cookies().set("authorization", token, { httpOnly: true });

  return user;
}

verifyOTP.schema = Joi.object({
  otp: Joi.number().required(),
  email: Joi.string().email().required(),
});
