import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Calendar, Views } from 'react-big-calendar';
import { addEvent, deleteEvent, setEvents } from './receptionSlice';

import NavigationBar from '../../components/navbar/NavigationBar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { scheduleService } from '../../services/schedule';

function checkCollision(newEvent, events) {
  for (const event of events) {
    if ((newEvent.start > event.start && newEvent.start < event.end)
            || (newEvent.end > event.start && newEvent.end < event.end)
            || (event.start > newEvent.start && event.start < newEvent.end)
            || (event.end > newEvent.start && event.end < newEvent.end)
            || (event.start.getTime() === newEvent.start.getTime() && event.end.getTime() === newEvent.end.getTime())) {
      return false;
    }
  }
  return true;
}

const Reception = ({ localizer }) => {
  const resources = useAppSelector((state) => state.reception.resources);
  const token = useAppSelector((state) => state.login.token);
  const events = useAppSelector((state) => state.reception.events);
  const dispatch = useAppDispatch();

  useEffect(() => {
    scheduleService.getSchedule(token)
      .then(
        (res) => {
          dispatch(setEvents(res.winstrom.udalost.map((udalost) => ({
            id: parseInt(udalost.id, 10),
            resourceId: udalost.predmet === '' ? 1 : parseInt(udalost.predmet),
            title: udalost.zodpPrac,
            start: new Date(udalost.zahajeni),
            end: new Date(udalost.dokonceni),
          }))));
        },
        (err) => {
        },
      );
  }, []);

  const handleSelectSlot = ({
    start,
    end,
    resourceId,
  }) => {
    const title = window.prompt('Enter user login');
    const idList = events.map((event) => event.id);
    const newId = (idList.length !== 0 ? Math.max(...idList) : 0) + 1;
    const newEvent = {
      id: newId,
      resourceId,
      title,
      start,
      end,
    };
    const sameEvents = events.filter((event) => event.resourceId === resourceId);
    if ((events.length === 0 || checkCollision(newEvent, sameEvents))) {
      dispatch(addEvent(newEvent));
    }
  };

  const handleSelectEvent = (event) => {
    if (window.confirm('Are you sure you wish to delete this event?')) dispatch(deleteEvent(event.id));
  };

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
            events={events}
            localizer={localizer}
            defaultView={Views.DAY}
            views={['day', 'week']}
            step={15}
            timeslots={4}
            min={new Date(null, null, null, 6)}
            max={new Date(null, null, null, 22)}
            resources={resources}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </Grid>
  );
};

export default Reception;
