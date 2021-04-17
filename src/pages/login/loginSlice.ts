import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface LoginState {
  value: number,
  logged: boolean,
  token: string,
  role: string,
  username: string,
  pin: string,
  tabletPlace: string,
  tablet_from: string,
  tablet_to: string,
}

const initialState: LoginState = {
  value: 0,
  logged: false,
  token: '',
  role: '',
  username: '',
  pin: '',
  tabletPlace: '',
  tablet_from: '',
  tablet_to: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: (state) => {
      state.logged = true;
    },
    logOut: (state) => {
      state.logged = false;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setTabletPlace: (state, action: PayloadAction<string>) => {
      state.tabletPlace = action.payload;
    },
    setTabletFrom: (state, action: PayloadAction<string>) => {
      state.tablet_from = action.payload;
    },
    setTabletTo: (state, action: PayloadAction<string>) => {
      state.tablet_to = action.payload;
    },
  },
});

export const {
  logIn,
  logOut,
  setRole,
  setUsername,
  setPin,
  setToken,
  setTabletPlace,
  setTabletFrom,
  setTabletTo,
} = loginSlice.actions;

export const selectCount = (state: RootState) => state.login.value;

export default loginSlice.reducer;
