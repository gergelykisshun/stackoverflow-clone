import { ISidebarOption } from "@/interfaces/sidebar";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

interface Props extends ISidebarOption {
  isSelected: boolean;
}

const SidebarOption: FC<Props> = ({ icon, text, routeTo, isSelected }) => {
  return (
    <Link href={routeTo}>
      <ListItem disablePadding>
        <ListItemButton selected={isSelected}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography
                className="text-black no-underline"
                sx={{ textDecoration: "none" }}
              >
                {text}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarOption;
