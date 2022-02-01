// import { Login } from "@mui/icons-material";
import { Button, FormControlLabel, Grid, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import Link from "next/link";
import React, { createContext, useContext, useState, useEffect } from "react";
import Login from "../components/Login";
import Search from "../components/Search";
import { MaterialUISwitch } from "../features/mui/muiSwitchBtn";
import { DARK_THEME } from "../features/utils/DARK_THEME";
import { LIGHT_THEME } from "../features/utils/LIGHT_THEME";
import { useLocalStorage } from "../hooks/useLocalStorage";
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

const Layout = ({ setState, children }) => {
  const [searchRes, setSearchRes] = useState();
  const [theme, setTheme] = useState(false);
  const [open, setOpen] = useState(false);
  // const [theme, setTheme] = useLocalStorage('theme', false);
  useEffect(() => {
    setState(Boolean(theme));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  setState(theme);

  const sharedContext = { searchRes, theme: theme };
  const classes = useStyles();

  const handleThemeChange = (e) => {
    setTheme(e.target.checked);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          checked={Boolean(theme)}
        />
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{ alignSelf: "center", marginTop: "-45px" }}
        >
          Login
        </Button>

        {/* <Search setSearchRes={setSearchRes} /> */}

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
        <Grid item>
          {children}
          <Login handleOpen={open} handleClose={handleClose} />
        </Grid>
      </Grid>
    </AppContext.Provider>
  );
};

export default Layout;

export function useAppContext() {
  return useContext(AppContext);
}
