import { LinearProgress } from "@mui/material";
import React from "react";

const ProgressBar = () => {
  return (
    <LinearProgress
      color="primary"
      className="absolute w-full h-1 top-[64px] right-0"
    />
  );
};

export default ProgressBar;
