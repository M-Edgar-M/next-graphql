import { Button, Grid, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import Link from "next/link";
import React, { createContext, useContext, useState } from "react";
import Search from "../components/Search";

const AppContext = createContext();
const useStyles = makeStyles(
  {
    root: {
      fontFamily: "Roboto, sans-serif",
      background: "rgb(238,238,238)",
      background:
        "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(234,234,242,1) 49%, rgba(201,223,227,1) 100%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px #ccc",
      color: "#000",
      padding: "30px 30px",
      overflow: "hidden",
    },
  },
  { name: "MuiExample_Component" }
);
const Layout = ({ children }) => {
  const [searchRes, setSearchRes] = useState();
  const sharedContext = { searchRes };

  const classes = useStyles();
  return (
    <AppContext.Provider value={sharedContext}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}
        className={classes.root}
      >
        <Link passHref href="/">
          <Button
            variant="outlined"
            sx={{ marginLeft: "5px", alignSelf: "flex-start" }}
          >
            HOME
          </Button>
        </Link>

        <Search setSearchRes={setSearchRes} />

        <Grid sx={{ margin: "20px" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            APOLLO/GRAPHQL
          </Typography>
          <Link passHref href="/all-jobs">
            <Button variant="contained" sx={{ marginLeft: "5px" }}>
              Get All Jobs
            </Button>
          </Link>
          <Link passHref href="/all-cast">
            <Button variant="contained" sx={{ marginLeft: "5px" }}>
              Get All Cast
            </Button>
          </Link>
          <Link passHref href="/all-companies">
            <Button variant="contained" sx={{ marginLeft: "5px" }}>
              Get All Companies
            </Button>
          </Link>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </AppContext.Provider>
  );
};

export default Layout;

export function useAppContext() {
  return useContext(AppContext);
}
