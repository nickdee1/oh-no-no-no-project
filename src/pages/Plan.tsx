import React from 'react';
import { Grid } from '@material-ui/core';
import NavigationBar from '../components/navbar/NavigationBar';

function Plan() {
  return (
    <Grid container direction="column">
      <Grid item>
        <NavigationBar title="Plan" />
      </Grid>
      <Grid item container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          Plan
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
}

export default Plan;
