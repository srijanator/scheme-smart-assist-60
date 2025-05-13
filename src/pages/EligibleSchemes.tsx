import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import EligibilityEngine from '@/components/schemes/EligibilityEngine';
import SchemesList from '@/components/schemes/SchemesList';

const EligibleSchemes = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [eligibleSchemes, setEligibleSchemes] = useState<any[]>([]);
  
  // Mock user profile data
  const mockUserProfile = {
    fullName: "John Doe",
    age: 28,
    income: 250000,
    state: "Maharashtra",
    employment: "Salaried",
    // Other profile fields would be here
  };
  
  const handleAnalysisComplete = (schemes: any[]) => {
    setEligibleSchemes(schemes);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Eligible Schemes</h1>
          
          {isAnalyzing ? (
            <div className="flex justify-center py-12">
              <EligibilityEngine 
                userProfile={mockUserProfile}
                onComplete={handleAnalysisComplete}
              />
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-2">AI Analysis Results</h2>
                <p className="text-gray-600 mb-4">
                  Based on your profile and submitted documents, our AI has identified 
                  {eligibleSchemes.length} government schemes you're eligible for.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="text-3xl font-bold text-gov-blue">{eligibleSchemes.length}</div>
                    <div className="text-sm text-gray-600">Eligible Schemes</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md">
                    <div className="text-3xl font-bold text-gov-green">98%</div>
                    <div className="text-sm text-gray-600">Profile Completeness</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-md">
                    <div className="text-3xl font-bold text-gov-orange">100%</div>
                    <div className="text-sm text-gray-600">Auto-fill Ready</div>
                  </div>
                </div>
              </div>
              
              <SchemesList schemes={eligibleSchemes} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EligibleSchemes;
