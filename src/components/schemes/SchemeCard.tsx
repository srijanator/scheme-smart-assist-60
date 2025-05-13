
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, ChevronRight, Clock, FileText, AlertCircle } from 'lucide-react';

interface SchemeCardProps {
  scheme: {
    id: string;
    title: string;
    description: string;
    ministry: string;
    category: string;
    eligibilityScore: number;
    status: 'eligible' | 'applied' | 'pending' | 'not-eligible';
    benefits: string[];
    deadlineDate?: string;
  };
  onApply: (schemeId: string) => void;
  onViewDetails: (schemeId: string) => void;
}

const SchemeCard = ({ scheme, onApply, onViewDetails }: SchemeCardProps) => {
  // Status indicator
  const getStatusIndicator = () => {
    switch (scheme.status) {
      case 'eligible':
        return (
          <Badge className="bg-gov-green text-white flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Eligible
          </Badge>
        );
      case 'applied':
        return (
          <Badge className="bg-gov-blue text-white flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            Applied
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-gov-orange text-white flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Pending Verification
          </Badge>
        );
      case 'not-eligible':
        return (
          <Badge variant="destructive" className="flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Not Eligible
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:border-gov-blue transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{scheme.title}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {scheme.ministry} • {scheme.category}
            </CardDescription>
          </div>
          <div>{getStatusIndicator()}</div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-700 line-clamp-3">{scheme.description}</p>
        
        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Benefits</h4>
          <ul className="mt-2 space-y-1">
            {scheme.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="text-xs flex items-start">
                <CheckCircle className="h-3 w-3 text-gov-green mr-2 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
            {scheme.benefits.length > 2 && (
              <li className="text-xs text-gray-500">+{scheme.benefits.length - 2} more benefits</li>
            )}
          </ul>
        </div>
        
        {scheme.deadlineDate && (
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>Deadline: {scheme.deadlineDate}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4 bg-gray-50">
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onViewDetails(scheme.id)}
          >
            View Details
          </Button>
          
          {scheme.status === 'eligible' && (
            <Button
              size="sm"
              className="bg-gov-blue hover:bg-blue-700 text-xs flex items-center"
              onClick={() => onApply(scheme.id)}
            >
              Apply Now
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
          
          {scheme.status === 'applied' && (
            <Button size="sm" variant="outline" className="text-xs">
              Track Application
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
