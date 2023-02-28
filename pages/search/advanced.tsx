import { advancedSearchByQuery } from "@/axios/search";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import { IQuestion } from "@/interfaces/question";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { advancedSearchQuerySchema } from "@/schema/search";
import { IAdvancedSearchQueryParams } from "@/interfaces/search";
import Paginator from "@/components/Paginator/Paginator";
import validateSchema from "@/schema/validateSchema";
import SortingOptions from "@/components/SortingOptions/SortingOptions";
import { AdvancedSearchSortOptions } from "@/enums/search";
import Head from "next/head";

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
      <Head>
        <title>Flash answers - Search</title>
      </Head>
      <Typography variant="h3" className="font-light" gutterBottom>
        Advanced Search Results
      </Typography>

      <SortingOptions
        sortOptions={Object.values(AdvancedSearchSortOptions)}
        defaultOption={AdvancedSearchSortOptions.VOTES}
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

  try {
    const searchQuery = (await validateSchema(
      query,
      advancedSearchQuerySchema
    )) as IAdvancedSearchQueryParams;

    if (!searchQuery.sort) {
      searchQuery.sort = "votes";
    }

    const questions: IQuestion[] = await advancedSearchByQuery(searchQuery);
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
