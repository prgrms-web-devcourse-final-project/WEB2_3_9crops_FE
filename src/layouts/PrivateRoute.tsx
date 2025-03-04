import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router';

import useAuthStore from '@/stores/authStore';

export default function PrivateRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    } else {
      setShouldRender(true);
    }
  }, [isLoggedIn, navigate]);

  if (!shouldRender) {
    return null;
  }

  return <Outlet />;
}
