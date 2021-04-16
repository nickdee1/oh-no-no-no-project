import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './pages/login/loginSlice';
import planReducer from './pages/plan/planSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    plan: planReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
