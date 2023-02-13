import React from "react";
import { GetStaticProps, NextPage } from "next";
import { getAllUsers } from "@/axios/users";
import { Typography } from "@mui/material";
import { IUser } from "@/interfaces/users";

type Props = {
  users: IUser[];
  error?: string;
};

const AllUsersPage: NextPage<Props> = ({ users, error }) => {
  console.log("USERS ON PAGE", users);
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }
  return <div>AllUsersPage</div>;
};

export default AllUsersPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const users = await getAllUsers();
    return { props: { users }, revalidate: 60 };
  } catch (e) {
    return {
      props: { users: [], error: "Sorry! Could not fetch users!" },
    };
  }
};
