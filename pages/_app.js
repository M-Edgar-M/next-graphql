import Layout from "../layouts/Layout";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    background: {
      default: "#fff",
    },
  },
});

const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    background: {
      default: "#cccc",
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  const [state, setState] = React.useState();
  return (
    <ThemeProvider theme={state ? LightTheme : DarkTheme}>
      <Layout setState={setState}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};
export default MyApp;
