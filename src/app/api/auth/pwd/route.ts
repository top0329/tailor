import Joi from "joi";

import { usersRepo } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";

module.exports = apiHandler({
  POST: createPwd,
});

async function createPwd(req: Request) {
  const body = await req.json();
  await usersRepo.createPwd(body);
}

createPwd.schema = Joi.object({
  pwd: Joi.string().required(),
});
