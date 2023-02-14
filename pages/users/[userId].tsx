import { getUserById } from "@/axios/users";
import { IUser } from "@/interfaces/users";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";

type Props = {
  user: IUser;
};

const UserProfilePage: NextPage<Props> = ({ user }) => {
  return <div>{user.display_name}</div>;
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
