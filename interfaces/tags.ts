export interface ITag {
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  name: string;
  user_id?: number;
}
