import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Profile from "./views/Profile";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <Router>
    <Navbar />

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <PrivateRoute path="/profile">
        <Profile />
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
