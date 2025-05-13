
import { CheckCircle, Clock, FileText, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      name: 'Smart Eligibility Check',
      description: 'Our AI analyzes your profile to find schemes you qualify for, saving you hours of research.',
      icon: CheckCircle,
      color: 'bg-gov-green',
    },
    {
      name: 'Automated Form Filling',
      description: 'No more repetitive form filling. We auto-populate applications using your verified information.',
      icon: FileText,
      color: 'bg-gov-blue',
    },
    {
      name: 'Secure Document Storage',
      description: 'Your documents are encrypted and stored securely for quick access when applying.',
      icon: Shield,
      color: 'bg-gov-red',
    },
    {
      name: 'Real-time Application Status',
      description: 'Track the progress of your applications with real-time status updates.',
      icon: Clock,
      color: 'bg-gov-orange',
    },
    {
      name: 'One-click Applications',
      description: 'Apply for multiple schemes with a single click, significantly reducing effort and time.',
      icon: Zap,
      color: 'bg-gov-lightBlue',
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-gov-blue font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose SchemeConnect
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform simplifies the complex process of finding and applying for government schemes.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full hover:shadow-md transition-shadow">
                  <div className="-mt-6">
                    <div>
                      <span className={`inline-flex items-center justify-center p-3 rounded-md shadow-lg ${feature.color} text-white`}>
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
