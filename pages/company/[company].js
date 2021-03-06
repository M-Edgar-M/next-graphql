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
import { withApollo } from "../../libs/apollo";
import Head from "next/head";
import Image from "next/image";

function Company() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_COMPANY, {
    variables: {
      id: query.company,
    },
  });

  const { company } = data || {};
  const { company: companyId } = query || {};

  if (data && data.length !== 0 && loading === false) {
    return (
      <>
        <Head>
          <title>Company</title>
          <meta property="og:title" content={company?.companyName} />
          <meta
            property="og:url"
            content={`http://localhost:3000/company/${companyId}`}
          />
          <meta
            property="og:image"
            content="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png"
          />
        </Head>
        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
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
      </>
    );
  }
  if (error) return <Typography>Ooops Error Has Occured!!</Typography>;
  return <Loading />;
}
export default withApollo({ ssr: true })(Company);
