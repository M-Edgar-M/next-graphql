import { gql } from "@apollo/client";

export const GET_COMPANY = gql`
  query getCompany($id: ID!) {
    company(id: $id) {
      slug
      companyName
      description
    }
  }
`;
