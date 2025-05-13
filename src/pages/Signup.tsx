
import NavBar from '@/components/NavBar';
import AuthForm from '@/components/auth/AuthForm';
import Footer from '@/components/Footer';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center py-12">
        <AuthForm mode="signup" />
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
