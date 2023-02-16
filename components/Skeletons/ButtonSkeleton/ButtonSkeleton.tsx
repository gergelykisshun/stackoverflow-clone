import { Skeleton } from "@mui/material";
import React, { FC } from "react";

type Props = {
  width?: number;
  height?: number;
};

const ButtonSkeleton: FC<Props> = ({ height = 23, width = 40 }) => {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      height={height}
      width={width}
    />
  );
};

export default ButtonSkeleton;
