import React from 'react';
import { Grid } from '@material-ui/core';
import HistoryContent from '../components/HistoryContent';
import NavigationBar from '../components/navbar/NavigationBar';

function History() {
  return (
    <Grid container direction="column">
      <Grid item>
        <NavigationBar title="History" />
      </Grid>
      <Grid item container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <HistoryContent />
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
}

export default History;
