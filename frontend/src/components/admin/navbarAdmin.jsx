import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import TaxEcomLogo from '../TaxEcomLogo';
import { useLogoutUser } from '@/hooks/user/useLogoutUser';
import AdminHamburger from "../admin/AdminHamburger";

function NavbarAdmin() {

    const { mutate: logout } = useLogoutUser()
    const handleLogout = () => {
        logout()
    }

    return (
        <nav className="bg-[#1F2937] sticky w-full z-20 top-0 start-0 border-b border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <TaxEcomLogo />
                </NavLink>
                <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                        onClick={() => handleLogout()}
                    >
                        Log out
                    </button>
                    <div className='flex lg:hidden text-3xl cursor-pointer'>
                        <AdminHamburger />
                    </div>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-2 md:px-4 mt-4 font-medium border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900">
                        <li>
                            <NavLink
                                to="/admin/home"
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'text-blue-500' : 'text-white'} hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <span
                                to=""
                                className={
                                    `block py-2 px-3 rounded text-white md:bg-transparent`
                                }
                            >
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="cursor-pointer">Products</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-white rounded-box min-w-max z-[1] p-2 shadow">
                                        <li><Link to={''} className="hover:bg-blue-500 hover:text-white">Show all products</Link></li>
                                        <li><Link to={'/admin/create-product'} className="hover:bg-blue-500 hover:text-white">Create a Product</Link></li>
                                    </ul>
                                </div>
                            </span>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/allusers"
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'text-blue-500' : 'text-white'} hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500`
                                }
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/orders"
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'text-blue-500' : 'text-white'} hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500`
                                }
                            >
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarAdmin;