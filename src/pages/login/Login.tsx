import React from 'react';
import { Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import NavigationBar from '../../components/navbar/NavigationBar';
import LoginContent from '../../components/login-content/LoginContent';

export function Login() {
  const logged = useAppSelector((state) => state.login.logged);

  if (logged) {
    return <Redirect to="/plan" />;
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <NavigationBar title="Login" />
      </Grid>
      <Grid item container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <LoginContent/>
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
}

export default Login;
