import React, { useState } from 'react';
import {
  Checkbox,
  Grid, makeStyles, TextField, Typography, FormControlLabel, Button, Link, Container, CssBaseline,
} from '@material-ui/core';
import { setToken, logIn } from '../../pages/login/loginSlice';
import theme from '../../theme';
import { userService } from '../../services/login';
import { useAppDispatch } from '../../hooks';

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  remember: {
    flex: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const LoginContent = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(
      (inputs) => ({ ...inputs, [name]: value }),
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    userService.login(username, password)
      .then(
        (token) => {
          dispatch(setToken(token));
          dispatch(logIn())
        },
      );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="secondary">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginContent;
