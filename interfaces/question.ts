import { IGenericApiQuery } from "./generic";
import { ICollective, IShallowUser } from "./users";

export interface IQuestion {
  accepted_answer_id?: number;
  answer_count: number;
  bounty_amount?: number;
  bounty_closes_date?: number;
  closed_date?: number;
  closed_reason?: string;
  collectives: ICollective[];
  community_owned_date?: string;
  content_license: string;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  last_edit_date?: number;
  link: string;
  locked_date?: number;
  owner?: IShallowUser;
  posted_by_collectives: ICollective[];
  protected_date?: number;
  question_id: number;
  score: number;
  tags: string[];
  title: string;
  view_count: number;
}

export interface IQuestionQueryParams extends IGenericApiQuery {
  sort?: "activity" | "votes" | "creation" | "hot" | "week" | "month";
  tagged?: string;
}
