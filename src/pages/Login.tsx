
import NavBar from '@/components/NavBar';
import AuthForm from '@/components/auth/AuthForm';
import Footer from '@/components/Footer';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center py-12">
        <AuthForm mode="login" />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
