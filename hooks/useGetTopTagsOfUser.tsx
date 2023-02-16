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

  console.log("WHAT IS THIS FUNC", addNewTags);

  const fetchTagsOfUser = useCallback(async () => {
    try {
      const topTags = await getUserTagsByUserId(user.user_id, numberOfTags);
      addNewTags(topTags);
      setTagsOfUser(topTags);
    } catch (e) {
      console.log("Failed to fetch tags!");
      console.log(e);
    }
  }, [addNewTags]);

  useEffect(() => {
    if (loading) {
      console.log("USE EFFECT START");
      console.log("TAGS IN CACHE", tagsInCache);
      if (tagsInCache[user.user_id]) {
        // TODO EXPIRY
        console.log("TAGS FROM STORE");
        setTagsOfUser(tagsInCache[user.user_id]);
      } else {
        console.log("TAGS FETCHED");
        fetchTagsOfUser();
      }
      console.log("Loading to false");
      setLoading(false);
    }
  }, []);

  return [tagsOfUser, loading];
};

export default useGetTopTagsOfUser;
