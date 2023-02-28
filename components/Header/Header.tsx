import {
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  InputBase,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import { useSearchStore } from "@/store/searchStore";

type Props = {
  handleDrawerToggle: () => void;
  drawerWidth: number;
};

const Header: FC<Props> = ({ drawerWidth, handleDrawerToggle }) => {
  const searchText = useSearchStore((state) => state.search);
  const setSearchText = useSearchStore((state) => state.change);

  const toggleAdvancedSearch = useSearchStore(
    (state) => state.toggleAdvancedSearch
  );

  const router = useRouter();

  const initSearch = () => router.push(`/search?intitle=${searchText}`);

  return (
    <AppBar
      position="fixed"
      className="right-0"
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
          sx={{ display: { sm: "none" } }}
          className="mr-3"
        >
          <MenuIcon />
        </IconButton>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            initSearch();
          }}
        >
          <IconButton
            type="button"
            disabled
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="send search"
            onClick={initSearch}
          >
            <SendIcon />
          </IconButton>
        </Paper>

        <Typography
          color="common.white"
          className="cursor-pointer underline ml-3"
          onClick={() => toggleAdvancedSearch()}
        >
          Advanced
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
