import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  ClickAwayListener,
  Box,
  Card,
} from "@material-ui/core";
import useStyles from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constant/actionTypes";
import decode from "jwt-decode";
import LogoMain from "../../images/LogoMain";
import MenuIcon from "@material-ui/icons/Menu";
import { useWindowSize } from "../../helper/useWindowSize";

export const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const size = useWindowSize();
  const isMobile = size.width < 700;

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });

    history.push("/auth");

    setUser(null);
  }, [dispatch, history]);

  useEffect(() => {
    const token = user?.user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logOut, user?.user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h3"
          align="center"
        >
          places
        </Typography>
        <LogoMain />
      </div>
      {!isMobile && (
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.user?.name}
                src={user?.user?.imageUrl}
              >
                {user?.user?.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.user?.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logOut}
              >
                Log out
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              className={classes.logout}
              color="primary"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      )}
      {isMobile && (
        <>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box sx={{ position: "relative" }}>
              <Button onClick={() => setOpen(!open)}>
                <MenuIcon />
              </Button>
              {open ? (
                <Card className={classes.menu} elevation={5}>
                  <Toolbar className={classes.toolbar}>
                    {user ? (
                      <div className={classes.profile}>
                        <Avatar
                          className={classes.purple}
                          alt={user?.user?.name}
                          src={user?.user?.imageUrl}
                        >
                          {user?.user?.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                          {user?.user?.name}
                        </Typography>
                        <Button
                          variant="contained"
                          className={classes.logout}
                          color="secondary"
                          onClick={logOut}
                        >
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        className={classes.logout}
                        color="primary"
                      >
                        Sign in
                      </Button>
                    )}
                  </Toolbar>
                </Card>
              ) : null}
            </Box>
          </ClickAwayListener>
        </>
      )}
    </AppBar>
  );
};
