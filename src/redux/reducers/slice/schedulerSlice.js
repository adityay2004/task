import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schedulerDataList: [],
};

const schedulerSlice = createSlice({
  name: 'schedulerReducer',
  initialState,
  reducers: {
    addSchedulerData: (state, action) => {
      state.schedulerDataList = [...action.payload];
    },

    deleteSchedulerData: (state) => {},
  },
});

export const { addSchedulerData, deleteSchedulerData } = schedulerSlice.actions;
export default schedulerSlice.reducer;
