// import joi from "joi";

import { usersRepo } from "@/app/_helpers/server";
import { apiHandler } from "@/app/_helpers/server/api";

module.exports = apiHandler({
  POST: createProfile,
});

async function createProfile(req: Request) {
  const body = await req.json();
  await usersRepo.createProfile(body);
}

// To do - create profile schema
