import Joi from "joi";

export { validateMiddleware };

async function validateMiddleware(req: Request, schema: Joi.ObjectSchema) {
  if (!schema) return;

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const body = await req.json();

  const { error, value } = schema.validate(body, options);

  if (error) {
    throw `Validation error: ${error.details.map((x) => x.message).join(", ")}`;
  }

  req.json = () => value;
}
