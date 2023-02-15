import React, { useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getUsersByQuery, getUserTagsByUserId } from "@/axios/users";
import { Box, Typography } from "@mui/material";
import { IUser, IUserQueryParams } from "@/interfaces/users";
import UserCard from "@/components/Cards/UserCard/UserCard";
import Paginator from "@/components/Paginator/Paginator";
import validateSchema from "@/schema/validateSchema";
import { userQuerySchema } from "@/schema/user";
import { useTagStore } from "@/store/userTagsStore";
import { ITag } from "@/interfaces/tags";

type Props = {
  users: IUser[];
  error?: string;
};

const AllUsersPage: NextPage<Props> = ({ users, error }) => {
  const addNewTags = useTagStore((state) => state.addNewTags);

  // TODO
  useEffect(() => {
    let tagsToAdd: ITag[] = [];

    users.forEach((user) => {
      if (user.topTags && user.topTags.length > 0) {
        tagsToAdd = [...tagsToAdd, ...user.topTags];
      }
    });
    addNewTags(tagsToAdd);
  }, []);

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }
  return (
    <>
      <Box className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {users.map((user) => (
          <UserCard key={user.account_id} user={user} />
        ))}
      </Box>
      <Paginator isCentered />
    </>
  );
};

export default AllUsersPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );

  try {
    const userQuery = (await validateSchema(
      query,
      userQuerySchema
    )) as IUserQueryParams;

    const users = await getUsersByQuery(userQuery);

    const usersWithTags = await Promise.all(
      users.map(async (user) => {
        try {
          const topTags = await getUserTagsByUserId(user.user_id);
          return { ...user, topTags };
        } catch (e) {
          return user;
        }
      })
    );

    return { props: { users: usersWithTags } };
  } catch (e: any) {
    return {
      props: {
        questions: [],
        error:
          e.response?.data.error_message || e.details?.length > 0
            ? e.details[0].message
            : "Sorry something went wrong!",
      },
    };
  }
};
