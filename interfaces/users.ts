import { CollectiveType, UserType } from "@/enums/user";
import { IGenericApiQuery } from "./generic";
import { ITag } from "./tags";

export interface IShallowUser {
  accept_rate?: number;
  account_id: number;
  display_name?: string;
  link?: string;
  profile_image?: string;
  reputation: number;
  user_id?: number;
  user_type: UserType;
}

export interface IUser {
  accept_rate?: number;
  account_id: number;
  age?: number;
  badge_counts: IUserBadges;
  collectives?: ICollective[];
  creation_date: number;
  display_name: string;
  is_employee: boolean;
  last_access_date: number;
  last_modified_date?: number;
  link: string;
  location?: string;
  profile_image: string;
  reputation: number;
  reputation_change_day: number;
  reputation_change_month: number;
  reputation_change_quarter: number;
  reputation_change_week: number;
  reputation_change_year: number;
  user_id: number;
  user_type: UserType;
  website_url?: string;

  // added
  topTags?: ITag[];
}

export interface ICollective {
  description: string;
  external_links: ICollectiveExternalLink;
  link: string;
  name: string;
  slug: string;
  tags: string[];
}

export interface ICollectiveExternalLink {
  link: string;
  type: CollectiveType;
}

export interface IUserBadges {
  bronze: number;
  gold: number;
  silver: number;
}

export interface IUserQueryParams extends IGenericApiQuery {
  sort?: "reputation" | "creation" | "name" | "modified";
  inname?: string;
}

export interface IUserStat {
  count: number;
  text: string;
}
