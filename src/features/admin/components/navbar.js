import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    const handleLogOut = () => {
        const response = window.confirm('Do You Really Want To Log Out?');
        if(response === true) {
            navigate('/admin');
        }
    };

    return (
        <>
            <div className="flex justify-between p-6 shadow-md">
                <img src="/bigLogo.png" className="w-80 h-6" />
                <div className="flex items-center gap-8 font-saira text-lg tracking-widest ">
                    <NavLink to='/admin/adminDashboard' className={({ isActive }) => isActive ? "underline" : "hover:underline"}>
                        Dashboard
                    </NavLink>
                    <NavLink to='/admin/manageProduct' className={({ isActive }) => isActive ? "underline" : "hover:underline"}>
                        Manage Products
                    </NavLink>
                    <NavLink to='/admin/manageCustomer' className={({ isActive }) => isActive ? "underline" : "hover:underline"}>
                        Manage Inquiries & Requests
                    </NavLink>
                    <NavLink to='/admin/adminProfile' className={({ isActive }) => isActive ? "w-7 active" : "w-7"} onMouseEnter={() => setIsProfileHovered(true)} onMouseLeave={() => setIsProfileHovered(false)}>
                        {({ isActive }) => (
                            <img
                                src={isProfileHovered || isActive ? "/profileFilled.png" : "/profileOutlined.png"}
                                alt="Icon"
                            />
                        )}
                    </NavLink>
                    <div onClick={handleLogOut} onMouseEnter={() => setIsLogoutHovered(true)} onMouseLeave={() => setIsLogoutHovered(false)} className='cursor-pointer'>
                        <img
                            src={isLogoutHovered ? "/logoutOutlined.png" : "/logoutFilled.png"}
                            alt="Icon"
                            className="w-7"
                        />
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
};
