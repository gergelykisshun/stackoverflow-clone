import { IUserStat } from "@/interfaces/users";
import { Typography } from "@mui/material";

import { FC } from "react";

const UserStats: FC<IUserStat> = ({ count, text }) => {
  return (
    <div className="flex flex-col items-center">
      <Typography variant="h6" className="text-md">
        {count}
      </Typography>
      <Typography variant="body2" className="text-xs">
        {text}
      </Typography>
    </div>
  );
};

export default UserStats;
