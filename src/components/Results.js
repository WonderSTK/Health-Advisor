import React from 'react';
import { useSelector } from 'react-redux';

function Results() {
  const results = useSelector((state) => state.health);

  if (!results.analysis) {
    return null;
  }

  const urgencyColor = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  };

  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Health Analysis Results</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Analysis</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{results.analysis}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Possible Conditions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5">
                {results.possibleConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Recommendations</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <h4 className="font-medium">Lifestyle</h4>
              <ul className="list-disc pl-5 mb-2">
                {results.recommendations.lifestyle.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h4 className="font-medium">Diet</h4>
              <ul className="list-disc pl-5 mb-2">
                {results.recommendations.diet.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h4 className="font-medium">Exercise</h4>
              <ul className="list-disc pl-5 mb-2">
                {results.recommendations.exercise.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h4 className="font-medium">Medications</h4>
              <ul className="list-disc pl-5 mb-2">
                {results.recommendations.medications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h4 className="font-medium">Follow-up Actions</h4>
              <ul className="list-disc pl-5">
                {results.recommendations.followUp.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Goal Feedback</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5">
                {results.goalFeedback.map((feedback, index) => (
                  <li key={index}>{feedback}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Appointment Preparation</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5">
                {results.appointmentPrep.map((prep, index) => (
                  <li key={index}>{prep}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Urgency</dt>
            <dd className={`mt-1 text-sm font-medium sm:mt-0 sm:col-span-2 ${urgencyColor[results.urgency.toLowerCase()]}`}>
              {results.urgency}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Results;