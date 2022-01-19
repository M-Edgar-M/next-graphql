import { gql } from "@apollo/client";

export  const ALL_CAST = gql`
  query allCast($first: Int, $after: String) {
    allJobs(first: $first, after: $after) {
      edges {
        node {
          id
          jobTitle
        }
        cursor
      }
    }
  }
`;