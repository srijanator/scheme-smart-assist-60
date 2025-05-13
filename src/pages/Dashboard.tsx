
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  BarChart, 
  FileText, 
  Search,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for applications
  const applications = [
    {
      id: 'APP123456',
      scheme: 'PM-KISAN Yojana',
      status: 'approved',
      date: '2023-05-10',
      nextStep: 'Payment processing'
    },
    {
      id: 'APP789012',
      scheme: 'Pradhan Mantri Awas Yojana',
      status: 'pending',
      date: '2023-05-15',
      nextStep: 'Document verification'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Rejected
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, John Doe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">2</div>
                  <FileText className="h-8 w-8 text-gov-blue opacity-70" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">1</div>
                  <CheckCircle className="h-8 w-8 text-gov-green opacity-70" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">1</div>
                  <Clock className="h-8 w-8 text-gov-orange opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Applications</CardTitle>
                    <Link to="/applications" className="text-sm text-gov-blue">
                      View all
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <div className="divide-y">
                      {applications.map(app => (
                        <div key={app.id} className="py-3 flex items-center justify-between">
                          <div>
                            <p className="font-medium">{app.scheme}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span>ID: {app.id}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(app.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {getStatusBadge(app.status)}
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No applications yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map(app => (
                      <div key={`next-${app.id}`} className="flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="bg-gray-100 rounded-full p-2">
                            {app.status === 'approved' ? (
                              <CheckCircle className="h-5 w-5 text-gov-green" />
                            ) : (
                              <Clock className="h-5 w-5 text-gov-orange" />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{app.nextStep}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            For {app.scheme} (Application ID: {app.id})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium text-gov-blue">You may be eligible for 3 more schemes</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on your recently updated profile information
                    </p>
                    <Button className="mt-3 w-full bg-gov-blue hover:bg-blue-700" asChild>
                      <Link to="/eligible-schemes">
                        Discover Schemes <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Search className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Search Schemes Database</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Browse all available government schemes
                        </p>
                        <Button className="mt-2 w-full" variant="outline" asChild>
                          <Link to="/schemes">
                            Browse Schemes
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profile Completeness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">97% complete</span>
                    <span className="text-xs text-gov-blue">2 suggestions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gov-blue h-2 rounded-full" style={{ width: '97%' }} />
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="text-sm">
                      <p className="text-gov-blue">Add your alternate phone number</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gov-blue">Complete your employment details</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Update Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
