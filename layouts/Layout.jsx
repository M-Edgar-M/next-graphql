import {
  Button,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import Link from "next/link";
import React, { createContext, useContext, useState } from "react";
import Search from "../components/Search";
import { MaterialUISwitch } from "../features/mui/muiSwitchBtn";
import { DARK_THEME } from "../features/utils/DARK_THEME";
import { LIGHT_THEME } from "../features/utils/LIGHT_THEME";
import { withApollo } from "../libs/apollo";

const AppContext = createContext();
const useStyles = makeStyles(
  {
    LIGHT_THEME: LIGHT_THEME,
    DARK_THEME: DARK_THEME,
    buttonDark: {
      ...DARK_THEME.button,
    },

    buttonLignt: {
      ...LIGHT_THEME.button,
    },
  },
  { name: "MuiExample_Component" }
);

const Layout = ({ children }) => {
  const [searchRes, setSearchRes] = useState();
  const [theme, setTheme] = useState();
  const sharedContext = { searchRes };
  const classes = useStyles();

  const handleThemeChange = (e) => {
    setTheme(e.target.checked);
  };

  return (
    <AppContext.Provider value={sharedContext}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}
        className={theme ? classes.DARK_THEME : classes.LIGHT_THEME}
      >
        <Link passHref href="/">
          <Button
            variant="outlined"
            sx={{ marginLeft: "5px", alignSelf: "flex-start" }}
            className={theme ? classes.buttonDark : classes.buttonLignt}
          >
            HOME
          </Button>
        </Link>
        <FormControlLabel
          control={
            <MaterialUISwitch sx={{ m: 1 }} onChange={handleThemeChange} />
          }
          label={theme ? "Dark" : "Light"}
          sx={{ alignSelf: "flex-end", marginTop: "-45px" }}
        />

        <Search setSearchRes={setSearchRes} />

        <Grid sx={{ margin: "20px" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            APOLLO/GRAPHQL
          </Typography>
          <Link passHref href="/all-jobs">
            <Button
              variant="contained"
              className={theme ? classes.buttonDark : classes.buttonLignt}
              sx={{ marginLeft: "5px" }}
            >
              Get All Jobs
            </Button>
          </Link>
          <Link passHref href="/all-cast">
            <Button
              variant="contained"
              className={theme ? classes.buttonDark : classes.buttonLignt}
              sx={{ marginLeft: "5px" }}
            >
              Get All Cast
            </Button>
          </Link>
          <Link passHref href="/all-companies">
            <Button
              variant="contained"
              className={theme ? classes.buttonDark : classes.buttonLignt}
              sx={{ marginLeft: "5px" }}
            >
              Get All Companies
            </Button>
          </Link>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </AppContext.Provider>
  );
};

export default withApollo({ ssr: true })(Layout);

export function useAppContext() {
  return useContext(AppContext);
}
