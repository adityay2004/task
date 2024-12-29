import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import loginSlice from './slice/loginSlice';
import appointmentSlice from './slice/appointmentSlice';
import schedulerSlice from './slice/schedulerSlice';

export const rootReducer = combineReducers({
  authReducer: authSlice,
  loginReducer: loginSlice,
  appointmentReducer: appointmentSlice,
  schedulerReducer: schedulerSlice,
});
