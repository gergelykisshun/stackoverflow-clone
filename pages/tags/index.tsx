import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import validateSchema from "@/schema/validateSchema";
import { ITag, ITagQueryParams } from "@/interfaces/tags";
import { tagQuerySchema } from "@/schema/tag";
import { getTagsByQuery } from "@/axios/tags";
import { Box, Typography } from "@mui/material";
import Paginator from "@/components/Paginator/Paginator";
import TagCard from "@/components/Cards/TagCard/TagCard";
import SortingOptions from "@/components/SortingOptions/SortingOptions";
import { TagSortOptions } from "@/enums/tag";
import Head from "next/head";

type Props = {
  tags: ITag[];
  has_more?: boolean;
  error?: string;
};

const TagsPage: NextPage<Props> = ({ tags, error, has_more }) => {
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }
  return (
    <>
      <Head>
        <title>Flash answers - Tags</title>
      </Head>
      <Typography variant="h3" className="font-light" gutterBottom>
        Tags
      </Typography>
      <Typography
        className="max-w-2xl font-light mb-10"
        variant="body1"
        gutterBottom
      >
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </Typography>
      <SortingOptions
        sortOptions={Object.values(TagSortOptions)}
        defaultOption={TagSortOptions.POPULAR}
      />
      <Box className="grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {tags.map((tag) => (
          <TagCard key={tag.name} tag={tag} />
        ))}
      </Box>
      <Paginator isCentered has_more={has_more} />
    </>
  );
};

export default TagsPage;

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
    const tagQuery = (await validateSchema(
      query,
      tagQuerySchema
    )) as ITagQueryParams;

    const res = await getTagsByQuery(tagQuery);
    return { props: { tags: res.data, has_more: res.has_more } };
  } catch (e: any) {
    return {
      props: {
        tags: [],
        error:
          e.details?.length > 0
            ? e.details[0].message
            : "Sorry something went wrong!",
      },
    };
  }
};
