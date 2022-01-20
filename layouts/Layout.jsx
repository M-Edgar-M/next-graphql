import { useQuery } from "@apollo/client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ALL_JOBS } from "../graphql/job/query/ALL_JOBS";

const useStyles = makeStyles(
  {
    root: {
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
  const router = useRouter();
  const classes = useStyles();
  return (
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

      <Grid sx={{ margin: "20px" }}>
        <Typography variant="h4">APOLLO/GRAPHQL</Typography>
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
  );
};

export default Layout;
