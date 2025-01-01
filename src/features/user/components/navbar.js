import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex flex-col justify-center items-center gap-8 pt-2 pb-3 shadow-md">
            <img src="/logo.jpg" className="h-28" alt="Pearl Island logo" />
            <div className="flex gap-28 font-saira text-xl font-light ">
                <NavLink to='/' className={({ isActive }) => (isActive ? "border-b-2 border-gray-700 text-gray-700" : "hover:text-gray-700 transition-all duration-300")}>
                    Home
                </NavLink>
                <NavLink to='/products' className={({ isActive }) => (isActive ? "border-b-2 border-gray-700 text-gray-700" : "hover:text-gray-700 transition-all duration-300")}>
                    Products
                </NavLink>
                <NavLink to='/aboutUs' className={({ isActive }) => (isActive ? "border-b-2 border-gray-700 text-gray-700" : "hover:text-gray-700 transition-all duration-300")}>
                    About Us
                </NavLink>
                <NavLink to='/contactUs' className={({ isActive }) => (isActive ? "border-b-2 border-gray-700 text-gray-700" : "hover:text-gray-700 transition-all duration-300")}>
                    Contact Us
                </NavLink>
            </div>
        </div>
    )
};
