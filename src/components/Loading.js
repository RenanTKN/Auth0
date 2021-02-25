import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ minHeight: "50vh" }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default Loading;
