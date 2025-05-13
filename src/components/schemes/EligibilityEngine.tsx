
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CircleCheck, Brain, Zap } from 'lucide-react';

interface EligibilityEngineProps {
  userProfile: Record<string, any>;
  onComplete: (eligibleSchemes: any[]) => void;
}

const EligibilityEngine = ({ userProfile, onComplete }: EligibilityEngineProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  
  const stages = [
    "Analyzing personal profile",
    "Checking document validity",
    "Matching scheme criteria",
    "Calculating eligibility scores",
    "Generating recommendations"
  ];

  // Mock function to determine eligibility
  const determineEligibility = () => {
    // In a real implementation, this would call an API or run ML model
    // For demo, we use a mock that returns predetermined eligible schemes
    
    const mockEligibleSchemes = [
      {
        id: "scheme-001",
        title: "PM-KISAN Yojana",
        description: "Financial support to farmer families across the country through income support of ₹6000 per year in three equal installments.",
        ministry: "Ministry of Agriculture & Farmers Welfare",
        category: "Agriculture",
        eligibilityScore: 98,
        status: "eligible",
        benefits: [
          "₹6000 annual direct income support",
          "Transferred directly to bank account",
          "No repayment required"
        ],
        deadlineDate: "30 June 2023"
      },
      {
        id: "scheme-002",
        title: "Pradhan Mantri Awas Yojana (PMAY)",
        description: "Housing for All initiative that aims to provide affordable housing to the urban poor.",
        ministry: "Ministry of Housing and Urban Affairs",
        category: "Housing",
        eligibilityScore: 92,
        status: "eligible",
        benefits: [
          "Financial assistance for house construction",
          "Interest subsidy on home loans",
          "Affordable housing options"
        ]
      },
      {
        id: "scheme-003",
        title: "National Pension Scheme",
        description: "Voluntary, long-term retirement savings scheme to enable subscribers to make optimum decisions regarding their future.",
        ministry: "Ministry of Finance",
        category: "Finance",
        eligibilityScore: 85,
        status: "eligible",
        benefits: [
          "Tax benefits under Section 80C",
          "Flexible investment options",
          "Systematic retirement planning"
        ]
      },
      {
        id: "scheme-004",
        title: "Ayushman Bharat Yojana",
        description: "Health insurance scheme that aims to provide a service to create a healthy, capable and content new India.",
        ministry: "Ministry of Health and Family Welfare",
        category: "Healthcare",
        eligibilityScore: 79,
        status: "eligible",
        benefits: [
          "Health coverage up to ₹5 lakh per family",
          "Cashless treatment at empaneled hospitals",
          "Pre and post-hospitalization expenses covered"
        ]
      },
      {
        id: "scheme-005",
        title: "PM SVANidhi Scheme",
        description: "Micro-credit facility for street vendors to provide working capital loan up to ₹10,000.",
        ministry: "Ministry of Housing and Urban Affairs",
        category: "Finance",
        eligibilityScore: 88,
        status: "eligible",
        benefits: [
          "Affordable working capital loan",
          "Interest subsidy on timely repayment",
          "Digital transactions reward"
        ]
      }
    ];
    
    return mockEligibleSchemes;
  };

  useEffect(() => {
    // Simulate AI processing with incremental progress updates
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      // Update stage based on progress
      const stageIndex = Math.min(
        Math.floor(currentProgress / 20),
        stages.length - 1
      );
      setCurrentStage(stageIndex);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Get eligible schemes and pass them to the parent component
          const eligibleSchemes = determineEligibility();
          onComplete(eligibleSchemes);
        }, 500);
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, [userProfile, onComplete]);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center">
              <Brain className="h-12 w-12 text-gov-blue animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gov-green text-white rounded-full p-1">
              <Zap className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-center mb-6">
          AI Eligibility Engine Working
        </h3>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Processing...</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div 
              key={index} 
              className={`flex items-center ${
                index <= currentStage ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {index < currentStage ? (
                <CircleCheck className="h-5 w-5 text-green-500 mr-2" />
              ) : index === currentStage ? (
                <div className="h-5 w-5 rounded-full border-2 border-gov-blue border-t-transparent animate-spin mr-2" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-300 mr-2" />
              )}
              <span>{stage}</span>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-6">
          Our AI is analyzing your profile against 250+ government schemes to find the best matches.
        </p>
      </CardContent>
    </Card>
  );
};

export default EligibilityEngine;
