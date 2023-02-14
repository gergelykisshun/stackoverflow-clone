import { getUserById } from "@/axios/users";
import { useDefaultImageOnError } from "@/hooks/useDefaultImageOnError";
import { IUser } from "@/interfaces/users";
import durationFromEpochUntilNow from "@/utility/durationFromEpochUntilNow";
import { Paper, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import epochToDate from "@/utility/epochToDate";

type Props = {
  user: IUser;
};

const UserProfilePage: NextPage<Props> = ({ user }) => {
  const [ownerImage, onImageError] = useDefaultImageOnError(user.profile_image);
  const mutedDetailsSharedStyle = "flex items-center gap-2.5 mb-0.5";

  return (
    <div>
      {/* Picture + Details */}
      <div className="flex flex-col gap-5 md:flex-row mb-10">
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
        <div className="flex flex-col flex-wrap p-3 xs:p-1">
          <Typography variant="h4" className="font-extralight mb-2">
            {user.display_name}
          </Typography>
          <Typography
            variant="body2"
            className={mutedDetailsSharedStyle}
            color="text.secondary"
          >
            <CakeIcon className="pb-0.5" />
            {`Member for ${durationFromEpochUntilNow(user.creation_date)}`}
          </Typography>

          <Typography
            variant="body2"
            className={mutedDetailsSharedStyle}
            color="text.secondary"
          >
            <LocationOnIcon className="pb-0.5" />
            {user.location}
          </Typography>

          {user.website_url && (
            <Typography
              variant="body2"
              className={mutedDetailsSharedStyle}
              color="text.secondary"
            >
              <InsertLinkIcon className="pb-0.5" />
              {user.website_url}
            </Typography>
          )}

          <Typography
            variant="body2"
            className={mutedDetailsSharedStyle}
            color="text.secondary"
          >
            <AccessTimeIcon className="pb-0.5" />
            {`Last seen ${epochToDate(user.last_access_date)}`}
          </Typography>
        </div>
      </div>

      {/* Tabs */}
      <div></div>

      {/* Main container */}
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Stats + collectives + communities */}
        <div className="lg:col-span-1">1</div>

        {/* About + Badges + Top tags + Top posts */}
        <div className="lg:col-span-2">2</div>
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
