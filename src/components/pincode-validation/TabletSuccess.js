import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { setTabletPlace } from '../../pages/login/loginSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import theme from '../../theme';

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(20),
  },
  title: {
    fontWeight: 600,
  },
  button: {
    marginTop: theme.spacing(15),
    width: 200,
    height: 100,
  },
});

const TabletSuccess = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const tabletPlace = useAppSelector((state) => state.login.tabletPlace);
  const tabletFrom = useAppSelector((state) => state.login.tablet_from);
  const tabletTo = useAppSelector((state) => state.login.tablet_to);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setTabletPlace(''));
  };

  return (
    <Grid container direction="column" className={classes.paper}>
      <Grid item container>
        <Grid item xs={1} md={3} />
        <Grid item xs={10} md={6}>
          <Typography className={classes.title} variant="h2">
            ✅SUCCESS
          </Typography>
          <Typography variant="h4">
            Your place is:
            {' '}
            {tabletPlace}
          </Typography>
          <Typography variant="h6">
            From {tabletFrom} to {tabletTo}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleClick}
          >
            OK
          </Button>
        </Grid>
        <Grid item xs={1} md={3} />
      </Grid>
    </Grid>
  );
};

export default TabletSuccess;
