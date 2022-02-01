import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";

import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ALL_COMPANIES } from "../graphql/company/GET_ALL_COMPANIES";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import React, { useState, Fragment } from "react";
import Link from "next/link";
import { withApollo } from "../libs/apollo";
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
      height: "20px",
      cursor: "pointer",
      fontSize: "18px",
      "&:active": {
        color: "#fff",
      },
    },
  },
  { name: "MuiExample_Component" }
);

function AllCompanies({ onCLick }) {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page || 1));
  const classes = useStyles();
  const { data, loading, networkStatus, fetchMore } = useQuery(ALL_COMPANIES, {
    variables: {
      first: page * 15,
      after: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { hasNextPage } = data?.allCompanies.pageInfo || {};

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
            {data?.allCompanies?.edges.map((item, i) => (
              <Fragment key={i}>
                <Link
                  href={`/company/${item.node.id}`}
                  passHref
                  sx={{ textDecoration: "none" }}
                >
                  <a className={classes.tr} style={{ textDecoration: "none" }}>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        className={classes.th}
                        scope="row"
                      >
                        <a>{item.node.companyName}</a>
                      </TableCell>
                    </TableRow>
                  </a>
                </Link>
                <Divider light />
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
        <FetchMore
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
          pageInfo={data && data.allCompanies.pageInfo}
          fetchMore={fetchMore}
          networkStatus={networkStatus}
        >
          Fetch More Data
        </FetchMore>
      )}
    </Grid>
  );
}
export default withApollo({ ssr: true })(AllCompanies);
