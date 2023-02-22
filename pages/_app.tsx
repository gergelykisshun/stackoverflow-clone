import Layout from "@/components/Layout/Layout";
import { useThemeStore } from "@/store/themeStore";
import "@/styles/globals.scss";
import darkTheme from "@/themes/dark-theme";
import lightTheme from "@/themes/light-theme";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isInitMode, setIsInitMode] = useState<boolean>(true);
  const mode = useThemeStore((state) => state.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: isInitMode
          ? { mode: "light" }
          : mode === "dark"
          ? darkTheme
          : lightTheme,
      }),
    [mode, isInitMode]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsInitMode(false);
    }, 1);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Flash answers</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
