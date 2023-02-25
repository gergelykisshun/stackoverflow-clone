import Joi from "joi";

export const searchQuerySchema = Joi.object({
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
    .regex(/^(activity|votes|creation|relevance)$/)
    .optional(),
  intitle: Joi.string().optional(),
  tagged: Joi.string().optional(),
  nottagged: Joi.string().optional(),
});

export const stackExchangeBooleanFieldValidator = Joi.string()
  .regex(/^(True|False)$/)
  .optional();

export const advancedSearchQuerySchema = Joi.object({
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
    .regex(/^(activity|votes|creation|relevance)$/)
    .optional(),
  // unique fields for advanced search
  // strings
  q: Joi.string().optional(),
  nottagged: Joi.string().optional(),
  tagged: Joi.string().optional(),
  url: Joi.string().optional(),
  body: Joi.string().optional(),
  title: Joi.string().optional(),
  // numbers
  user: Joi.number().optional(),
  answers: Joi.number().optional(),
  views: Joi.number().optional(),
  // booleans
  accepted: stackExchangeBooleanFieldValidator,
  closed: stackExchangeBooleanFieldValidator,
  wiki: stackExchangeBooleanFieldValidator,
  migrated: stackExchangeBooleanFieldValidator,
  notice: stackExchangeBooleanFieldValidator,
});
