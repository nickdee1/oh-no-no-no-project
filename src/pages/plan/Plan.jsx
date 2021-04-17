import React from 'react';
import { Grid } from '@material-ui/core';
import { Calendar, Views } from 'react-big-calendar';
import { addEvent, deleteEvent } from './planSlice';

import NavigationBar from '../../components/navbar/NavigationBar';
import { useAppDispatch, useAppSelector } from '../../hooks';

function checkCollision(newEvent, events) {
  for (const event of events) {
    if ((newEvent.start > event.start && newEvent.start < event.end)
            || (newEvent.end > event.start && newEvent.end < event.end)
            || (event.start > newEvent.start && event.start < newEvent.end)
            || (event.end > newEvent.start && event.end < newEvent.end)
            || (newEvent.start.getTime() === event.start.getTime() && newEvent.end.getTime() === event.end.getTime())) {
      return false;
    }
  }
  return true;
}

function checkTime(newEvent, events) {
  let totalSlots = Math.ceil(Math.abs(newEvent.start - newEvent.end) / (1000 * 60 * 15));
  events.filter((event) => event.start.getDay() === newEvent.start.getDay())
    .forEach((event) => {
      totalSlots += Math.ceil(Math.abs(event.start - event.end) / (1000 * 60 * 15));
    });
  return totalSlots <= 32;
}

function isActive(event) {
  return event.end > new Date();
}

const Plan = ({ localizer }) => {
  const events = useAppSelector((state) => state.plan.events);
  const dispatch = useAppDispatch();

  const handleSelectSlot = ({
    start,
    end,
  }) => {
    const idList = events.map((event) => event.id);
    const biggestId = Math.max(...idList);
    const newId = biggestId <= 0 ? 1 : biggestId + 1;
    const newEvent = {
      id: newId,
      start,
      end,
    };
    const userEvents = events.filter((event) => event.id > 0);
    if (isActive(newEvent) && checkTime(newEvent, userEvents)
            && (events.length === 0 || checkCollision(newEvent, events))) {
      dispatch(addEvent(newEvent));
    }
  };

  const handleSelectEvent = (event) => {
    if (isActive(event) && event.id > 0 && window.confirm('Are you sure you wish to delete this event?')) dispatch(deleteEvent(event.id));
  };

  const eventStyleGetter = (event) => (event.id < 0
    ? {
      style: {
        backgroundColor: '#d32f2f',
        opacity: isActive(event) ? 1 : 0.5,
      },
    }
    : {
      style: {
        backgroundColor: '#43a047',
        opacity: isActive(event) ? 1 : 0.5,
      },
    });

  return (
    <Grid container direction="column">
      <Grid item>
        <NavigationBar title="Plan" />
      </Grid>
      <Grid item container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Calendar
            selectable
            resizable
            popup
            toolbar={false}
            events={events}
            localizer={localizer}
            defaultView={Views.WEEK}
            views={['week']}
            step={15}
            timeslots={4}
            min={new Date(null, null, null, 6)}
            max={new Date(null, null, null, 22)}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
          />
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
};

export default Plan;
