import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_COMPANY_BY_NAME } from "../graphql/search/searchByCompanyName";

export default function Search({ setSearchRes }) {
  const [getCompany, { data, loading }] = useLazyQuery(GET_COMPANY_BY_NAME, {
    fetchPolicy: "network-only" 
  });
  const [searchQuery, setSearchQuery] = React.useState();

  React.useEffect(() => {
    const companyIds = data?.allCompanies?.edges.map(
      (company) => company?.node.id
    );
    setSearchRes(companyIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.allCompanies?.edges, searchQuery]);
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search For Company"
        inputProps={{ "aria-label": "search for company" }}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if(e.key === 'Enter') {
            getCompany({ variables: { companyName: searchQuery } });
            e.preventDefault();
          }
        }}
      />
      <IconButton
        onClick={() => getCompany({ variables: { companyName: searchQuery } })}
        sx={{ p: "10px" }}
        aria-label="search"
        disabled={searchQuery === undefined}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
