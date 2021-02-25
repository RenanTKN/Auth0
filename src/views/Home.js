import React from "react";
import Container from "@material-ui/core/Container";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Container>
      <h1>Auth0</h1>
      <p>
        {isAuthenticated
          ? `Welcome, ${user.given_name}, now you can check your profile in the menu`
          : "Log in to check your profile info"}
      </p>
    </Container>
  );
};

export default Home;
