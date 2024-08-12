import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FaHome } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminHamburger = ({ side }) => {

    return (
        <Sheet key={side}>
            <SheetTrigger asChild>
                <button variant="outline" className="border-transparent">
                    <GiHamburgerMenu className='text-white' />
                </button>
            </SheetTrigger>
            <SheetContent side={side} className="bg-gray-800 max-w-[200px] p-4">
                <nav className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <Link to={'/'} className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out shadow-2xl">
                        <FaHome />
                        Home</Link>
                    <div className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out">
                        <IoMdContacts />
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="cursor-pointer">Products</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-white rounded-box min-w-max z-[1] p-2 shadow">
                                <li><Link to={''} className="hover:bg-blue-500 hover:text-white">Show all products</Link></li>
                                <li><Link to={'/admin/create-product'} className="hover:bg-blue-500 hover:text-white">Create a Product</Link></li>
                            </ul>
                        </div>

                    </div>
                    <Link to={'/admin/home'} className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out">
                        <MdAdminPanelSettings />
                        Users</Link>
                    <Link href="#" className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out">
                        <FaDiscord />
                        Orders</Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default AdminHamburger;