import Layout from "../layouts/Layout";
import { withApollo } from "../libs/apollo";

const MyApp = ({ Component, pageProps }) => {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
};
export default withApollo({ssr: false})(MyApp);
