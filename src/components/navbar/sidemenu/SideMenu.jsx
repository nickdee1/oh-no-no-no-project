import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logOut, setRole, setToken } from '../../../pages/login/loginSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { userService } from '../../../services/login';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const token = useAppSelector((state) => state.login.token);
  const pin = useAppSelector((state) => state.login.pin);

  const toggleDrawer = (value) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(value);
  };

  function performLogout() {
    userService.logout(token)
      .then(() => {
        dispatch(logOut());
        dispatch(setRole(''));
        dispatch(setToken(''));
        enqueueSnackbar('You were successfully logged out', { variant: 'success' });
      });
  }

  const list = (
    <div
      className={clsx(classes.list, false)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key="pin">
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary={ 'PIN: ' + pin } />
        </ListItem>
        <Divider />
        <NavLink to="/plan">
          <ListItem button key="plan">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Parking plan" />
          </ListItem>
        </NavLink>
        <NavLink to="/history">
          <ListItem button key="plan">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Parking history" />
          </ListItem>
        </NavLink>
        <NavLink to="/account">
          <ListItem button key="plan">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <ListItem button key="plan" onClick={() => performLogout()}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
