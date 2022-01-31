import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ALL_COMPANIES } from "../graphql/company/GET_ALL_COMPANIES";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { useAppContext } from "../layouts/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { withApollo } from "../libs/apollo";

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
  console.log(
    "🚀 ~ file: all-companies.js ~ line 54 ~ AllCompanies ~ router",
    router
  );
  const [page, setPage] = useState(Number(router.query.page || 1));
  const classes = useStyles();
  const { data, loading, networkStatus, error, fetchMore } = useQuery(
    ALL_COMPANIES,
    {
      variables: {
        first: page * 15,
        after: null,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
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
              <Link
                key={i}
                href={`/company/${item.node.id}`}
                passHref
                sx={{ textDecoration: "none" }}
              >
                <a className={classes.tr} style={{ textDecoration: "none" }}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link
        href={`all-companies?page=${page + 1}`}
        scroll={false}
        shallow={true}
        passHref
      >
        <Tooltip title={!hasNextPage && "No More Data"}>
          <span>
            <LoadingButton
              onClick={() => {
                setPage(Number(page) + 1);
                const { endCursor } = data?.allCompanies.pageInfo;
                fetchMore({
                  variables: {
                    first: page * 5,
                    after: endCursor,
                  },
                });
              }}
              loading={
                networkStatus && (networkStatus === 3 || networkStatus === 1)
              }
              loadingIndicator="Loading..."
              variant="outlined"
              sx={{ marginTop: "10px" }}
              disabled={!hasNextPage}
            >
              Fetch data
            </LoadingButton>
          </span>
        </Tooltip>
      </Link>
    </Grid>
  );
}
export default withApollo({ ssr: true })(AllCompanies);
