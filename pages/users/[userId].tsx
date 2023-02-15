import { getUserById, getUserTagsByUserId } from "@/axios/users";
import { useDefaultImageOnError } from "@/hooks/useDefaultImageOnError";
import { IUser, IUserBadges, IUserStat } from "@/interfaces/users";
import durationFromEpochUntilNow from "@/utility/durationFromEpochUntilNow";
import { Paper, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import epochToDate from "@/utility/epochToDate";
import BadgeCard from "@/components/Cards/BadgeCard/BadgeCard";
import UserTopTagsTable from "@/components/Tables/UserTopTagsTable";
import UserStats from "@/components/UserStats/UserStats";

type Props = {
  user: IUser;
};

const UserProfilePage: NextPage<Props> = ({ user }) => {
  const [ownerImage, onImageError] = useDefaultImageOnError(user.profile_image);
  const mutedDetailsSharedStyle = "flex items-center gap-2.5 mb-0.5";

  const userStats: IUserStat[] = [
    { count: user.reputation, text: "reputation" },
    { count: user.accept_rate || 0, text: "accept rate" },
    {
      count: user.reputation_change_month,
      text: "reputation this month",
    },
  ];

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
      <div className="grid grid-cols-1 lg:grid-cols-4 space-x-0 lg:space-x-5">
        {/* Stats + collectives + communities */}
        <div className="lg:col-span-1 mb-10">
          <div>
            <Typography
              variant="h6"
              className="font-normal"
              color="primary.main"
              gutterBottom
            >
              Stats
            </Typography>
            <Paper
              className="flex flex-wrap lg:flex-col gap-5 justify-center max-w-lg mx-auto p-5"
              elevation={3}
            >
              {userStats.map((userStat) => (
                <UserStats key={userStat.text} {...userStat} />
              ))}
            </Paper>
          </div>
        </div>

        {/* About + Badges + Top tags + Top posts */}
        <div className="lg:col-span-2">
          <div className="mb-10">
            <Typography
              variant="h6"
              className="font-normal"
              color="primary.main"
              gutterBottom
            >
              Badges
            </Typography>

            <div className="flex flex-wrap gap-5 justify-center">
              {Object.keys(user.badge_counts).map((badgeType) => {
                return (
                  <BadgeCard
                    key={badgeType}
                    badgeType={badgeType as keyof IUserBadges}
                    badgeCount={
                      user.badge_counts[badgeType as keyof IUserBadges]
                    }
                  />
                );
              })}
            </div>
          </div>

          {user.topTags && (
            <div>
              <Typography
                variant="h6"
                className="font-normal"
                color="primary.main"
                gutterBottom
              >
                Top 10 tags
              </Typography>
              <div className="max-w-xl mx-auto">
                <UserTopTagsTable tags={user.topTags} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );

  const userId = params?.userId;

  if (userId) {
    try {
      const user = await getUserById(Number(userId));

      try {
        const topTags = await getUserTagsByUserId(user.user_id, 10);
        return { props: { user: { ...user, topTags } } };
      } catch (e) {
        return { props: { user } };
      }
    } catch (e) {
      return { notFound: true };
    }
  }

  return { notFound: true };
};
