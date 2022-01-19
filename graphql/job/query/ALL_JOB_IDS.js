import { gql } from "@apollo/client";

export const ALL_JOB_IDS = gql`
  query allJobsIds($first: Int, $after: String) {
    allJobs(first: $first, after: $after) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
