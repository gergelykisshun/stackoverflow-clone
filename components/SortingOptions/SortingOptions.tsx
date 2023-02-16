import { ToggleButton, ToggleButtonGroup } from "@mui/material";
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
    setSelected(newSelection);
  };

  return (
    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="sorting options"
    >
      {sortOptions.map((option) => (
        <ToggleButton key={option} value={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SortingOptions;
