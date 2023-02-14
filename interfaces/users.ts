export interface IUserApiResponse {
  backoff: number;
  has_more: boolean;
  items: IUser[];
  quota_max: number;
  quota_remaining: number;
}

export interface IUser {
  accept_rate: number;
  account_id: number;
  badge_counts: IUserBadges;

  collectives: ICollective[];
  creation_date: number;
  display_name: string;
  is_employee: boolean;
  last_access_date: number;
  last_modified_date: number;
  link: string;
  location: string;
  profile_image: string;
  reputation: number;
  reputation_change_day: number;
  reputation_change_month: number;
  reputation_change_quarter: number;
  reputation_change_week: number;
  reputation_change_year: number;
  user_id: number;
  user_type: string;
  website_url: string;

  topTags?: string[];
}

export interface ICollective {}

export interface IUserBadges {
  bronze: number;
  gold: number;
  silver: number;
}

export interface IUserQueryParams {
  page?: number;
  pageSize?: number;

  todate?: number;
  fromdate?: number;

  max?: number;
  min?: number;

  order: "desc" | "asc";
  sort: "reputation" | "creation" | "name" | "modified";

  ids: string;
}
