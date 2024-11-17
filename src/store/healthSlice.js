import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symptoms: [],
  medications: [],
  goals: [],
  appointments: [],
  report: '',
  disease: '',
  exercise: '',
  medicine: '',
  food: '',
  healthTip: '',
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
    addMedication: (state, action) => {
      state.medications.push(action.payload);
    },
    removeMedication: (state, action) => {
      state.medications.splice(action.payload, 1);
    },
    updateMedication: (state, action) => {
      const { index, field, value } = action.payload;
      state.medications[index][field] = value;
    },
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    updateGoalProgress: (state, action) => {
      const { index, progress } = action.payload;
      state.goals[index].progress = progress;
    },
    removeGoal: (state, action) => {
      state.goals.splice(action.payload, 1);
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    removeAppointment: (state, action) => {
      state.appointments.splice(action.payload, 1);
    },
    setReport: (state, action) => {
      state.report = action.payload;
    },
    setResults: (state, action) => {
      return { ...state, ...action.payload };
    },
    setHealthTip: (state, action) => {
      state.healthTip = action.payload;
    },
  },
});

export const {
  addSymptom,
  removeSymptom,
  addMedication,
  removeMedication,
  updateMedication,
  addGoal,
  updateGoalProgress,
  removeGoal,
  addAppointment,
  removeAppointment,
  setReport,
  setResults,
  setHealthTip,
} = healthSlice.actions;

export default healthSlice.reducer;