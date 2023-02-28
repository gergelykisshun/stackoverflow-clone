import { boolean, number, object, string } from "yup";

export const advancedSearchFrontendSchema = object({
  q: string().optional(),
  body: string().optional(),
  title: string().optional(),
  tagged: string().optional(),
  accepted: boolean().optional(),
  closed: boolean().optional(),
  answers: number().min(1).optional(),
});
