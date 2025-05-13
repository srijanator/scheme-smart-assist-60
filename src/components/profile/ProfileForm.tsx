
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Upload, Check } from 'lucide-react';

const ProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formProgress, setFormProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // Form state
  const [formState, setFormState] = useState({
    // Personal details
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    
    // Contact & address
    email: '',
    phone: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
    
    // Documents & IDs
    aadhaarNumber: '',
    panNumber: '',
    incomeAmount: '',
    caste: '',
    disability: '',
    employmentType: '',
    
    // Document uploads (would contain file objects in real implementation)
    aadhaarFile: null,
    panFile: null,
    incomeFile: null,
    addressProofFile: null,
    casteFile: null,
  });
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle file upload
  const handleFileUpload = (name: string, file: File | null) => {
    setFormState(prev => ({
      ...prev,
      [name]: file
    }));
    
    // Show success toast for file upload
    if (file) {
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };
  
  // Navigate between form steps
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setFormProgress(((currentStep + 1) / totalSteps) * 100);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormProgress(((currentStep - 1) / totalSteps) * 100);
    }
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile saved",
      description: "Your profile has been created successfully. We're analyzing your eligibility for schemes."
    });
    
    // Navigate to eligible schemes page after successful submission
    navigate('/eligible-schemes');
  };
  
  // Render different form steps based on currentStep
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Details</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name (as per Aadhaar)</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  value={formState.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="motherName">Mother's Name</Label>
                <Input
                  id="motherName"
                  name="motherName"
                  value={formState.motherName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formState.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select onValueChange={(value) => handleSelectChange('maritalStatus', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact & Address</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="address">Complete Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formState.address}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => handleSelectChange('state', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    {/* Add more states */}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  value={formState.district}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formState.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Documents & IDs</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                <Input
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  value={formState.aadhaarNumber}
                  onChange={handleChange}
                  placeholder="XXXX XXXX XXXX"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  name="panNumber"
                  value={formState.panNumber}
                  onChange={handleChange}
                  placeholder="ABCDE1234F"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="incomeAmount">Annual Income (in INR)</Label>
                <Input
                  id="incomeAmount"
                  name="incomeAmount"
                  type="number"
                  value={formState.incomeAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="caste">Category/Caste</Label>
                <Select onValueChange={(value) => handleSelectChange('caste', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="disability">Disability (if any)</Label>
                <RadioGroup defaultValue="none" onValueChange={(value) => handleSelectChange('disability', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="disability-none" />
                    <Label htmlFor="disability-none">None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="disability-yes" />
                    <Label htmlFor="disability-yes">Yes, I have a disability</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="employmentType">Employment Status</Label>
                <Select onValueChange={(value) => handleSelectChange('employmentType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Document Uploads</h2>
            <p className="text-gray-500 text-sm mb-4">Please upload clear scanned copies or photos of the following documents.</p>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="file-upload">
                <label htmlFor="aadhaarFile" className="cursor-pointer flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gov-blue" />
                  <span className="font-medium">Aadhaar Card</span>
                  <span className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</span>
                  
                  {formState.aadhaarFile && (
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span>{(formState.aadhaarFile as unknown as File).name}</span>
                    </div>
                  )}
                  
                  <Input
                    id="aadhaarFile"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileUpload('aadhaarFile', file);
                    }}
                    accept="image/jpeg,image/png,application/pdf"
                  />
                </label>
              </div>
              
              <div className="file-upload">
                <label htmlFor="panFile" className="cursor-pointer flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gov-blue" />
                  <span className="font-medium">PAN Card</span>
                  <span className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</span>
                  
                  {formState.panFile && (
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span>{(formState.panFile as unknown as File).name}</span>
                    </div>
                  )}
                  
                  <Input
                    id="panFile"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileUpload('panFile', file);
                    }}
                    accept="image/jpeg,image/png,application/pdf"
                  />
                </label>
              </div>
              
              <div className="file-upload">
                <label htmlFor="incomeFile" className="cursor-pointer flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gov-blue" />
                  <span className="font-medium">Income Certificate</span>
                  <span className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</span>
                  
                  {formState.incomeFile && (
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span>{(formState.incomeFile as unknown as File).name}</span>
                    </div>
                  )}
                  
                  <Input
                    id="incomeFile"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileUpload('incomeFile', file);
                    }}
                    accept="image/jpeg,image/png,application/pdf"
                  />
                </label>
              </div>
              
              <div className="file-upload">
                <label htmlFor="addressProofFile" className="cursor-pointer flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gov-blue" />
                  <span className="font-medium">Address Proof</span>
                  <span className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</span>
                  
                  {formState.addressProofFile && (
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span>{(formState.addressProofFile as unknown as File).name}</span>
                    </div>
                  )}
                  
                  <Input
                    id="addressProofFile"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileUpload('addressProofFile', file);
                    }}
                    accept="image/jpeg,image/png,application/pdf"
                  />
                </label>
              </div>
              
              {formState.caste !== 'general' && (
                <div className="file-upload sm:col-span-2">
                  <label htmlFor="casteFile" className="cursor-pointer flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-gov-blue" />
                    <span className="font-medium">Caste Certificate</span>
                    <span className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</span>
                    
                    {formState.casteFile && (
                      <div className="flex items-center mt-2 text-sm text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span>{(formState.casteFile as unknown as File).name}</span>
                      </div>
                    )}
                    
                    <Input
                      id="casteFile"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileUpload('casteFile', file);
                      }}
                      accept="image/jpeg,image/png,application/pdf"
                    />
                  </label>
                </div>
              )}
            </div>
            
            <div className="text-xs text-gray-500 mt-4 p-4 bg-gray-50 rounded-md">
              <p className="font-medium mb-2">Privacy Notice:</p>
              <p>
                Your documents are encrypted and stored securely. They will only be used for verifying your eligibility
                for government schemes and filling application forms. We do not share your data with third parties without your consent.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
        <p className="text-gray-600">
          Please provide your personal details and upload required documents to help us find eligible government schemes for you.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Progress</span>
          <span>{formProgress}%</span>
        </div>
        <Progress value={formProgress} className="h-2" />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-sm rounded-lg p-6">
          {renderFormStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} className="bg-gov-blue hover:bg-blue-700">
                Next
              </Button>
            ) : (
              <Button type="submit" className="bg-gov-green hover:bg-green-600">
                Submit Profile
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
