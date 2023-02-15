import Joi from "joi";

export const userQuerySchema = Joi.object({
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
    .regex(/^(reputation|creation|name|modified)$/)
    .optional(),
  ids: Joi.string().optional(),
});
