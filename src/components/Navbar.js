import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const { isAuthenticated, logout, user, loginWithRedirect } = useAuth0();

  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Auth0
          </Typography>

          <div>
            {isAuthenticated ? (
              <Avatar
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                alt={user.name}
                src={user.picture}
                className={classes.avatar}
              />
            ) : (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="medium"
              >
                <AccountCircle />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {isAuthenticated ? (
                <div>
                  <MenuItem component={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout({ returnTo: window.location.origin });
                    }}
                  >
                    Log out
                  </MenuItem>
                </div>
              ) : (
                <MenuItem onClick={loginWithRedirect}>Login</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      <Drawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      </AppBar>

  );
};

export default Navbar;
