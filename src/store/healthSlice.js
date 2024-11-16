import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symptoms: [],
  report: '',
  disease: '',
  exercise: '',
  medicine: '',
  food: '',
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    addSymptom: (state, action) => {
      state.symptoms.push(action.payload);
    },
    removeSymptom: (state, action) => {
      state.symptoms.splice(action.payload, 1);
    },
    setReport: (state, action) => {
      state.report = action.payload;
    },
    setResults: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addSymptom, removeSymptom, setReport, setResults } = healthSlice.actions;
export default healthSlice.reducer;