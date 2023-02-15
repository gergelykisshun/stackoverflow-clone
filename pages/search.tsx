import { searchByQueries } from "@/axios/search";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import { IQuestion } from "@/interfaces/question";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Joi from "joi";
import { searchQuerySchema } from "@/schema/search";
import { ISearchQueryParams } from "@/interfaces/search";

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
        error: "One of intitle or tagged queries must be set to search!",
      },
    };
  }

  try {
    const searchQuery = Joi.attempt(
      query,
      searchQuerySchema
    ) as ISearchQueryParams;

    const questions: IQuestion[] = await searchByQueries(searchQuery);
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
