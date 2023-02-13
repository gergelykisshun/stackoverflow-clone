import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

type Props = {
  tag: string;
};

const TagButton: FC<Props> = ({ tag }) => {
  return (
    <Link
      href={`/question/${tag}`}
      className="py-1 px-2 font-light text-xs bg-gray-200 rounded-sm hover:bg-gray-300 transition-all whitespace-nowrap"
    >
      {tag}
    </Link>
  );
};

export default TagButton;
