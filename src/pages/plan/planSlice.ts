import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface Event {
  id: number,
  start: Date,
  end: Date
}

interface PlanState {
  events: Array<Event>,
}

const initialState: PlanState = {
  events: [],
};

export const planSlice = createSlice({
  name: 'plan',
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
} = planSlice.actions;

export const selectCount = (state: RootState) => state.login.value;

export default planSlice.reducer;
