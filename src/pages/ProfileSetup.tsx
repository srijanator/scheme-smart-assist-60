
import NavBar from '@/components/NavBar';
import ProfileForm from '@/components/profile/ProfileForm';

const ProfileSetup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow py-12 bg-gray-50">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfileSetup;
