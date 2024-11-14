import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSymptoms } from '../store/healthSlice';

function SymptomInput() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSymptoms(input));
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your symptoms..."
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="4"
      />
      <button 
        type="submit" 
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
      >
        Analyze Symptoms
      </button>
    </form>
  );
}

export default SymptomInput;