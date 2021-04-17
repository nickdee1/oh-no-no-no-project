import React, { useState } from 'react';
import {
  Grid, makeStyles, TextField, Typography, Button, Container, CssBaseline,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {
  setToken, logIn, logOut, setRole, setUsername, setPin,
} from '../../pages/login/loginSlice';
import theme from '../../theme';
import { userService } from '../../services/login';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PIN_STRING } from '../../constants/strings';

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
  const token_usr = useAppSelector((state) => state.login.token);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
        (result) => {
          dispatch(setToken(result.authSessionId));
          dispatch(setUsername(username));
          dispatch(setRole(result.role.split(":")[1]));
          localStorage.setItem('usr_token', result.authSessionId)
          dispatch(logIn());
          userService.firstCheckPin(token_usr)
            .then(
              (res) => {
                if (res === '') {
                  userService.getGeneratedPin(token_usr)
                    .then((pin) => {
                      dispatch(setPin(pin));
                      enqueueSnackbar(PIN_STRING(pin), { variant: 'success' });
                    });
                } else {
                  dispatch(setPin(res));
                }
              },
            );
        },
        (error) => {
          if (error === 400) {
            enqueueSnackbar('Login or password are not correct!', { variant: 'error' });
          } else {
            enqueueSnackbar('Some error occurred. Try this action later..', { variant: 'error' });
          }
          dispatch(setToken(''));
          dispatch(setRole(''));
          dispatch(setUsername(''));
          dispatch(logOut());
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container />
        </form>
      </div>
    </Container>
  );
};

export default LoginContent;
