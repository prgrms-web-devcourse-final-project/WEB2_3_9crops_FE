import { Outlet } from 'react-router';

const MobileLayout = () => {
  return (
    <div className="mobile-bg">
      <div className="mobile-layout z-2">
        <Outlet />
      </div>
    </div>
  );
};
export default MobileLayout;
