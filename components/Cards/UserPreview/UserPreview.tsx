import { useDefaultImageOnError } from "@/hooks/useDefaultImageOnError";
import { IUser } from "@/interfaces/users";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  user: IUser;
};

const UserPreview: FC<Props> = ({ user }) => {
  const [ownerImage, onImageError] = useDefaultImageOnError(user.profile_image);
  return (
    <Link href={user.user_id ? `/users/${user.user_id}` : user.link}>
      <Box
        bgcolor="background.paper"
        className="flex flex-col items-center gap-2 px-10 py-5 shadow-lg rounded-sm w-[250px]"
      >
        <img
          className="w-28 h-28 object-cover rounded-sm"
          src={ownerImage}
          onError={onImageError}
          // TODO alts
          alt=""
        />
        <Typography color="text.primary" variant="h6" className="font-light">
          {user.display_name}
        </Typography>
        <Typography
          color="text.primary"
          variant="body2"
          className="font-normal"
        >
          Reputation: {user.reputation}
        </Typography>
      </Box>
    </Link>
  );
};

export default UserPreview;
