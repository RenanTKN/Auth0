import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../components/Loading";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "#f5f5f5",
  },
  media: {
    height: 140,
  },
});

const Profile = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const classes = useStyles();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ minHeight: "50vh" }}
      >
        <Card className={classes.root}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={user.picture} />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={user.name}
            subheader={`<${user.email}>`}
          />
          <CardContent>
            {[
              { key: "Name", value: user.name },
              { key: "Email", value: user.email },
              { key: "Nickname", value: user.nickname },
            ].map((data, index) => (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                key={index}
              >
                {data.key}: {data.value}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default Profile;
