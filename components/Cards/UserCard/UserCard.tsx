import TagButton from "@/components/TagButton/TagButton";
import useGetTopTagsOfUser from "@/hooks/useGetTopTagsOfUser";
import { useDefaultImageOnError } from "@/hooks/useDefaultImageOnError";
import { IUser } from "@/interfaces/users";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import ButtonSkeleton from "@/components/Skeletons/ButtonSkeleton/ButtonSkeleton";

type Props = {
  user: IUser;
};

const UserCard: FC<Props> = ({ user }) => {
  const [ownerImage, onImageError] = useDefaultImageOnError(user.profile_image);

  const [tagsOfUser, loading] = useGetTopTagsOfUser(user);

  return (
    <div className="flex gap-2 w-[265px] mx-auto">
      <img
        className="w-10 h-10 object-cover rounded-sm"
        src={ownerImage}
        onError={onImageError}
        alt=""
      />

      {/* user details */}
      <div className="flex flex-col">
        <Link href={`/users/${user.user_id}`}>
          <Typography
            color="primary.main"
            variant="body1"
            className="font-semibold"
          >
            {user.display_name}
          </Typography>
        </Link>
        {user.location && <p className="mb-1">{user.location}</p>}
        <Typography
          color="success.light"
          variant="button"
          className="text-xs flex items-center"
        >
          accept rate: {user.accept_rate || 0}
        </Typography>
        <Typography
          color="warning.main"
          variant="button"
          className="text-xs flex items-center mb-2"
        >
          reputation: {user.reputation}
        </Typography>
        <div className="flex flex-wrap gap-2">
          {loading
            ? new Array(5).fill(0).map((el, i) => <ButtonSkeleton key={i} />)
            : tagsOfUser
                .slice(0, 5)
                .map((tag) => (
                  <TagButton tag={tag.name} key={Math.random() + tag.name} />
                ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
