import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface LoginState {
  value: number,
  logged: boolean,
  token: string
}

const initialState: LoginState = {
  value: 0,
  logged: false,
  token: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    logIn: (state) => {
      state.logged = true;
    },
    logOut: (state) => {
      state.logged = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  logIn,
  logOut,
  setToken
} = loginSlice.actions;

export const selectCount = (state: RootState) => state.login.value;

export default loginSlice.reducer;
