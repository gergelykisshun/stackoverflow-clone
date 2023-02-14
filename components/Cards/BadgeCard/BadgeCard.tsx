import { Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

type Props = {
  badgeType: "gold" | "silver" | "bronze";
  badgeCount: number;
};

const BadgeCard: FC<Props> = ({ badgeCount, badgeType }) => {
  const badgeColor =
    badgeType === "gold"
      ? "text-yellow-500"
      : badgeType === "silver"
      ? "text-gray-400"
      : "text-amber-800";

  return (
    <Paper
      elevation={3}
      className="flex items-center gap-4 w-[150px] h-[120px] p-2 "
    >
      <LocalPoliceIcon className={`${badgeColor} text-6xl`} />
      <div>
        <Typography variant="h6" className="text-md">
          {badgeCount}
        </Typography>
        <Typography variant="button" className={`text-xs ${badgeColor}`}>
          {badgeType} badges
        </Typography>
      </div>
    </Paper>
  );
};

export default BadgeCard;
