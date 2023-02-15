import Joi from "joi";

export const tagQuerySchema = Joi.object({
  page: Joi.number().min(1).optional(),
  pagesize: Joi.number().min(1).max(100).optional(),
  todate: Joi.number().optional(),
  fromdate: Joi.number().optional(),
  max: Joi.number().optional(),
  min: Joi.number().optional(),
  order: Joi.string()
    .regex(/^(desc|asc)$/)
    .optional(),
  sort: Joi.string()
    .regex(/^(popular|activity|name)$/)
    .optional(),
  inname: Joi.string().optional(),
});
