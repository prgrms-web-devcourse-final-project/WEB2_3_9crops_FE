import { Outlet } from 'react-router';

import Sidebar from './components/Sidebar';

const AdminPage = () => {
  return (
    <main className="flex h-full min-h-screen w-full">
      <Sidebar />
      <section className="bg-gray-5 flex w-full flex-col">
        <h2 className="body-l-m text-gray-80 border-gray-10 flex h-14 w-full shrink-0 items-center border-b px-5">
          사용자 목록
        </h2>
        <div className="h-full p-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
};
export default AdminPage;
