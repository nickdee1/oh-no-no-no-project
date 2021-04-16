import React from 'react';
import { Grid } from '@material-ui/core';
import NavigationBar from '../components/navbar/NavigationBar';

function Account() {
  return (
    <Grid container direction="column">
      <Grid item>
        <NavigationBar title="Account" />
      </Grid>
      <Grid item container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          Account
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
}

export default Account;
