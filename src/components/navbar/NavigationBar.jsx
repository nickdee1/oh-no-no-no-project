import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import SideMenu from './sidemenu/SideMenu';
import { useAppSelector } from '../../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavigationBar(props) {
  const classes = useStyles();

  const logged = useAppSelector((state) => state.login.logged);

  const menuButton = logged
    ? <SideMenu />
    : (
      <NavLink to="/login">
        <Button color="inherit">
          Login
        </Button>
      </NavLink>
    );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/">
            <Typography variant="h6" className={classes.title}>
              OH-NO-NO-NO Parking
            </Typography>
          </NavLink>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {menuButton}
        </Toolbar>
      </AppBar>
    </div>
  );
}
