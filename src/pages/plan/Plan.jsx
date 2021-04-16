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
            || (event.end > newEvent.start && event.end < newEvent.end)) {
      return false;
    }
  }
  return true;
}

function checkTime(event) {
  const diffTime = Math.abs(event.start - event.end);
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return diffHours <= 8;
}

const Plan = ({ localizer }) => {
  const events = useAppSelector((state) => state.plan.events);
  const dispatch = useAppDispatch();

  const handleSelectSlot = ({
    start,
    end,
  }) => {
    const idList = events.map((event) => event.id);
    const newId = (idList.length !== 0 ? Math.max(...idList) : 0) + 1;
    const newEvent = {
      id: newId,
      start,
      end,
    };
    if (checkTime(newEvent) && (events.length === 0 || checkCollision(newEvent, events))) {
      dispatch(addEvent(newEvent));
    }
  };

  const handleSelectEvent = (event) => {
    if (window.confirm('Are you sure you wish to delete this event?')) dispatch(deleteEvent(event.id));
  };

  const today = new Date();

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
            min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6)}
            max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22)}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
};

export default Plan;
