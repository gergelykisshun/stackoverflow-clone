import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import React, { FC } from "react";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  handleDrawerToggle: () => void;
  drawerWidth: number;
};

const Header: FC<Props> = ({ drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
