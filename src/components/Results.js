import React from 'react';
import { useSelector } from 'react-redux';

function Results() {
  const { disease, exercise, medicine, food } = useSelector((state) => state.health);

  const defaultExercise = "General exercises for overall health: walking, stretching, and light cardio.";
  const defaultMedicine = "Consult a healthcare professional for appropriate medication.";
  const defaultDiet = "Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.";

  if (!disease && !exercise && !medicine && !food) {
    return null;
  }

  return (
    <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h2 className="text-2xl font-bold">Analysis Results 📊</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-red-800">Possible Condition 🏥</h3>
          <p className="text-red-700">{disease || "Unable to determine specific condition based on given information."}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-green-800">Recommended Exercises 🏋️‍♀️</h3>
          <p className="text-green-700">{exercise || defaultExercise}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Suggested Medicines 💊</h3>
          <p className="text-blue-700">{medicine || defaultMedicine}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-yellow-800">Dietary Recommendations 🍎</h3>
          <p className="text-yellow-700">{food || defaultDiet}</p>
        </div>
      </div>
    </div>
  );
}

export default Results;