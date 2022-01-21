import { gql } from "@apollo/client";

export const ALL_COMPANIES= gql`
  query allCompanies($first: Int, $after: String) {
    allCompanies(first: $first, after: $after) {
      edges {
        node {
          id
          slug
          companyName
          description
        }
        cursor
      }
    }
  }
`;
