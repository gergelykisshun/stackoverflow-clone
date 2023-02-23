import getPathToPushWithNewQuery from "@/utility/getPathToPushWithNewQuery";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

type Props = {
  sortOptions: string[];
  defaultOption?: string;
};

const SortingOptions: FC<Props> = ({ defaultOption, sortOptions }) => {
  const [selected, setSelected] = useState<string>(defaultOption || "");
  const router = useRouter();

  const handleChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    newSelection: string
  ) => {
    if (newSelection) {
      setSelected(newSelection);
      router.push(
        getPathToPushWithNewQuery(
          router.query,
          "sort",
          newSelection,
          router.asPath
        )
      );
    }
  };

  return (
    <Box className="mb-10 mt-3 md:my-10 flex xs:justify-center sm:justify-end">
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleChange}
        aria-label="sorting options"
      >
        {sortOptions.map((option) => (
          <ToggleButton
            className="text-xs md:text-sm"
            key={option}
            value={option}
          >
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SortingOptions;
