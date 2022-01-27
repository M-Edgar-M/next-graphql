import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { GET_JOB } from "../../graphql/job/query/GET_JOB";

function Job() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_JOB, {
    variables: {
      id: query.job,
    },
  });

  const { job } = data || {};

  if (data && data.length !== 0 && loading === false) {
    return (
      <Card sx={{ minWidth: 500 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <b>Job Title</b>
          </Typography>
          <Typography variant="h5" component="div">
            {job.jobTitle}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Location:</b> {job.location}
          </Typography>
          <Typography variant="body2">
            <b>Production Type:</b>
            <br />
            {job.productionType}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (error) return <Typography>Ooops Error Has Occured!!</Typography>;
  return <Loading />;
}
export default Job;
