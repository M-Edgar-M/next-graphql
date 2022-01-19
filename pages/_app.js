import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import Layout from "../layouts/Layout";

const client = new ApolloClient({
  ssrMode: true,
  uri: "https://etmdb.com/graphql",
  cache: new InMemoryCache(),
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
