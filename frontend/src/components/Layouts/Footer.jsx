import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { forwardRef } from 'react';
import TaxEcomLogo from '../TaxEcomLogo';
import { PiXLogoFill } from "react-icons/pi";
import { FaGithub, FaDiscord } from 'react-icons/fa';



function Footer(props, ref) {
    return (
        <footer
            ref={ref}
            id='footer'
            className=" text-white shadow-lg absolute bottom-0 right-0 left-0">
            <div className="footer footer-center bg-gray-900 text-white p-10">
                <aside>
                    <TaxEcomLogo />
                    <p className="font-bold">
                        TaxEcom Ltd.
                        <br />
                        Providing reliable products since never
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <Link className='cursor-pointer text-2xl'>
                            <PiXLogoFill />
                        </Link>
                        <Link className='cursor-pointer text-2xl'>
                            <FaGithub />
                        </Link>
                        <Link className='cursor-pointer text-2xl'>
                            <FaDiscord />
                        </Link>
                    </div>
                </nav>
            </div>
        </footer>
    );
}

export default forwardRef(Footer);