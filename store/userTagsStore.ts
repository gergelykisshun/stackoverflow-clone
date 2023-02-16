import { ITag } from "@/interfaces/tags";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TagsState {
  tags: TagRecord;
}

export type TagRecord = Record<number, ITag[]>;

interface TagsActions {
  addNewTags: (tags: ITag[]) => void;
}

const initialState: TagsState = {
  tags: {},
};

export const useTagStore = create(
  persist<TagsState & TagsActions>(
    (set, get) => ({
      ...initialState,
      addNewTags: (tags) =>
        set(() => {
          const currentTags = get().tags;
          const newTags = {};

          console.log("CURRENT TAGS", currentTags);

          tags.forEach((tag) => {
            if (tag.user_id) {
              if (currentTags[tag.user_id]) {
                const currentArray = currentTags[tag.user_id];
                return (currentTags[tag.user_id] = [...currentArray, tag]);
              }

              return (currentTags[tag.user_id] = [tag]);
            }
          });

          console.log("END", currentTags);

          return { tags: { ...currentTags } };
        }),
    }),
    {
      name: "user-tags",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
