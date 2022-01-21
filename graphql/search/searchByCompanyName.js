import { gql } from "@apollo/client";

export const GET_COMPANY_BY_NAME = gql`
  query searchByCompanyName($companyName: String) {
    allCompanies(companyName: $companyName) {
      edges {
        node {
          id
          companyName
        }
      }
    }
  }
`;