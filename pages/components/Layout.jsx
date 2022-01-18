import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useGetAllJobs } from "../../hooks/useGetAllJobs";

const useStyles = makeStyles({
  root: {
    background: "rgb(238,238,238)",
    background:
      "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(234,234,242,1) 49%, rgba(201,223,227,1) 100%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px #ccc",
    color: "#000",
    padding: "0 30px",
  },
});
const Layout = () => {
  const classes = useStyles();
  const { data } = useGetAllJobs();
  return <Container className={classes.root} maxWidth="sm">sdfsf</Container>;
};

export default Layout;
