import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { GET_COMPANY } from "../../graphql/company/GET_COMPANY";

function Job() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_COMPANY, {
    variables: {
      id: query.job,
    },
  });

  const { company } = data || {};

  if (data && data.length !== 0 && loading === false) {
    return (
      <Card sx={{ minWidth: 500 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <b>Company Name</b>
          </Typography>
          <Typography variant="h5" component="div">
            {company.companyName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>slug:</b> {company.slug}
          </Typography>
          <Typography variant="body2">
            <b>description:</b>
            <br />
            {company.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link passHref href="https://www.facebook.com/etmdb/">
            <Button size="small" target="_blank">
              Learn More
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
  if (error) return <Typography>Ooops Error Has Occured!!</Typography>
  return <Loading />;
}
export default Job;
