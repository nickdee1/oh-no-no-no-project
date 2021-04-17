import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface Event {
  id: number,
  resourceId: number,
  title: string,
  start: Date,
  end: Date
}

interface Resource {
  id: number,
  title: string,
}

interface ReceptionState {
  events: Array<Event>,
  resources: Array<Resource>
}

const initialState: ReceptionState = {
  events: [],
  resources: [
    {
      id: 1,
      title: 'Without reservation',
    },
    {
      id: 101,
      title: 'Place 101',
    },
    {
      id: 2,
      title: 'Place 102',
    },
    {
      id: 103,
      title: 'Place 103',
    },
    {
      id: 4,
      title: 'Place 104',
    },
    {
      id: 5,
      title: 'Place 105',
    },
    {
      id: 6,
      title: 'Place 106',
    },
    {
      id: 7,
      title: 'Place 107',
    },
    {
      id: 8,
      title: 'Place 108',
    },
    {
      id: 9,
      title: 'Place 109',
    },
    {
      id: 10,
      title: 'Place 110',
    },
    {
      id: 11,
      title: 'Place 11',
    },
    {
      id: 12,
      title: 'Place 112',
    },
    {
      id: 13,
      title: 'Place 113',
    },
    {
      id: 14,
      title: 'Place 114',
    },
    {
      id: 15,
      title: 'Place 115',
    },
    {
      id: 16,
      title: 'Place 116',
    },
    {
      id: 17,
      title: 'Place 117',
    },
    {
      id: 18,
      title: 'Place 118',
    },
    {
      id: 19,
      title: 'Place 119',
    },
    {
      id: 20,
      title: 'Place 120',
    },
  ],
};

export const receptionSlice = createSlice({
  name: 'reception',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    setEvents: (state, action: PayloadAction<Array<Event>>) => {
      state.events = action.payload;
    },
  },
});

export const {
  addEvent,
  deleteEvent,
  setEvents,
} = receptionSlice.actions;

export const selectCount = (state: RootState) => state.login.value;

export default receptionSlice.reducer;
