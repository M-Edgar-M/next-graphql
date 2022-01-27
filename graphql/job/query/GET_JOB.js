import { gql } from "@apollo/client";

export const GET_JOB = gql`
  query getJob($id: ID!) {
    job(id: $id) {
      id
      jobTitle
      location
      productionType
      slug
      genderMf
      ageLevel
      description
    }
  }
`;
