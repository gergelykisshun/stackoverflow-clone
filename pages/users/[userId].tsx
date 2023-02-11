import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const UserProfilePage: NextPage<Props> = () => {
  const queryParams = useRouter().query;

  return <div>{queryParams.userId}</div>;
};

export default UserProfilePage;
