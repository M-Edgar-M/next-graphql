import { useQuery, gql } from "@apollo/client";

const ALL_JOBS = gql`
  query ($first: Int, $after: String) {
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

export function useGetAllJobs() {
  const { loading, error, data } = useQuery(ALL_JOBS);

  return {
      data,
      loading,
      error,
  }
}
