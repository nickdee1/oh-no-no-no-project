import React, { useState } from 'react';
import { Button, makeStyles, TextField, Grid } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTabletPlace } from '../../pages/login/loginSlice';
import theme from '../../theme';
import NumPad from 'react-numpad';
import tabletService from '../../services/tablet';

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    height: '100px',
    marginTop: 10,
    color: 'secondary',
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
      <NumPad.Number
        onChange={(e) => setPinInput(e)}
      >
      <TextField
        variant="outlined"
        margin="normal"
        color="secondary"
        required
        fullWidth
        id="pin"
        label="Your PIN code"
        name="pin"
        value={pinInput}
        InputProps={{ classes: { input: classes.input1 } }}
        onChange={(e) => setPinInput(e.target.value)}
      />
      </NumPad.Number>
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
