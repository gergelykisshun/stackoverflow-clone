import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getUsersByQuery } from "@/axios/users";
import { Box, Typography } from "@mui/material";
import { IUser, IUserQueryParams } from "@/interfaces/users";
import UserCard from "@/components/Cards/UserCard/UserCard";
import Paginator from "@/components/Paginator/Paginator";
import validateSchema from "@/schema/validateSchema";
import { userQuerySchema } from "@/schema/user";
import SortingOptions from "@/components/SortingOptions/SortingOptions";
import { UserSortOptions } from "@/enums/user";
import Head from "next/head";

type Props = {
  users: IUser[];
  has_more?: boolean;
  error?: string;
};

const AllUsersPage: NextPage<Props> = ({ users, error, has_more }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }
  return (
    <>
      <Head>
        <title>Flash answers - Users</title>
      </Head>
      <SortingOptions
        sortOptions={Object.values(UserSortOptions)}
        defaultOption={UserSortOptions.REPUTATION}
      />

      <Box
        bgcolor="background.paper"
        className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 content-center xs:py-8 py-16 px-10 shadow-md"
      >
        {users.map((user, i) => (
          <UserCard key={user.account_id} user={user} cardIndex={i} />
        ))}
      </Box>
      <Paginator isCentered has_more={has_more} />
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
  res.setHeader("Accept-Encoding", "deflate, gzip");

  try {
    const userQuery = (await validateSchema(
      query,
      userQuerySchema
    )) as IUserQueryParams;

    const res = await getUsersByQuery(userQuery);

    return { props: { users: res.data, has_more: res.has_more } };
  } catch (e: any) {
    return {
      props: {
        users: [],
        error:
          e.details?.length > 0
            ? e.details[0].message
            : "Sorry something went wrong!",
      },
    };
  }
};
