import { ISidebarOption } from "@/interfaces/sidebar";
import { useSearchStore } from "@/store/searchStore";
import { useThemeStore } from "@/store/themeStore";
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
  closeDrawer?: () => void;
}

const SidebarOption: FC<Props> = ({
  icon,
  text,
  routeTo,
  isSelected,
  closeDrawer,
}) => {
  const resetSearchText = useSearchStore((state) => state.reset);
  const mode = useThemeStore((state) => state.mode);

  return (
    <Link
      href={routeTo}
      onClick={() => {
        resetSearchText();
        if (closeDrawer) {
          closeDrawer();
        }
      }}
    >
      <ListItem disablePadding>
        <ListItemButton className="gap-3" selected={isSelected}>
          <ListItemIcon className="min-w-0">{icon}</ListItemIcon>
          <ListItemText
            style={{ color: mode === "dark" ? "#fff" : "#000" }}
            primary={text}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarOption;
