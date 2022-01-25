import { ApolloClient, HttpLink, fetch } from "@apollo/client";

import { InMemoryCache } from "@apollo/client/cache";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allCompanies: relayStylePagination(),
      },
    },
  },
});

export function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: "https://etmdb.com/graphql",
      credentials: "same-origin",
      fetch,
    }),
    cache: cache || new InMemoryCache().restore(initialState),
  });
}
