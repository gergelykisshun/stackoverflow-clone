import { ISidebarOption } from "@/interfaces/sidebar";
import { useSearchStore } from "@/store/searchStore";
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
  const resetSearchText = useSearchStore((state) => state.reset);

  return (
    <Link href={routeTo} onClick={() => resetSearchText()}>
      <ListItem disablePadding>
        <ListItemButton className="gap-3" selected={isSelected}>
          <ListItemIcon className="min-w-0">{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarOption;
