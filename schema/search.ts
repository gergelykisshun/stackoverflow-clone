import Joi from "joi";

export const searchQuerySchema = Joi.object({
  page: Joi.number().optional(),
  pagesize: Joi.number().optional(),
  todate: Joi.number().optional(),
  fromdate: Joi.number().optional(),
  max: Joi.number().optional(),
  min: Joi.number().optional(),
  order: Joi.string()
    .regex(/^(desc|asc)$/)
    .optional(),
  sort: Joi.string()
    .regex(/^(activity|votes|creation|relevance)$/)
    .optional(),
  intitle: Joi.string().optional(),
  tagged: Joi.string().optional(),
  nottagged: Joi.string().optional(),
});
