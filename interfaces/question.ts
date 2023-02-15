export interface IQuestion {
  answer_count: number;
  content_license: string;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  link: string;
  owner: IQuestionOwner;
  question_id: number;
  score: number;
  tags: string[];
  title: string;
  view_count: number;
}

export interface IQuestionOwner {
  reputation: number;
  user_id: number;
  user_type: string;
  accept_rate: number;
  profile_image: string;
  display_name: string;
  link: string;
}

export interface IQuestionQueryParams {}
