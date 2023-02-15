import Joi from "joi";

const validateSchema = async (
  objectToValidate: Record<any, unknown>,
  joiSchema: Joi.ObjectSchema<any>
) => {
  return Joi.attempt(objectToValidate, joiSchema);
};

export default validateSchema;
