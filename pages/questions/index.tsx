import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getQuestionsByQuery } from "@/axios/questions";
import { IQuestion, IQuestionQueryParams } from "@/interfaces/question";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import Paginator from "@/components/Paginator/Paginator";
import validateSchema from "@/schema/validateSchema";
import { questionQuerySchema } from "@/schema/question";

type Props = {
  questions: IQuestion[];
  error?: string;
};

const AllQuestionsPage: NextPage<Props> = ({ questions, error }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <Box className="grid grid-cols-1">
      {questions.map((question) => (
        <QuestionCard key={question.question_id} question={question} />
      ))}
      <Paginator />
    </Box>
  );
};

export default AllQuestionsPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );

  try {
    const questionQuery = (await validateSchema(
      query,
      questionQuerySchema
    )) as IQuestionQueryParams;

    const questions: IQuestion[] = await getQuestionsByQuery(questionQuery);
    return { props: { questions } };
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
