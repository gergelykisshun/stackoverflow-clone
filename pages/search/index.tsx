import { searchByQuery } from "@/axios/search";
import QuestionCard from "@/components/Cards/QuestionCard/QuestionCard";
import { IQuestion } from "@/interfaces/question";
import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { searchQuerySchema } from "@/schema/search";
import { ISearchQueryParams } from "@/interfaces/search";
import Paginator from "@/components/Paginator/Paginator";
import validateSchema from "@/schema/validateSchema";
import SortingOptions from "@/components/SortingOptions/SortingOptions";
import { SearchSortOptions } from "@/enums/search";
import Head from "next/head";
import { useSearchStore } from "@/store/searchStore";

type Props = {
  searchedFor: string;
  questions: IQuestion[];
  error?: string;
};

const SearchPage: NextPage<Props> = ({ questions, error, searchedFor }) => {
  const toggleAdvancedSearch = useSearchStore(
    (state) => state.toggleAdvancedSearch
  );
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <>
      <Head>
        <title>Flash answers - Search</title>
      </Head>
      <Typography variant="h3" className="font-light" gutterBottom>
        Search Results
      </Typography>
      <Typography className="font-light mb-10" variant="body2" gutterBottom>
        Results for {searchedFor}
      </Typography>
      <Box className="flex items-center justify-between flex-col md:flex-row">
        <Button size="small" onClick={() => toggleAdvancedSearch()}>
          advanced search
        </Button>
        <SortingOptions
          sortOptions={Object.values(SearchSortOptions)}
          defaultOption={SearchSortOptions.ACTIVITY}
        />
      </Box>
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
    return { props: { searchedFor: query.intitle || query.tagged, questions } };
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
