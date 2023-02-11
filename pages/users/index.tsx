import React from "react";
import { GetStaticProps, NextPage } from "next";
import { getAllUsers } from "@/axios/users";

type Props = {
  users: any;
};

const AllUsersPage: NextPage<Props> = ({ users }) => {
  console.log("USERS ON PAGE", users);
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
