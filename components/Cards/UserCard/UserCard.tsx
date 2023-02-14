import TagButton from "@/components/TagButton/TagButton";
import { useDefaultImageOnError } from "@/hooks/useDefaultImageOnError";
import { IUser } from "@/interfaces/users";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  user: IUser;
};

const UserCard: FC<Props> = ({ user }) => {
  const [ownerImage, onImageError] = useDefaultImageOnError(user.profile_image);

  return (
    <div className="flex gap-2">
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
          {user.topTags &&
            user.topTags.map((tag) => (
              <TagButton tag={tag.name} key={Math.random() + tag.name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
