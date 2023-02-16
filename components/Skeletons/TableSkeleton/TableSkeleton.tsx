import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";

type Props = {
  rows: number;
};

const TableSkeleton: FC<Props> = ({ rows }) => {
  return (
    <Box>
      {new Array(rows).fill(0).map((row, i) => (
        <Skeleton
          key={i}
          animation="wave"
          variant="rounded"
          height={60}
          className="mb-2"
        />
      ))}
    </Box>
  );
};

export default TableSkeleton;
