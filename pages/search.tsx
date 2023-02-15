import { searchByQueries } from "@/axios/search";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import { IQuestion } from "@/interfaces/question";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";

type Props = {
  questions: IQuestion[];
  error?: string;
};

const SearchPage: NextPage<Props> = ({ questions, error }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

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
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );

  if (!query.intitle && !query.tagged) {
    return {
      props: {
        questions: [],
        error: "One of intitle or tagged must be set to search!",
      },
    };
  }

  try {
    const questions: IQuestion[] = await searchByQueries(query);
    return { props: { questions } };
  } catch (e: any) {
    return { props: { questions: [], error: e.response.data.error_message } };
  }
};
