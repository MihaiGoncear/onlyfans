import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function MenuItem({ item, openedTab, setOpenedTab, setIsMobileOpen }) {
    const location = useLocation();
    const activeTab = `${location.pathname}${location.hash}`;
    const { main, sub } = item;
    const submenuRef = useRef(null);
    const openedSubmenu = openedTab === main;

    return (
        <div
            className={`
                header__navigation--item 
                ui__display-center 
                disable-selection
                ${openedSubmenu ? "active" : ""}
            `}
            onClick={() => setOpenedTab((state) => (main === state ? "" : main))}
            onMouseLeave={() => setOpenedTab("")}
            ref={submenuRef}
        >
            <span className='name'>{main}</span>
            {openedSubmenu && (
                <div className='submenu'>
                    {sub.map((subItem, subIndex) => {
                        const { name, url } = subItem;
                        return (
                            <Link
                                key={subIndex}
                                to={url}
                                className={`submenu__item ${activeTab === url ? "active" : ""}`}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MenuItem;
