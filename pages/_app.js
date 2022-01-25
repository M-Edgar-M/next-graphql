import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import Link from "next/link";
import Layout from "../layouts/Layout";


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allCompanies: relayStylePagination(),
      },
    },
  },
});

const client = new ApolloClient({
  ssrMode: true,
  uri: "https://etmdb.com/graphql",
  cache,
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};
export default MyApp;
