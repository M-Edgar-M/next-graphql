import { gql } from "@apollo/client";

export const ALL_JOBS = gql`
  query allJobs($first: Int, $after: String) {
    allJobs(first: $first, after: $after) {
      edges {
        node {
          id
          jobTitle
          location
          productionType
        }
        cursor
      }
    }
  }
`;
