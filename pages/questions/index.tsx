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
import SortingOptions from "@/components/SortingOptions/SortingOptions";
import { QuestionSortOptions } from "@/enums/question";
import Head from "next/head";

type Props = {
  questions: IQuestion[];
  error?: string;
};

const AllQuestionsPage: NextPage<Props> = ({ questions, error }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <>
      <Head>
        <title>Flash answers - Questions</title>
      </Head>
      <SortingOptions
        sortOptions={Object.values(QuestionSortOptions)}
        defaultOption={QuestionSortOptions.ACTIVITY}
      />
      <Box className="grid grid-cols-1">
        {questions.map((question) => (
          <QuestionCard key={question.question_id} question={question} />
        ))}
      </Box>
      <Paginator isCentered />
    </>
  );
};

export default AllQuestionsPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-control",
    `public, s-maxage=${process.env.SSR_CACHE_MAX_AGE}, stale-while-revalidate=${process.env.SSR_CACHE_REVALIDATE}`
  );
  res.setHeader("Accept-Encoding", "deflate, gzip");

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
          e.details?.length > 0
            ? e.details[0].message
            : "Sorry something went wrong!",
      },
    };
  }
};
