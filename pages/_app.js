import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "./components/Layout";

const client = new ApolloClient({
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
