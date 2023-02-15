import { IShallowUser } from "./users";

export interface IBadge {
  award_count: number;
  badge_id: number;
  badge_type: string;
  link: string;
  name: string;
  rank: "gold" | "silver" | "bronze";
  user: IShallowUser;
}
