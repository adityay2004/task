// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   authDataList: [],
//   lastId: 0,
// };

// const authSlice = createSlice({
//   name: 'authReducer',
//   initialState,
//   reducers: {
//     addAuthData: (state, action) => {
//       const existingUserIndex = state.authDataList.findIndex(
//         (user) => user.phoneNumber === action?.payload?.phoneNumber
//       );

//       if (existingUserIndex !== -1) {
//         state.authDataList[existingUserIndex] = {
//           ...state.authDataList[existingUserIndex],
//           dob: action?.payload?.dob || state.authDataList[existingUserIndex].dob,
//           email: action?.payload?.email || state.authDataList[existingUserIndex].email,
//           firstName: action?.payload?.firstName || state.authDataList[existingUserIndex].firstName,
//           gender: action?.payload?.gender || state.authDataList[existingUserIndex].gender,
//           initial: action?.payload?.initial || state.authDataList[existingUserIndex].initial,
//           lastName: action?.payload?.lastName || state.authDataList[existingUserIndex].lastName,
//           maritalStatus:
//             action?.payload?.maritalStatus || state.authDataList[existingUserIndex].maritalStatus,
//           middleName:
//             action?.payload?.middleName || state.authDataList[existingUserIndex].middleName,
//           phoneNumber:
//             action?.payload?.phoneNumber || state.authDataList[existingUserIndex].phoneNumber,
//         };
//       } else {
//         state.lastId += 1;
//         const newAuthData = {
//           id: state.lastId,
//           dob: action?.payload?.dob || '',
//           email: action?.payload?.email || '',
//           firstName: action?.payload?.firstName || '',
//           gender: action?.payload?.gender || '',
//           initial: action?.payload?.initial || '',
//           lastName: action?.payload?.lastName || '',
//           maritalStatus: action?.payload?.maritalStatus || '',
//           middleName: action?.payload?.middleName || '',
//           phoneNumber: action?.payload?.phoneNumber || '',
//         };
//         state.authDataList.push(newAuthData);
//       }
//     },

//     deleteAllAuthData: (state) => {
//       state.authDataList = [];
//       state.lastId = 0;
//     },
//   },
// });

// export const { addAuthData, deleteAllAuthData } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'authData.db', location: 'default' },
  () => console.log('Database opened successfully'),
  (error) => console.error('Error opening database', error)
);

const initialState = {
  authDataList: [],
  lastId: 0,
};

const insertAuthData = (authData) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO authData (dob, email, firstName, gender, initial, lastName, maritalStatus, middleName, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        authData.dob,
        authData.email,
        authData.firstName,
        authData.gender,
        authData.initial,
        authData.lastName,
        authData.maritalStatus,
        authData.middleName,
        authData.phoneNumber,
      ],
      () => console.log('Data inserted successfully'),
      (error) => console.error('Error inserting data', error)
    );
  });
};

const updateAuthData = (authData) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE authData SET dob = ?, email = ?, firstName = ?, gender = ?, initial = ?, lastName = ?, maritalStatus = ?, middleName = ?, phoneNumber = ? WHERE id = ?',
      [
        authData.dob,
        authData.email,
        authData.firstName,
        authData.gender,
        authData.initial,
        authData.lastName,
        authData.maritalStatus,
        authData.middleName,
        authData.phoneNumber,
        authData.id,
      ],
      () => console.log('Data updated successfully'),
      (error) => console.error('Error updating data', error)
    );
  });
};

const deleteAllAuthDataFromDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM authData',
      [],
      () => console.log('All data deleted from database'),
      (error) => console.error('Error deleting all data', error)
    );
  });
};

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    addAuthData: (state, action) => {
      const existingUserIndex = state.authDataList.findIndex(
        (user) => user.phoneNumber === action?.payload?.phoneNumber
      );

      if (existingUserIndex !== -1) {
        const updatedAuthData = {
          ...state.authDataList[existingUserIndex],
          ...action.payload,
        };
        state.authDataList[existingUserIndex] = updatedAuthData;
        updateAuthData(updatedAuthData);
      } else {
        state.lastId += 1;
        const newAuthData = {
          id: state.lastId,
          ...action.payload,
        };
        state.authDataList.push(newAuthData);
        insertAuthData(newAuthData);
      }
    },

    deleteAllAuthData: (state) => {
      state.authDataList = [];
      state.lastId = 0;
      deleteAllAuthDataFromDB();
    },

    setAuthDataList: (state, action) => {
      state.authDataList = action.payload;
    },
  },
});

export const { addAuthData, deleteAllAuthData, setAuthDataList } = authSlice.actions;
export default authSlice.reducer;
