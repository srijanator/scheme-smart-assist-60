
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'Create your profile',
      description: 'Sign up and provide your basic details to get started.',
      image: '/profile.svg'
    },
    {
      id: '02',
      title: 'Upload your documents',
      description: 'Securely upload required documents like Aadhaar, PAN, and income certificates.',
      image: '/documents.svg'
    },
    {
      id: '03',
      title: 'Get personalized recommendations',
      description: 'Our AI analyzes your profile to find relevant government schemes.',
      image: '/recommendations.svg'
    },
    {
      id: '04',
      title: 'Apply in one click',
      description: 'Select schemes and apply instantly with pre-filled forms.',
      image: '/apply.svg'
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-gov-blue font-semibold tracking-wide uppercase">Process</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How SchemeConnect Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            We've simplified the process of finding and applying for government schemes in just 4 easy steps.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Line connecting steps */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 gap-x-8">
              {steps.map((step) => (
                <div key={step.id} className="relative">
                  {/* Step number circle with background */}
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gov-blue text-white font-bold text-lg mx-auto relative z-10">
                    {step.id}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <img src={step.image} alt={step.title} className="h-32 w-auto mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-gov-blue hover:bg-blue-700" asChild>
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
