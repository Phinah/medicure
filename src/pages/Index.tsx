
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LandingPage from './LandingPage';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && user) {
      // Redirect to the appropriate dashboard based on user role
      switch (user.role) {
        case 'patient':
          navigate('/patient');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'hospital':
          navigate('/hospital');
          break;
        case 'caretaker':
          navigate('/caretaker');
          break;
        default:
          break;
      }
    }
  }, [user, loading, navigate]);

  // If no user is logged in, show the landing page
  return <LandingPage />;
};

export default Index;
