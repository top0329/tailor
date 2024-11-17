import joi from "joi";

import { usersRepo } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";

module.exports = apiHandler({
  POST: createProfile,
});

async function createProfile(req: Request) {
  const body = await req.json();
  await usersRepo.createProfile(body);
}

createProfile.schema = joi.object({
  profile: joi.object({
    invitationCode: joi.string(),
    personalInfo: joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      birth: joi.date().required(),
      gender: joi.string().required(),
    }),
    interests: joi.array().items(joi.string()),
  }),
});
