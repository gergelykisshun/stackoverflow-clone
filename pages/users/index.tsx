import React from "react";
import { GetStaticProps, NextPage } from "next";
import { getAllUsers, getUserTagsByUserId } from "@/axios/users";
import { Box, Typography } from "@mui/material";
import { IUser } from "@/interfaces/users";
import UserCard from "@/components/Cards/UserCard/UserCard";

type Props = {
  users: IUser[];
  error?: string;
};

const AllUsersPage: NextPage<Props> = ({ users, error }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }
  return (
    <Box className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {users.map((user) => (
        <UserCard key={user.account_id} user={user} />
      ))}
    </Box>
  );
};

export default AllUsersPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const users = await getAllUsers();

    const usersWithTags = await Promise.all(
      users.map(async (user) => {
        try {
          const topTags = (await getUserTagsByUserId(user.user_id)).map(
            (tag) => tag.name
          );
          return { ...user, topTags };
        } catch (e) {
          return user;
        }
      })
    );

    return { props: { users: usersWithTags }, revalidate: 60 };
  } catch (e) {
    return {
      props: { users: [], error: "Sorry! Could not fetch users!" },
    };
  }
};
