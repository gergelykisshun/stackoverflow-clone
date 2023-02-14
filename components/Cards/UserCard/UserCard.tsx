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
    <div className="flex">
      <img
        className="w-5 h-5 object-cover rounded-sm"
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
            gutterBottom
          >
            {user.display_name}
          </Typography>
        </Link>
        {user.location && <p>{user.location}</p>}
        <p>{user.accept_rate}</p>
        <p>{user.reputation}</p>
        {user.topTags &&
          user.topTags.map((tag) => (
            <TagButton tag={tag} key={Math.random() + tag} />
          ))}
      </div>
    </div>
  );
};

export default UserCard;
