import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import Container from "../components/Layouts/Container";
import { footerHeight } from "../constants/footerHeight.const";
import { headerHeight } from "../constants/headerHeight.const";
import { Outlet } from "react-router-dom";
import ScrollTop from "@/util/ScrollTop_Onload";
const Layout = ({ children }) => {



    const [footHeight, setFootHeight] = useState(null)
    const [headHeight, setHeadHeight] = useState(null)
    const footerRef = useRef(null) // so can know when footer ele renders
    const headerRef = useRef(null) // so can know when header ele renders
    useEffect(() => {

        if (headerRef.current) {
            setHeadHeight(headerHeight())
        }
        if (footerRef.current) {
            setFootHeight(footerHeight())
        }
    }, [footerRef, headerRef])


    return (
        <Container>
            <ScrollTop />
            <Header ref={headerRef} />
            {/* <div style={{ height: `${headHeight}px` }} className={` w-full`}></div> */}


            {children}
            <Outlet />  {/* this is where child routes will rendered */}

            <Footer ref={footerRef} />
            <div style={{ height: `${footHeight}px` }} className={` w-full `}></div>
        </Container>
    );
};

export default Layout;
