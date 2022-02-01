const debounce = require("debounce");
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  Divider,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ALL_JOBS } from "../graphql/job/query/ALL_JOBS";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { GET_JOB } from "../graphql/job/query/GET_JOB";
import { withApollo } from "../libs/apollo";
import Link from "next/link";
import FetchMore from "../components/FetchMore";

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
    tr: {
      "&:hover": {
        background:
          "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(234,234,242,1) 49%, rgba(201,223,227,1) 100%)",
      },
    },
    th: {
      cursor: "pointer",
      fontSize: "18px",
      "&:active": {
        color: "#fff",
      },
    },
  },
  { name: "MuiExample_Component" }
);

function AllJobs() {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page || 1));
  const classes = useStyles();
  const { data, loading, client, networkStatus, fetchMore } = useQuery(
    ALL_JOBS,
    {
      variables: {
        first: page * 15,
        after: null,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const { hasNextPage } = data?.allJobs.pageInfo || {};

  const handleMouseOver = (jobId) =>
    client.query({
      query: GET_JOB,
      variables: {
        id: jobId,
      },
    });
  const timeOut = debounce(handleMouseOver, 1200);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "100vh", width: "100%" }}
      className={classes.root}
    >
      {loading && <Loading />}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, minHeight: "100vh" }}
          aria-label="simple table"
        >
          <TableBody sx={{ display: "flex", flexDirection: "column" }}>
            {data?.allJobs?.edges.map((item) => (
              <>
                <Link href={`/job/${item.node.id}`} passHref key={item.cursor}>
                  <a className={classes.tr} style={{ textDecoration: "none" }}>
                    <TableRow
                      className={classes.tr}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onMouseOver={() =>
                        timeOut(handleMouseOver(item.node.id), 1200)
                      }
                    >
                      <TableCell
                        component="th"
                        className={classes.th}
                        scope="row"
                      >
                        {item.node.jobTitle}
                      </TableCell>
                    </TableRow>
                  </a>
                </Link>
                <Divider light />
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
        <FetchMore
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
          pageInfo={data?.allJobs.pageInfo}
          fetchMore={fetchMore}
          networkStatus={networkStatus}
        >
          Fetch More Data
        </FetchMore>
      )}
    </Grid>
  );
}
export default withApollo({ ssr: true })(AllJobs);
