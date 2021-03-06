import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteEvent } from '../plan/planSlice';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ReservationCard() {
  const events = useAppSelector((state) => state.plan.events);
  const dispatch = useAppDispatch();
  const nextEvent = events.filter((event) => event.end >= new Date())
    .sort((event1, event2) => event1.start - event2.start)[0];
  const classes = useStyles();

  const content = () => {
    if (nextEvent) {
      if (nextEvent.start > new Date()) {
        return (
          <CardContent>
            <Typography variant="h5" component="h2">
              Your next reservation
            </Typography>
            <Typography variant="h5" component="h2">
              {moment(nextEvent.start)
                .calendar()}
            </Typography>
            <NavLink to="/plan" button>
              Change
            </NavLink>
          </CardContent>
        );
      }
      return (
        <CardContent>
          <Typography variant="h5" component="h2">
            Your current reservation
          </Typography>
          <Typography variant="h5" component="h2">
            {moment(nextEvent.end)
              .calendar()}
          </Typography>
          <Button onClick={() => dispatch(deleteEvent(nextEvent.id))}>
            Cancel
          </Button>
        </CardContent>
      );
    }
    return (
      <CardContent>
        <Typography variant="h5" component="h2">
          Seems you have no reservations
        </Typography>
        <NavLink to="/plan" button>
          Create a plan
        </NavLink>
      </CardContent>
    );
  };

  return (
    <Card className={classes.root}>
      {content()}
    </Card>
  );
}
