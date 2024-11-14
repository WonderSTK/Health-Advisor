import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  report: '',
  symptoms: '',
  disease: '',
  exercise: '',
  medicine: '',
  food: '',
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    setReport: (state, action) => {
      state.report = action.payload;
    },
    setSymptoms: (state, action) => {
      state.symptoms = action.payload;
    },
    setResults: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setReport, setSymptoms, setResults } = healthSlice.actions;
export default healthSlice.reducer;