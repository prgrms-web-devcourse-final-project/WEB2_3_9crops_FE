import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router';

import useAuthStore from '@/stores/authStore';

export default function AdminRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
    if (!isAdmin) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
