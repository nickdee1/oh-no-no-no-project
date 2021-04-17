import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import NavigationBar from '../../components/navbar/NavigationBar';
import HistoryCard from "../../components/HistoryCard";
import ReservationCard from "./ReservationCard";

function Main() {
  return (
    <Grid container direction="column">
      <Grid item>
        <NavigationBar title="Main" />
      </Grid>
      <Grid item container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
            <ReservationCard/>
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
}

export default Main;
