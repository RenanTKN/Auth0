import React from "react";
import { Link } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

const Drawer = ({ openDrawer, toggleDrawer }) => {
  const classes = useStyles();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={openDrawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          {!isAuthenticated && (
            <ListItem button onClick={loginWithRedirect}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          )}
          {isAuthenticated && (
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          {[
            { text: "Auth0", url: "https://auth0.com/", icon: <LockIcon /> },
            {
              text: "Material-UI",
              url: "https://material-ui.com/",
              icon: <CodeIcon />,
            },
            {
                text: "React Router",
                url: "https://reactrouter.com/",
                icon: <CallSplitIcon />,
              },
          ].map((data, index) => (
            <ListItem
              button
              component="a"
              href={data.url}
              target="_blank"
              key={index}
            >
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
