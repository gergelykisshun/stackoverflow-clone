import { ISidebarOption } from "@/interfaces/Sidebar";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarOption;
