import {
  Toolbar,
  Divider,
  List,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { FC } from "react";

import LocalOfferIcon from "@mui/icons-material/Mail";

import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import PersonIcon from "@mui/icons-material/Person";
import QuizIcon from "@mui/icons-material/Quiz";

import SidebarOption from "../SidebarOption/SidebarOption";
import { useRouter } from "next/router";
import { ISidebarOption } from "@/interfaces/sidebar";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";

type Props = {
  closeDrawer?: () => void;
};

const Sidebar: FC<Props> = ({ closeDrawer }) => {
  const { pathname } = useRouter();
  const sidebarOptions: ISidebarOption[] = [
    { text: "Questions", icon: <QuizIcon />, routeTo: "/questions" },
    { text: "Tags", icon: <LocalOfferIcon />, routeTo: "/tags" },
    { text: "Users", icon: <PersonIcon />, routeTo: "/users" },
  ];
  const setMode = useThemeStore((state) => state.setMode);
  const mode = useThemeStore((state) => state.mode);

  return (
    <div>
      <Link href={"/"}>
        <Toolbar className="px-4">
          <DynamicFormIcon color="primary" className="mr-2" />
          <Typography
            variant="h6"
            color="text.primary"
            className="cursor-pointer"
          >
            Flash{" "}
            <Typography color="primary" component="span" variant="h6">
              answers
            </Typography>
          </Typography>
        </Toolbar>
      </Link>
      <Divider />
      <List>
        {sidebarOptions.map((option) => (
          <SidebarOption
            key={option.text}
            {...option}
            isSelected={pathname === option.routeTo}
            closeDrawer={closeDrawer}
          />
        ))}
      </List>
      <FormControlLabel
        label={mode === "dark" ? "Dark mode" : "Light mode"}
        control={<Switch checked={mode === "dark"} onClick={() => setMode()} />}
        className="px-4 py-2"
        style={{ paddingLeft: 16 }}
      />
    </div>
  );
};

export default Sidebar;
