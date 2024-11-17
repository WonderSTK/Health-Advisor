import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMedication, removeMedication, updateMedication } from '../store/healthSlice';

function MedicationTracker() {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const dispatch = useDispatch();
  const medications = useSelector((state) => state.health.medications);

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (medication && dosage && frequency) {
      dispatch(addMedication({ medication, dosage, frequency }));
      setMedication('');
      setDosage('');
      setFrequency('');
    }
  };

  const handleUpdateMedication = (index, field, value) => {
    dispatch(updateMedication({ index, field, value }));
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Medication Tracker</h2>
      <form onSubmit={handleAddMedication} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            placeholder="Medication name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="Dosage"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="Frequency"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add Medication
        </button>
      </form>
      <ul className="space-y-2">
        {medications.map((med, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={med.medication}
                onChange={(e) => handleUpdateMedication(index, 'medication', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={med.dosage}
                onChange={(e) => handleUpdateMedication(index, 'dosage', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={med.frequency}
                onChange={(e) => handleUpdateMedication(index, 'frequency', e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => dispatch(removeMedication(index))}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicationTracker;