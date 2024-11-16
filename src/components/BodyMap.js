import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSymptoms } from '../store/healthSlice';

const bodyParts = [
  { id: 'head', name: 'Head', path: 'M 100 25 Q 75 25 75 50 Q 75 75 100 75 Q 125 75 125 50 Q 125 25 100 25' },
  { id: 'chest', name: 'Chest', path: 'M 60 75 L 140 75 L 140 125 L 60 125 Z' },
  { id: 'abdomen', name: 'Abdomen', path: 'M 60 125 L 140 125 L 140 175 L 60 175 Z' },
  { id: 'leftArm', name: 'Left Arm', path: 'M 60 75 Q 40 100 25 150 L 40 155 Q 55 105 75 80 Z' },
  { id: 'rightArm', name: 'Right Arm', path: 'M 140 75 Q 160 100 175 150 L 160 155 Q 145 105 125 80 Z' },
  { id: 'leftLeg', name: 'Left Leg', path: 'M 60 175 L 100 175 L 100 300 L 60 300 Z' },
  { id: 'rightLeg', name: 'Right Leg', path: 'M 100 175 L 140 175 L 140 300 L 100 300 Z' },
];

function BodyMap() {
  const [selectedParts, setSelectedParts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const symptoms = selectedParts.map((id) => bodyParts.find(part => part.id === id).name).join(', ');
    dispatch(setSymptoms(symptoms));
  }, [selectedParts, dispatch]);

  const handlePartClick = (partId) => {
    setSelectedParts((prev) => 
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 200 300" className="w-full">
        {/* Body outline */}
        <path
          d="M 100 25 Q 75 25 75 50 Q 75 75 100 75 Q 125 75 125 50 Q 125 25 100 25 M 60 75 L 140 75 L 140 300 L 60 300 Z M 60 75 Q 40 100 25 150 L 40 155 Q 55 105 75 80 M 140 75 Q 160 100 175 150 L 160 155 Q 145 105 125 80"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        
        {/* Clickable body parts */}
        {bodyParts.map((part) => (
          <path
            key={part.id}
            d={part.path}
            fill={selectedParts.includes(part.id) ? 'rgba(255, 0, 0, 0.5)' : 'transparent'}
            stroke="transparent"
            strokeWidth="1"
            className="cursor-pointer transition-colors duration-200"
            onClick={() => handlePartClick(part.id)}
          />
        ))}
      </svg>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Selected Areas:</h3>
        <p>{selectedParts.map((id) => bodyParts.find(part => part.id === id).name).join(', ') || 'None'}</p>
      </div>
    </div>
  );
}

export default BodyMap;