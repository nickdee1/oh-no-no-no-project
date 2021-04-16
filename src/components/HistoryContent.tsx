import React from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import HistoryCard from './HistoryCard';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const HistoryContent = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container spacing={4}>
        <Grid item xs={12}>
            <Typography variant='h4'>
                Your history
            </Typography>
        </Grid>
      <Grid item xs={12}>
        <HistoryCard />
      </Grid>
      <Grid item xs={12}>
        <HistoryCard />
      </Grid>
    </Grid>
  );
};

export default HistoryContent;
