import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { GET_JOB } from "../../graphql/job/query/GET_JOB";
import { makeStyles } from "@mui/styles";
import { useAppContext } from "../../layouts/Layout";
import { withApollo } from "../../libs/apollo";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    margin: "0 25px",
  },
}));

function Job() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_JOB, {
    variables: {
      id: query.job,
    },
  });

  const { job } = data || {};

  if (data && data.length !== 0 && loading === false) {
    return (
      <div>
        <Head>
          <title>Company</title>
          <meta property="og:title" content={job?.jobTitle} />
          <meta
            property="og:url"
            content={`http://localhost:3000/company/${query.job}`}
          />
          <meta
            property="og:image"
            content="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png"
          />
        </Head>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={classes.root}
          sx={{ margin: "0 auto" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{ color: "#00baf3", width: "55px", height: "35px" }}
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ margin: "0 auto" }}
          >
            <Typography sx={{ width: "30%" }}>Job Title</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {job.jobTitle}
            </Typography>
            <Typography sx={{ width: "30%" }}>Slug:</Typography>
            <Typography sx={{ color: "text.secondary" }}>{job.slug}</Typography>
            <Typography sx={{ width: "30%" }}>Gender</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {job.genderMf}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ margin: "0 auto" }}>
            <Typography
              variant="h4"
              sx={{ width: "33%", textDecoration: "underline" }}
            >
              Description
            </Typography>
            <Typography>{job.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
  if (error) return <Typography>Ooops Error Has Occured!!</Typography>;
  return <Loading />;
}
export default withApollo({ ssr: true })(Job);
