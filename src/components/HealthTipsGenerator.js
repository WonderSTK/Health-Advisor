import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHealthTip } from '../store/healthSlice';
import { generateHealthTip } from '../services/geminiService';
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Loader2 } from 'lucide-react'

function HealthTipsGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const healthData = useSelector((state) => state.health);
  const currentTip = useSelector((state) => state.health.healthTip);

  const generateTip = async () => {
    setIsLoading(true);
    try {
      const tip = await generateHealthTip(healthData);
      dispatch(setHealthTip(tip));
    } catch (error) {
      console.error("Failed to generate health tip:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Health Tip of the Day</CardTitle>
        <CardDescription>Get personalized health advice based on your data</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium text-gray-800">
          {currentTip || "Click the button to get a personalized health tip!"}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={generateTip}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Tip...
            </>
          ) : (
            "Generate Health Tip"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default HealthTipsGenerator;