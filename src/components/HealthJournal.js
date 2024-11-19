import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJournalEntry, deleteJournalEntry } from '../store/healthSlice';
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function HealthJournal() {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const dispatch = useDispatch();
  const journalEntries = useSelector((state) => state.health.journalEntries);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() && mood.trim()) {
      dispatch(addJournalEntry({ entry, mood, date: new Date().toISOString() }));
      setEntry('');
      setMood('');
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Health Journal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="How are you feeling today?"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              placeholder="Write your journal entry here..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="w-full h-32"
            />
          </div>
          <Button type="submit" className="w-full">Add Journal Entry</Button>
        </form>
        <div className="mt-6 space-y-4">
          {journalEntries.map((entry, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{new Date(entry.date).toLocaleDateString()}</h4>
                  <p className="text-sm text-gray-500">Mood: {entry.mood}</p>
                  <p className="mt-2">{entry.entry}</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => dispatch(deleteJournalEntry(index))}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}