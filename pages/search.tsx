import { searchByQueries } from "@/axios/search";
import { IQuestion } from "@/interfaces/question";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";

type Props = {
  questions: IQuestion[];
};

const SearchPage: NextPage<Props> = ({ questions }) => {
  return <div>SearchPage</div>;
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const intitle = query.intitle ? query.intitle : "";

  const questions: IQuestion[] = await searchByQueries({
    // TODO
    intitle: intitle as string,
    order: "desc",
    sort: "activity",
    tagged: "",
  });

  return { props: { questions } };
};
