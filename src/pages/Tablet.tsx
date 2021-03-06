import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PincodeValidation from '../components/pincode-validation/PincodeValidation';
import { useAppDispatch, useAppSelector } from '../hooks';
import theme from '../theme';
import TabletSuccess from "../components/pincode-validation/TabletSuccess";
import TabletError from "../components/pincode-validation/TabletError";

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(20),
  },
  title: {
    fontWeight: 600,
  },
  subtitle: {
    color: 'grey',
  },
});

function Tablet() {
  const classes = useStyles();
  const tabletPlace = useAppSelector((state) => state.login.tabletPlace);

  if (tabletPlace !== '' && tabletPlace !== 'error') {
    return <TabletSuccess />
  }
  if (tabletPlace === 'error') {
    return <TabletError />
  }

  return (
    <Grid container direction="column" className={classes.paper}>
      <Grid item container>
        <Grid item xs={1} md={3} />
        <Grid item xs={10} md={6}>
          <Typography className={classes.title} variant="h2">
            Pass your PIN code
          </Typography>
          <Typography className={classes.subtitle} variant="h4">
            You can find it in account settings
          </Typography>
          <PincodeValidation />
        </Grid>
        <Grid item xs={1} md={3} />
      </Grid>
    </Grid>
  );
}

export default Tablet;
