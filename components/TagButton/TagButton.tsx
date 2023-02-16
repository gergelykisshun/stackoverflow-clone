import { useSearchStore } from "@/store/searchStore";
import Link from "next/link";
import { FC } from "react";

type Props = {
  tag: string;
  size?: string;
};

const TagButton: FC<Props> = ({ tag, size }) => {
  const changeSearch = useSearchStore((state) => state.change);

  return (
    <Link
      onClick={() => changeSearch(tag)}
      href={`/search?tagged=${tag}`}
      className={`py-1 px-2 font-light ${
        size || "text-xs"
      } bg-gray-200 rounded-sm hover:bg-gray-300 transition-all whitespace-nowrap`}
    >
      {tag}
    </Link>
  );
};

export default TagButton;
