import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {

    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    return (
        <div className="flex justify-between p-6">
            <img src="/bigLogo.png" className="w-80 h-6" />
            <div className="flex items-center gap-8 font-saira text-lg tracking-widest">
                <NavLink to='/adminDashboard' className="hover:underline">
                    Dashboard
                </NavLink>
                <NavLink to='/productsList' className="hover:underline">
                    Manage Products
                </NavLink>
                <NavLink className="hover:underline">
                    Manage Inquiries & Requests
                </NavLink>
                <NavLink onMouseEnter={() => setIsProfileHovered(true)} onMouseLeave={() => setIsProfileHovered(false)}>
                    <img
                        src={isProfileHovered ? "/profileFilled.png" : "/profileOutlined.png"}
                        alt="Icon"
                        className="w-7 transition duration-500"
                    />
                </NavLink>
                <NavLink to='/adminLogin' onMouseEnter={() => setIsLogoutHovered(true)} onMouseLeave={() => setIsLogoutHovered(false)}>
                    <img
                        src={isLogoutHovered ? "/logoutOutlined.png" : "/logoutFilled.png"}
                        alt="Icon"
                        className="w-7"
                    />
                </NavLink>
            </div>
        </div>
    )
};
