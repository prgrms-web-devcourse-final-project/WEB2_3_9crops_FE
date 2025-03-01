import { Outlet } from 'react-router';

import Sidebar from './components/Sidebar';

const AdminPage = () => {
  return (
    <main className="flex h-full min-h-screen w-full">
      <Sidebar />
      <section className="bg-gray-5 flex w-full flex-col">
        <Outlet />
      </section>
    </main>
  );
};
export default AdminPage;
