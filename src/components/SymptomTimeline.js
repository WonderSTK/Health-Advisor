import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSymptom, removeSymptom } from '../store/healthSlice';

function SymptomTimeline() {
  const [symptom, setSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const dispatch = useDispatch();
  const symptoms = useSelector((state) => state.health.symptoms);

  const handleAddSymptom = (e) => {
    e.preventDefault();
    if (symptom && duration) {
      dispatch(addSymptom({ symptom, duration }));
      setSymptom('');
      setDuration('');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Symptom Timeline</h2>
      <form onSubmit={handleAddSymptom} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Enter symptom"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (e.g., 2 days)"
            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {symptoms.map((s, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
            <span>
              {s.symptom} - {s.duration}
            </span>
            <button
              onClick={() => dispatch(removeSymptom(index))}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SymptomTimeline;