import Joi from "joi";

import { usersRepo } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";

module.exports = apiHandler({
  POST: register,
});

async function register(req: Request) {
  const body = await req.json();
  console.log("register body => ", body);
  await usersRepo.create(body);
}

register.schema = Joi.object({
  email: Joi.string().email().required(),
});
