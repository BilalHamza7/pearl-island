import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {

    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    return (
        <>
            <div className="flex justify-between p-6 shadow-md">
                <img src="/bigLogo.png" className="w-80 h-6" />
                <div className="flex items-center gap-8 font-saira text-lg tracking-widest ">
                    <NavLink to='/adminDashboard' className={({ isActive }) => isActive ? "underline" : "hover:underline"}>
                        Dashboard
                    </NavLink>
                    <NavLink to='/manageProduct' className={({ isActive }) => isActive ? "underline" : "hover:underline"}>
                        Manage Products
                    </NavLink>
                    <NavLink to='/manageCustomer' className={({ isActive }) => isActive ? "underline" : "hover:underline"}>
                        Manage Inquiries & Requests
                    </NavLink>
                    <NavLink to='/adminProfile' className={({ isActive }) => isActive ? "w-7 active" : "w-7"} onMouseEnter={() => setIsProfileHovered(true)} onMouseLeave={() => setIsProfileHovered(false)}>
                        {({ isActive }) => (
                            <img
                                src={isProfileHovered || isActive ? "/profileFilled.png" : "/profileOutlined.png"}
                                alt="Icon"
                            />
                        )}
                    </NavLink>
                    <NavLink to='/' onMouseEnter={() => setIsLogoutHovered(true)} onMouseLeave={() => setIsLogoutHovered(false)}>
                        <img
                            src={isLogoutHovered ? "/logoutOutlined.png" : "/logoutFilled.png"}
                            alt="Icon"
                            className="w-7"
                        />
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </>
    )
};
