import React from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logIn } from './loginSlice';
import NavigationBar from '../../components/navbar/NavigationBar';

export function Login() {
  const logged = useAppSelector((state) => state.login.logged);
  const dispatch = useAppDispatch();

  if (logged) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <NavigationBar title="Login" />
      </Grid>
      <Grid item container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <div>
            <Button onClick={() => dispatch(logIn())}>
              Login
            </Button>
          </div>
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
}

export default Login;
