import React from 'react';
import { forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TaxEcomLogo from '../TaxEcomLogo';
import Hamburger from './Hamburger';
import { FaSearch } from "react-icons/fa";
import CartOrders from '../CartOrders';
import SearchForm from '../Search';


const Header = (props, ref) => {
    const getNavLinkClass = (isActive) =>
        `block py-2 pr-4 pl-3 ${isActive ? 'text-orange-300' : 'text-gray-400'
        } duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`;

    return (
        <header ref={ref} id='header' className="shadow fixed z-40 top-0 left-0 right-0">
            <nav className="bg-gray-800 text-white flex justify-evenly lg:justify-start gap-x-2 lg:gap-x-9  items-center border-gray-200 py-2 px-4 lg:px-6">
                <div className='flex space-x-5'>

                    <div className='flex lg:hidden text-3xl cursor-pointer'>
                        <Hamburger side={'left'} />
                    </div>
                    <Link to="/" className="flex items-center text-4xl">
                        <TaxEcomLogo />
                    </Link>
                    <div>
                    </div>

                    <ul className="hidden md:hidden lg:flex lg:items-center lg:justify-center xl:gap-5 lg:gap-2 md:gap-1 h-full my-auto self-center justify-self-center font-medium lg:text-base xl:text-xl">                        <li>
                        <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
                            Home
                        </NavLink>
                    </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => getNavLinkClass(isActive)}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" className={({ isActive }) => getNavLinkClass(isActive)}>
                                Admin
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/github" className={({ isActive }) => getNavLinkClass(isActive)}>
                                Github
                            </NavLink>
                        </li>
                    </ul>

                </div>
                <div className="self-center w-2/5">
                    <SearchForm />
                </div>
                <div className="hidden md:hidden lg:flex items-center h-full gap-x-6 ml-auto">
                    <Link to={'/myorders'}>
                        <div className='hover:outline p-2'>
                            <p className='text-xs'>
                                Return
                            </p>
                            <span className='font-bold'>& Orders</span>
                        </div>
                    </Link>
                    <Link>
                        <CartOrders />
                    </Link>
                </div>
                <Link
                    to="/login"
                    className="text-white bg-red-600 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                    Log in
                </Link>
            </nav>
        </header>
    );
};

export default forwardRef(Header);