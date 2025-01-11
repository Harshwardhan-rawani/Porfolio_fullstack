import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminLayout() {
  const handleLoginClick = () => {
    localStorage.removeItem("token")
    window.location.reload()
  };

  return (
    <div>
      {/* Navbar */}
      <div className="mx-3 p-3 font-serif bg-[#134d4e] h-[8vh] shadow-lg flex justify-between items-center rounded-b-md">
        <Link to={"./dashboard"} className="lg:text-2xl font- md:text-2xl text-xl font-semibold text-white tracking-wide">
          Admin Panel
        </Link>
        <button
          onClick={handleLoginClick}
          aria-label="Login"
          className="font-medium bg-[#10B981] text-white rounded-lg px-4 py-1 lg:text-lg text-sm hover:bg-[#059669] transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Page Content */}
      <div className="overflow-y-scroll rounded-md shadow-inner" style={{ height: 'calc(100vh - 8vh)' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
