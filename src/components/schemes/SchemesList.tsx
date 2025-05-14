
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import SchemeCard from './SchemeCard';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Scheme {
  id: string;
  title: string;
  description: string;
  ministry: string;
  category: string;
  eligibilityScore: number;
  status: 'eligible' | 'applied' | 'pending' | 'not-eligible';
  benefits: string[];
  deadlineDate?: string;
}

interface SchemesListProps {
  schemes: Scheme[];
}

const SchemesList = ({ schemes }: SchemesListProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Handle scheme application
  const handleApply = (schemeId: string) => {
    toast({
      title: "Application Started",
      description: "Our AI is auto-filling your application form. This will take a few moments.",
    });
    
    // In a real app, this would redirect to an application flow
    // For demo, we simulate with a delayed toast
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted. You can track its status on your dashboard.",
      });
    }, 3000);
  };
  
  // Handle scheme details view
  const handleViewDetails = (schemeId: string) => {
    // In a real app, this would navigate to a scheme details page
    console.log("View details for scheme:", schemeId);
  };
  
  // Filter schemes based on search query and filters
  const filteredSchemes = schemes.filter(scheme => {
    // Search filter
    const matchesSearch = searchQuery 
      ? scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Category filter
    const matchesCategory = categoryFilter 
      ? scheme.category === categoryFilter
      : true;
    
    // Status filter
    const matchesStatus = statusFilter 
      ? scheme.status === statusFilter
      : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Get unique categories from schemes
  const categories = [...new Set(schemes.map(scheme => scheme.category))];
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search schemes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category filter */}
          <div>
            <Label htmlFor="category-filter" className="text-xs mb-1 block">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Status filter */}
          <div>
            <Label htmlFor="status-filter" className="text-xs mb-1 block">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="not-eligible">Not Eligible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Results info */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          Found <span className="font-medium">{filteredSchemes.length}</span> schemes
          {searchQuery || categoryFilter || statusFilter ? ' matching your filters' : ''}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Filter className="h-4 w-4 mr-1" />
          <span>Sort by: </span>
          <Select defaultValue="eligibility">
            <SelectTrigger className="border-0 text-sm ml-1 p-0 h-auto w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eligibility">Eligibility Score</SelectItem>
              <SelectItem value="az">Name: A-Z</SelectItem>
              <SelectItem value="za">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-2">No schemes found</div>
          <p className="text-sm text-gray-500">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
};

export default SchemesList;
