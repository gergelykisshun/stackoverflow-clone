import TagButton from "@/components/TagButton/TagButton";
import { ITag } from "@/interfaces/tags";
import { Paper, Typography } from "@mui/material";
import React, { FC } from "react";

type Props = {
  tag: ITag;
};

const TagCard: FC<Props> = ({ tag }) => {
  return (
    <Paper className="flex flex-col gap-3 items-center px-6 py-3 xs:shadow-none sm:shadow-xl">
      <TagButton size="xs:text-xs sm:text-base md:text-lg " tag={tag.name} />
      <Typography
        color="primary"
        className="xs:text-xs md:text-base w-full block truncate text-center"
      >
        {tag.count}{" "}
        <Typography
          className="xs:hidden sm:inline-block xs:text-xs md:text-base"
          component="span"
        >
          posts
        </Typography>
      </Typography>
    </Paper>
  );
};

export default TagCard;
