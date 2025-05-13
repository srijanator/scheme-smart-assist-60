
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { CircleCheck, FileText, Loader2, FileCheck2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AutoFillEngineProps {
  schemeId: string;
  userData: Record<string, any>;
  onComplete: (formData: Record<string, any>) => void;
}

const AutoFillEngine = ({ schemeId, userData, onComplete }: AutoFillEngineProps) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fillComplete, setFillComplete] = useState(false);
  
  const stages = [
    "Loading scheme form template",
    "Processing personal information",
    "Mapping document data",
    "Filling application form",
    "Validating form data"
  ];
  
  useEffect(() => {
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      // Update stage based on progress
      const stageIndex = Math.min(
        Math.floor(currentProgress / 20),
        stages.length - 1
      );
      setStage(stageIndex);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setFillComplete(true);
        
        // Simulate form data
        const formData = {
          schemeId,
          applicantName: userData.fullName || "John Doe",
          applicantId: "APP" + Math.floor(Math.random() * 1000000),
          completedFields: 32,
          totalFields: 32,
          submissionReady: true,
          timestamp: new Date().toISOString()
        };
        
        onComplete(formData);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, [schemeId, userData, onComplete]);
  
  return (
    <Card className="w-full max-w-lg mx-auto border-gov-blue">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-50 p-4 rounded-full">
            {fillComplete ? (
              <FileCheck2 className="h-12 w-12 text-gov-green" />
            ) : (
              <FileText className="h-12 w-12 text-gov-blue animate-pulse" />
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-center mb-6">
          {fillComplete ? "Form Auto-Fill Complete" : "AI Form Auto-Fill Engine"}
        </h3>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{fillComplete ? "Completed" : "Processing..."}</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className={fillComplete ? "h-2 bg-gov-green" : "h-2"} />
        </div>
        
        <div className="space-y-3">
          {stages.map((stageName, index) => (
            <div 
              key={index} 
              className={`flex items-center ${
                index <= stage ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {index < stage || fillComplete ? (
                <CircleCheck className="h-5 w-5 text-green-500 mr-2" />
              ) : index === stage && !fillComplete ? (
                <Loader2 className="h-5 w-5 text-gov-blue mr-2 animate-spin" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-300 mr-2" />
              )}
              <span>{stageName}</span>
            </div>
          ))}
        </div>
        
        {fillComplete && (
          <div className="mt-6">
            <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
              <div className="flex">
                <CircleCheck className="h-6 w-6 text-green-500 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">Auto-fill successful</h4>
                  <p className="text-sm text-green-600">
                    All required fields have been automatically filled based on your profile data.
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-gov-green hover:bg-green-600">
              Review & Submit Application
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoFillEngine;
