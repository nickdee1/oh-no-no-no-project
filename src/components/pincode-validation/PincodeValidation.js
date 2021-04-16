import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTabletPlace } from '../../pages/login/loginSlice';
import theme from '../../theme';
import tabletService from '../../services/tablet';

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    height: '100px',
    margin: theme.spacing(3, 0, 2),
  },
  input1: {
    height: 50,
    fontSize: '3em',
  },
});

const PincodeValidation = () => {
  const classes = useStyles();
  const [pinInput, setPinInput] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    tabletService.getParkingPosition(pinInput)
      .then(
        (res) => {
          dispatch(setTabletPlace(res.place));
        },
        (err) => {
          dispatch(setTabletPlace('error'));
        },
      );
  };

  return (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        color="secondary"
        required
        fullWidth
        id="pin"
        label="Your PIN code"
        name="pin"
        InputProps={{ classes: { input: classes.input1 } }}
        onChange={(e) => setPinInput(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
      >
        Submit
      </Button>
    </form>
  );
};

export default PincodeValidation;
