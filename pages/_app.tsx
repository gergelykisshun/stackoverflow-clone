import Layout from "@/components/Layout/Layout";
import { useThemeStore } from "@/store/themeStore";
import "@/styles/globals.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const mode = useThemeStore((state) => state.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

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
