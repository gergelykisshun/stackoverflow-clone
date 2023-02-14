import { getUserById } from "@/axios/users";
import { useDefaultImageOnError } from "@/hooks/useDefaultImageOnError";
import { IUser } from "@/interfaces/users";
import durationFromEpochUntilNow from "@/utility/durationFromEpochUntilNow";
import { Paper, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";

type Props = {
  user: IUser;
};

const UserProfilePage: NextPage<Props> = ({ user }) => {
  const [ownerImage, onImageError] = useDefaultImageOnError(user.profile_image);

  return (
    <div>
      {/* Picture + Details */}
      <div className="flex flex-col gap-5 md:flex-row">
        <Paper
          elevation={3}
          className="xs:w-20 xs:h-20 sm:w-32 sm:h-32 md:w-44 md:h-44 "
        >
          <img
            className="h-full w-full object-cover rounded-sm"
            src={ownerImage}
            onError={onImageError}
            alt=""
          />
        </Paper>
        <div className="flex flex-col flex-wrap">
          <Typography variant="h4" className="font-extralight">
            {user.display_name}
          </Typography>
          <Typography variant="body2">
            {`Member for ${durationFromEpochUntilNow(user.creation_date)}`}
          </Typography>
        </div>
        <p>{user.link}</p>
      </div>

      {/* Tabs */}
      <div></div>

      {/* Main container */}
      <div>
        {/* Stats + collectives + communities */}
        <div></div>

        {/* About + Badges + Top tags + Top posts */}
        <div></div>
      </div>
    </div>
  );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const userId = params?.userId;

  if (userId) {
    try {
      const user = await getUserById(Number(userId));
      return { props: { user } };
    } catch (e) {
      return { notFound: true };
    }
  }

  return { notFound: true };
};
