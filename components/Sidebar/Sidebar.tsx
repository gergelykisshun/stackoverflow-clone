import { Toolbar, Divider, List, Typography } from "@mui/material";
import React, { FC } from "react";

import LocalOfferIcon from "@mui/icons-material/Mail";

import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import PersonIcon from "@mui/icons-material/Person";
import QuizIcon from "@mui/icons-material/Quiz";
import { ISidebarOption } from "@/interfaces/Sidebar";
import SidebarOption from "../SidebarOption/SidebarOption";

type Props = {};

const Sidebar: FC<Props> = () => {
  const sidebarOptions: ISidebarOption[] = [
    { text: "Questions", icon: <QuizIcon /> },
    { text: "Tags", icon: <LocalOfferIcon /> },
    { text: "Users", icon: <PersonIcon /> },
  ];

  return (
    <div>
      <Toolbar>
        <DynamicFormIcon sx={{ marginRight: 5 }} />
        <Typography variant="h6">overflow clone</Typography>
      </Toolbar>
      <Divider />
      <List>
        {sidebarOptions.map((option) => (
          <SidebarOption {...option} />
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
