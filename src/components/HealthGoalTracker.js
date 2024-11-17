import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, updateGoalProgress, removeGoal } from '../store/healthSlice';

function HealthGoalTracker() {
  const [goalName, setGoalName] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [unit, setUnit] = useState('');
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.health.goals);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (goalName && targetValue && unit) {
      dispatch(addGoal({ name: goalName, target: targetValue, unit, progress: 0 }));
      setGoalName('');
      setTargetValue('');
      setUnit('');
    }
  };

  const handleUpdateProgress = (index, progress) => {
    dispatch(updateGoalProgress({ index, progress: Math.min(progress, goals[index].target) }));
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Health Goal Tracker</h2>
      <form onSubmit={handleAddGoal} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Goal name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            placeholder="Target value"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Unit (e.g., steps, kg, hours)"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add Goal
        </button>
      </form>
      <ul className="space-y-4">
        {goals.map((goal, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold">{goal.name}</h3>
            <p>Target: {goal.target} {goal.unit}</p>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Progress:</label>
              <input
                type="number"
                value={goal.progress}
                onChange={(e) => handleUpdateProgress(index, Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-2 h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 bg-green-500 rounded-full"
                style={{ width: `${(goal.progress / goal.target) * 100}%` }}
              ></div>
            </div>
            <button
              onClick={() => dispatch(removeGoal(index))}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove Goal
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HealthGoalTracker;