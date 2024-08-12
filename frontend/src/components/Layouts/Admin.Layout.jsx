import React from 'react'
import NavbarAdmin from "../admin/navbarAdmin";
import { Outlet } from 'react-router-dom';

function AdminLayout({ children }) {
  return (
    <div className='min-h-screen w-full'>
      <NavbarAdmin />
      {children}
      <Outlet />
    </div>
  )
}

export default AdminLayout
