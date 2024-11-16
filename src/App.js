import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from './components/FileUpload';
import SymptomTimeline from './components/SymptomTimeline';
import Results from './components/Results';
import { analyzeHealth } from './services/geminiService';
import { setResults } from './store/healthSlice';

function App() {
  const [activeTab, setActiveTab] = useState('symptoms');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { symptoms, report } = useSelector((state) => state.health);

  const handleAnalyze = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const input = activeTab === 'symptoms' 
        ? symptoms.map(s => `${s.symptom} for ${s.duration}`).join(', ')
        : report;
      if (input) {
        const results = await analyzeHealth(input);
        dispatch(setResults(results));
      }
    } catch (error) {
      console.error('Error analyzing health data:', error);
      setError(error.message || 'An error occurred while analyzing the data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Health Advisor</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Health Analysis 🤖</h1>
            <p className="text-gray-600 mb-6">Get instant health insights based on your symptoms or medical report.</p>
            
            <div className="mb-6">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  <option value="symptoms">Enter Symptoms</option>
                  <option value="report">Upload Report</option>
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('symptoms')}
                    className={`${
                      activeTab === 'symptoms'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700'
                    } px-3 py-2 font-medium text-sm rounded-md`}
                  >
                    Enter Symptoms
                  </button>
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`${
                      activeTab === 'report'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700'
                    } px-3 py-2 font-medium text-sm rounded-md`}
                  >
                    Upload Report
                  </button>
                </nav>
              </div>
            </div>

            <div className="mb-6">
              {activeTab === 'symptoms' ? <SymptomTimeline /> : <FileUpload />}
            </div>

            <button 
              onClick={handleAnalyze} 
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
            >
              Analyze Health Data
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-center items-center mt-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
            {!isLoading && <Results />}
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2024 Mehul Kumar. All rights reserved. 
        <a href="https://github.com/WonderSTK" className="text-indigo-500 hover:text-indigo-600 ml-1" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
}

export default App;