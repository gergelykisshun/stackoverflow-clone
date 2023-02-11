import { Toolbar, Divider, List, Typography } from "@mui/material";
import React, { FC, useState } from "react";

import LocalOfferIcon from "@mui/icons-material/Mail";

import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import PersonIcon from "@mui/icons-material/Person";
import QuizIcon from "@mui/icons-material/Quiz";
import { ISidebarOption } from "@/interfaces/Sidebar";
import SidebarOption from "../SidebarOption/SidebarOption";
import { useRouter } from "next/router";

type Props = {};

const Sidebar: FC<Props> = () => {
  const { pathname } = useRouter();
  const sidebarOptions: ISidebarOption[] = [
    { text: "Questions", icon: <QuizIcon />, routeTo: "/questions" },
    { text: "Tags", icon: <LocalOfferIcon />, routeTo: "/tags" },
    { text: "Users", icon: <PersonIcon />, routeTo: "/users" },
  ];

  return (
    <div>
      <Toolbar className="px-4">
        <DynamicFormIcon className="mr-2" />
        <Typography variant="h6">
          Overflow <span className="text-orange-400">clone</span>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {sidebarOptions.map((option) => (
          <SidebarOption
            key={option.text}
            {...option}
            isSelected={pathname === option.routeTo}
          />
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
