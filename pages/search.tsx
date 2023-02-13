import { searchByQueries } from "@/axios/search";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import { IQuestion } from "@/interfaces/question";
import { Box } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";

type Props = {
  questions: IQuestion[];
};

const SearchPage: NextPage<Props> = ({ questions }) => {
  return (
    <Box className="grid grid-cols-1">
      {questions.map((question) => (
        <QuestionCard key={question.question_id} question={question} />
      ))}
    </Box>
  );
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
