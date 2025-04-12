import React, { useEffect, useRef, useState } from "react";
import "./Header.sass";
import { NAVIGATION } from "../../utils/constants";
import MenuItem from "./Components/MenuItem";
import useWindowSizes from "../../hooks/useWindowSizes";
import useClickOutsideTarget from "../../hooks/useClickOutsideTarget";

function Header() {
    const { windowWidth } = useWindowSizes();
    const [openedTab, setOpenedTab] = useState("");

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    useEffect(() => {
        setIsMobileOpen(false);
    }, [windowWidth]);

    const mobileRef = useRef(null);

    useClickOutsideTarget(mobileRef, () => setIsMobileOpen(false));

    return (
        <div className='header'>
            <div className='general-wrapper ui__display-align-center'>
                <a
                    href='/'
                    className='header__logo'
                >
                    <img
                        src='/images/logo.png'
                        alt='logo'
                    />
                </a>
                {windowWidth < 1200 && (
                    <div
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className='stop-click-windows mobile-menu-icon ui__cols'
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
                {(windowWidth >= 1200 || isMobileOpen) && (
                    <nav
                        ref={mobileRef}
                        className='header__navigation ui__display-align-center'
                    >
                        {NAVIGATION.map((item, index) => {
                            return (
                                <MenuItem
                                    item={item}
                                    key={`${index}_${item.main}`}
                                    setOpenedTab={setOpenedTab}
                                    setIsMobileOpen={setIsMobileOpen}
                                    openedTab={openedTab}
                                />
                            );
                        })}
                    </nav>
                )}
            </div>
        </div>
    );
}

export default Header;
