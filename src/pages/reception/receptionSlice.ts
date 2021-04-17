import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface Event {
  id: number,
  resourceId: number,
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
      title: 'Place 101',
    },
    {
      id: 2,
      title: 'Place 102',
    },
    {
      id: 3,
      title: 'Place 103',
    },
    {
      id: 4,
      title: 'Place 104',
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
  },
});

export const {
  addEvent,
  deleteEvent,
} = receptionSlice.actions;

export const selectCount = (state: RootState) => state.login.value;

export default receptionSlice.reducer;
