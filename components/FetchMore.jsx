import { LoadingButton } from "@mui/lab";
import { Tooltip } from "@mui/material";
import Link from "next/link";

const FetchMore = ({
  page,
  setPage,
  hasNextPage,
  pageInfo,
  fetchMore,
  networkStatus,
  children,
}) => {
  return (
    <Link
      href={`all-companies?page=${page + 1}`}
      scroll={false}
      shallow={true}
      passHref
    >
      <Tooltip title={!hasNextPage && "No More Data"}>
        <span>
          <LoadingButton
            onClick={() => {
              setPage(Number(page) + 1);
              const { endCursor } = pageInfo || {};
              fetchMore({
                variables: {
                  first: page * 5,
                  after: endCursor,
                },
              });
            }}
            loading={
              networkStatus && (networkStatus === 3 || networkStatus === 1)
            }
            loadingIndicator="Loading..."
            variant="outlined"
            sx={{ marginTop: "10px" }}
            disabled={!hasNextPage}
          >
            {children}
          </LoadingButton>
        </span>
      </Tooltip>
    </Link>
  );
};

export default FetchMore;
