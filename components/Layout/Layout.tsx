import { Box, CssBaseline, Drawer } from "@mui/material";
import { useRouter } from "next/router";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import AdvancedSearch from "../AdvancedSearch/AdvancedSearch";
import Header from "../Header/Header";
import ProgressBar from "../ProgressBar/ProgressBar";
import Sidebar from "../Sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const { width } = useWindowSize();
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", () => handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <Box className="flex  max-w-[1536px] mx-auto">
      <CssBaseline />
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {width > 600 ? (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Sidebar closeDrawer={handleDrawerToggle} />
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {isLoading && <ProgressBar />}
        {children}
      </Box>
      <AdvancedSearch />
    </Box>
  );
};

export default Layout;
