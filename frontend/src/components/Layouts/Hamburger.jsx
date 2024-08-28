import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FaHome } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Hamburger = ({ side }) => {

    const user = useSelector(state => state.user.data)

    return (
        <Sheet key={side}>
            <SheetTrigger asChild>
                <button variant="outline" className="border-transparent">
                    <GiHamburgerMenu />
                </button>
            </SheetTrigger>
            <SheetContent side={side} className="bg-gray-800 max-w-[200px] p-4">
                <nav className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <Link to={'/'} className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out shadow-2xl">
                        <FaHome />
                        Home</Link>
                    <Link to={'/about'} className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out">
                        <IoMdContacts />
                        About</Link>
                    {(user?.role == 'admin' || user?.role == 'owner') && (
                        <Link to={'/admin/home'} className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out">
                            <MdAdminPanelSettings />
                            Admin</Link>
                    )}

                    <Link href="#" className="flex items-center gap-2 text-white text-lg font-semibold hover:text-gray-400 hover:bg-gray-700 p-2 rounded transition duration-200 ease-in-out">
                        <FaDiscord />
                        Github</Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default Hamburger;