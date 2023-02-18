import { searchByQuery } from "@/axios/search";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import { IQuestion } from "@/interfaces/question";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Joi from "joi";
import { searchQuerySchema } from "@/schema/search";
import { ISearchQueryParams } from "@/interfaces/search";
import Paginator from "@/components/Paginator/Paginator";
import validateSchema from "@/schema/validateSchema";
import SortingOptions from "@/components/SortingOptions/SortingOptions";
import { SearchSortOptions } from "@/enums/search";

type Props = {
  questions: IQuestion[];
  error?: string;
};

const SearchPage: NextPage<Props> = ({ questions, error }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <>
      <SortingOptions
        sortOptions={Object.values(SearchSortOptions)}
        defaultOption={SearchSortOptions.ACTIVITY}
      />
      <Box className="grid grid-cols-1">
        {questions.map((question) => (
          <QuestionCard key={question.question_id} question={question} />
        ))}
        <Paginator />
      </Box>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-control",
    `public, s-maxage=${process.env.SSR_CACHE_MAX_AGE}, stale-while-revalidate=${process.env.SSR_CACHE_REVALIDATE}`
  );
  res.setHeader("Accept-Encoding", "deflate, gzip");

  if (!query.intitle && !query.tagged) {
    return {
      props: {
        questions: [],
        error: "One of intitle or tagged queries must be set to search!",
      },
    };
  }

  try {
    const searchQuery = (await validateSchema(
      query,
      searchQuerySchema
    )) as ISearchQueryParams;

    const questions: IQuestion[] = await searchByQuery(searchQuery);
    return { props: { questions } };
    // TODO remove any
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
