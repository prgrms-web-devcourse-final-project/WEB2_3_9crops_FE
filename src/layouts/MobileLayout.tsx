import Toast from '@/components/Toast';
import { Outlet } from 'react-router';

const MobileLayout = () => {
  return (
    <div className="mobile-bg">
      <div className="mobile-layout">
        <Outlet />
      </div>
      <Toast />
    </div>
  );
};
export default MobileLayout;
