import { ICollective, IShallowUser } from "./users";

export interface IAnswer {
  answer_id: number;
  collectives: ICollective[];
  community_owned_date?: number;
  content_license: string;
  creation_date: number;
  is_accepted: boolean;
  last_activity_date: number;
  last_edit_date?: number;
  locked_date?: number;
  owner: IShallowUser;
  posted_by_collectives: ICollective[];
  question_id: number;
  score: number;
}
