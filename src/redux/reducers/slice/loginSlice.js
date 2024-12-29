import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginData: {
    dob: '',
    email: '',
    firstName: '',
    gender: '',
    initial: '',
    lastName: '',
    maritalStatus: '',
    middleName: '',
    phoneNumber: '',
  },
};

const loginSlice = createSlice({
  name: 'loginReducer',
  initialState,
  reducers: {
    addLoginData: (state, action) => {
      state.loginData.dob = action?.payload?.dob || '';
      state.loginData.email = action?.payload?.email || '';
      state.loginData.firstName = action?.payload?.firstName || '';
      state.loginData.gender = action?.payload?.gender || '';
      state.loginData.initial = action?.payload?.initial || '';
      state.loginData.lastName = action?.payload?.lastName || '';
      state.loginData.maritalStatus = action?.payload?.maritalStatus || '';
      state.loginData.middleName = action?.payload?.middleName || '';
      state.loginData.phoneNumber = action?.payload?.phoneNumber || '';
    },

    deleteLoginData: (state) => {
      state.loginData = {
        dob: '',
        email: '',
        firstName: '',
        gender: '',
        initial: '',
        lastName: '',
        maritalStatus: '',
        middleName: '',
        phoneNumber: '',
      };
    },
  },
});

export const { addLoginData, deleteLoginData } = loginSlice.actions;
export default loginSlice.reducer;
