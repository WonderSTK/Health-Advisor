import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from './components/FileUpload';
import SymptomTimeline from './components/SymptomTimeline';
import MedicationTracker from './components/MedicationTracker';
import HealthTipsGenerator from './components/HealthTipsGenerator';
import HealthGoalTracker from './components/HealthGoalTracker';
import AppointmentScheduler from './components/AppointmentScheduler';
import HealthJournal from './components/HealthJournal';
import Results from './components/Results';
import { analyzeHealth } from './services/geminiService';
import { setResults } from './store/healthSlice';
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Loader2 } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('symptoms');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { symptoms, medications, goals, appointments, journalEntries, report } = useSelector((state) => state.health);

  const handleAnalyze = async () => {
    try {
      setError(null);
      setIsLoading(true);
      let input = '';
      if (activeTab === 'symptoms') {
        input = `Symptoms: ${symptoms.map(s => `${s.symptom} for ${s.duration}`).join(', ')}. `;
        input += `Medications: ${medications.map(m => `${m.medication} (${m.dosage}, ${m.frequency})`).join(', ')}. `;
        input += `Goals: ${goals.map(g => `${g.name} (Target: ${g.target} ${g.unit}, Progress: ${g.progress})`).join(', ')}. `;
        input += `Upcoming Appointments: ${appointments.map(a => `${a.doctor} on ${a.date} at ${a.time}`).join(', ')}. `;
        input += `Recent Journal Entries: ${journalEntries.slice(0, 3).map(e => `${e.date}: Mood - ${e.mood}, Entry - ${e.entry}`).join('; ')}.`;
      } else {
        input = report;
      }
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Health Advisor</CardTitle>
            <CardDescription>AI-Powered Health Analysis 🤖</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Get instant health insights based on your symptoms or medical report.</p>
            
            <Tabs defaultValue="symptoms" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="symptoms">Enter Health Data</TabsTrigger>
                <TabsTrigger value="report">Upload Report</TabsTrigger>
              </TabsList>
              <TabsContent value="symptoms" className="space-y-6">
                <SymptomTimeline />
                <MedicationTracker />
                <HealthGoalTracker />
                <AppointmentScheduler />
                <HealthJournal />
              </TabsContent>
              <TabsContent value="report">
                <FileUpload />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Health Data...
                </>
              ) : (
                "Analyze Health Data"
              )}
            </Button>
          </CardFooter>
        </Card>

        {error && (
          <Card className="mb-8 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        <Results />

        <HealthTipsGenerator />

        <footer className="text-center text-sm text-gray-500 mt-8">
          © 2024 Mehul Kumar. All rights reserved. 
          <a href="https://github.com/WonderSTK" className="text-indigo-500 hover:text-indigo-600 ml-1" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;