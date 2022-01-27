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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    margin: "0 25px",
  },
  ligntMode: {
    backgroundColor: theme.palette.background.default,
    margin: "0 25px",
  },
}));

function Job() {
  const { theme } = useAppContext();
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
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={theme ? classes.ligntMode : classes.root}
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
export default Job;
