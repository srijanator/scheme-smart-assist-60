import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AutoFillEngine from '@/components/ai/AutoFillEngine';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const SchemeApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAutoFilling, setIsAutoFilling] = useState(true);
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  
  // Mock user data
  const mockUserData = {
    fullName: "John Doe",
    aadhaarNumber: "XXXX XXXX 1234",
    panNumber: "ABCDE1234F",
    // Other user data fields
  };
  
  const handleAutoFillComplete = (data: Record<string, any>) => {
    setFormData(data);
    setIsAutoFilling(false);
    
    toast({
      title: "Form Auto-Fill Complete",
      description: "Your application form has been filled automatically. Please review and submit.",
    });
  };
  
  const handleSubmitApplication = () => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully. You can track its status in your dashboard.",
    });
    
    // Navigate to dashboard or application tracking page
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-4" 
              onClick={() => navigate('/eligible-schemes')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schemes
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900">PM-KISAN Yojana Application</h1>
            <p className="text-gray-600 mt-2">
              Our AI will automatically fill your application form using your verified information.
            </p>
          </div>
          
          {isAutoFilling ? (
            <div className="flex justify-center py-8">
              <AutoFillEngine 
                schemeId="scheme-001"
                userData={mockUserData}
                onComplete={handleAutoFillComplete}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6 border-b pb-6">
                <h2 className="text-xl font-semibold mb-4">Application Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Scheme Name</p>
                    <p className="font-medium">PM-KISAN Yojana</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applicant ID</p>
                    <p className="font-medium">{formData?.applicantId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applicant Name</p>
                    <p className="font-medium">{formData?.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Application Date</p>
                    <p className="font-medium">
                      {formData?.timestamp ? new Date(formData.timestamp).toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Form Auto-Fill Status</h3>
                <div className="flex items-center justify-between bg-green-50 rounded-md p-4">
                  <div>
                    <p className="font-medium text-green-800">All fields complete</p>
                    <p className="text-sm text-green-600">
                      {formData?.completedFields} of {formData?.totalFields} fields were automatically filled
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                </div>
              </div>
              
              <div className="mb-6 border-b pb-6">
                <h3 className="text-lg font-medium mb-4">Required Documents</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center mr-2">✓</span>
                    Aadhaar Card
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center mr-2">✓</span>
                    Land Records
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center mr-2">✓</span>
                    Bank Account Details
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Please click submit to finalize your application. You'll receive confirmation and tracking details via email.
                </p>
                <Button 
                  className="bg-gov-green hover:bg-green-600"
                  size="lg"
                  onClick={handleSubmitApplication}
                >
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchemeApplication;
