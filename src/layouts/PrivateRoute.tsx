import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router';

import useAuthStore from '@/stores/authStore';
import { useServerSentEvents } from '@/hooks/useServerSentEvents';
import Toast from '@/components/Toast';

export default function PrivateRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useServerSentEvents();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Outlet />
      <Toast />
    </>
  );
}
