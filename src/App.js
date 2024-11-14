import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from './components/FileUpload';
import SymptomInput from './components/SymptomInput';
import Results from './components/Results';
import { analyzeHealth } from './services/geminiService';
import { setResults } from './store/healthSlice';

function App() {
  const [activeTab, setActiveTab] = useState('symptoms');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Update 1: Added loading state
  const dispatch = useDispatch();
  const { report, symptoms } = useSelector((state) => state.health);

  const handleAnalyze = async () => {
    try {
      setError(null);
      setIsLoading(true); // Update 2: Set loading to true before analysis
      const input = activeTab === 'symptoms' ? symptoms : report;
      if (input) {
        const results = await analyzeHealth(input);
        dispatch(setResults(results));
      }
    } catch (error) {
      console.error('Error analyzing health data:', error);
      setError(error.message || 'An error occurred while analyzing the data. Please try again.');
    } finally {
      setIsLoading(false); // Update 2: Set loading to false after analysis (success or failure)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Health Advisor</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">AI-Powered Health Analysis 🤖</h1>
            <p className="mt-2 text-gray-500">Get instant health insights based on your symptoms or medical report.</p>
            
            <div className="mt-6">
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
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab('symptoms')}
                      className={`${
                        activeTab === 'symptoms'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                    >
                      Enter Symptoms
                    </button>
                    <button
                      onClick={() => setActiveTab('report')}
                      className={`${
                        activeTab === 'report'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                    >
                      Upload Report
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {activeTab === 'symptoms' ? <SymptomInput /> : <FileUpload />}
            </div>

            <div className="mt-6">
              <button 
                onClick={handleAnalyze} 
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
              >
                Analyze Health Data
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {isLoading && ( // Update 3: Added loading spinner
              <div className="flex justify-center items-center mt-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
            {!isLoading && <Results />} {/* Update 3: Conditionally render Results */}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        © 2024 Mehul Kumar. All rights reserved. 
        <a href="https://github.com/WonderSTK" className="text-indigo-500 hover:text-indigo-600 ml-1" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
}

export default App;