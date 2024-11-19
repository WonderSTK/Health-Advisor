import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSymptom, removeSymptom } from '../store/healthSlice';
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"

export default function SymptomTimeline() {
  const [symptom, setSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const dispatch = useDispatch();
  const symptoms = useSelector((state) => state.health.symptoms);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptom && duration) {
      dispatch(addSymptom({ symptom, duration }));
      setSymptom('');
      setDuration('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Symptom"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Duration (e.g., 2 days)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">Add Symptom</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {symptoms.map((s, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{s.symptom} - {s.duration}</span>
              <Button 
                onClick={() => dispatch(removeSymptom(index))}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}