// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   appointmentList: [],
//   lastId: 0,
// };

// const appointmentSlice = createSlice({
//   name: 'appointmentReducer',
//   initialState,
//   reducers: {
//     addAppointmentData: (state, action) => {
//       state.lastId += 1;
//       const newAppointmentData = {
//         id: state.lastId,
//         advance: action?.payload?.advance || '',
//         age: action?.payload?.age || 0,
//         appointmentNo: action?.payload?.appointmentNo || '',
//         fees: action?.payload?.fees || '',
//         gender: action?.payload?.gender || '',
//         morningValue: action?.payload?.morningValue || 0,
//         patientName: action?.payload?.patientName || '',
//         phoneNumber: action?.payload?.phoneNumber || '',
//         remark: action?.payload?.remark || '',
//         selectedDate: action?.payload?.selectedDate || '',
//         selectedTime: action?.payload?.selectedTime || '',
//         uhidNo: action?.payload?.uhidNo || '',
//       };
//       state.appointmentList.push(newAppointmentData);
//     },

//     deleteAppointmentData: (state) => {
//       state.appointmentList = [];
//       state.lastId = 0;
//     },
//   },
// });

// export const { addAppointmentData, deleteAppointmentData } = appointmentSlice.actions;
// export default appointmentSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'appointments.db', location: 'default' },
  () => {},
  (error) => {
    console.log(error);
  }
);

const initialState = {
  appointmentList: [],
  lastId: 0,
};

const appointmentSlice = createSlice({
  name: 'appointmentReducer',
  initialState,
  reducers: {
    addAppointmentData: (state, action) => {
      state.lastId += 1;
      const newAppointmentData = {
        id: state.lastId,
        advance: action?.payload?.advance || '',
        age: action?.payload?.age || 0,
        appointmentNo: action?.payload?.appointmentNo || '',
        fees: action?.payload?.fees || '',
        gender: action?.payload?.gender || '',
        morningValue: action?.payload?.morningValue || 0,
        patientName: action?.payload?.patientName || '',
        phoneNumber: action?.payload?.phoneNumber || '',
        remark: action?.payload?.remark || '',
        selectedDate: action?.payload?.selectedDate || '',
        selectedTime: action?.payload?.selectedTime || '',
        uhidNo: action?.payload?.uhidNo || '',
      };

      state.appointmentList.push(newAppointmentData);

      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO appointments (id, advance, age, appointmentNo, fees, gender, morningValue, patientName, phoneNumber, remark, selectedDate, selectedTime, uhidNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            newAppointmentData.id,
            newAppointmentData.advance,
            newAppointmentData.age,
            newAppointmentData.appointmentNo,
            newAppointmentData.fees,
            newAppointmentData.gender,
            newAppointmentData.morningValue,
            newAppointmentData.patientName,
            newAppointmentData.phoneNumber,
            newAppointmentData.remark,
            newAppointmentData.selectedDate,
            newAppointmentData.selectedTime,
            newAppointmentData.uhidNo,
          ],
          (tx, results) => {
            console.log('Appointment inserted into SQLite', results);
          },
          (tx, error) => {
            console.log('Error inserting appointment into SQLite', error);
          }
        );
      });
    },

    deleteAppointmentData: (state) => {
      state.appointmentList = [];
      state.lastId = 0;

      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM appointments',
          [],
          (tx, results) => {
            console.log('All appointments deleted from SQLite', tx, results);
          },
          (tx, error) => {
            console.log('Error deleting appointments from SQLite', error);
          }
        );
      });
    },
  },
});

export const { addAppointmentData, deleteAppointmentData } = appointmentSlice.actions;
export default appointmentSlice.reducer;
