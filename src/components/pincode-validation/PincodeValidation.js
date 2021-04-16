import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import theme from '../../theme';

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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(pinInput)
  }

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
