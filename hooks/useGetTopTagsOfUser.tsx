import { getUserTagsByUserId } from "@/axios/users";
import { ITag } from "@/interfaces/tags";
import { IUser } from "@/interfaces/users";
import { useTagStore } from "@/store/userTagsStore";
import { useCallback, useEffect, useState } from "react";

const useGetTopTagsOfUser = (
  user: IUser,
  numberOfTags: number = 5
): [ITag[], boolean] => {
  const tagsInCache = useTagStore((state) => state.tags);
  const addNewTags = useTagStore((state) => state.addNewTags);
  const [tagsOfUser, setTagsOfUser] = useState<ITag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTagsOfUser = useCallback(async () => {
    if (user.user_id) {
      try {
        const topTags = await getUserTagsByUserId(user.user_id, numberOfTags);
        addNewTags(topTags);
        setTagsOfUser(topTags);
      } catch (e) {
        console.log("Failed to fetch tags!");
      }
    }
    setLoading(false);
  }, [addNewTags, user]);

  useEffect(() => {
    if (loading && user.user_id) {
      if (tagsInCache[user.user_id]) {
        setTagsOfUser(tagsInCache[user.user_id]);
        setLoading(false);
      } else {
        fetchTagsOfUser();
      }
    }
  }, [user]);

  return [tagsOfUser, loading];
};

export default useGetTopTagsOfUser;
