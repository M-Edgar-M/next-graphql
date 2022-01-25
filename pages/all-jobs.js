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
} from "@mui/material";
import { ALL_JOBS } from "../graphql/job/query/ALL_JOBS";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

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

function AllJobs({ onCLick }) {
  const classes = useStyles();
  const { data, loading } = useQuery(ALL_JOBS);
  const router = useRouter();

  const handleClick = (id) => {
    console.log(id);
  };
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
          <TableBody>
            {data?.allJobs?.edges.map((item) => (
              <TableRow
                className={classes.tr}
                key={item.cursor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  className={classes.th}
                  scope="row"
                  onClick={() => handleClick(item.node.id)}
                >
                  {item.node.jobTitle}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
export default AllJobs;
