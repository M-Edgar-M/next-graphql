import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import Layout from "../layouts/Layout";
import { withApollo } from "../libs/apollo";

const MyApp = ({ Component, pageProps }) => {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
};
export default withApollo({ssr: true})(MyApp);
