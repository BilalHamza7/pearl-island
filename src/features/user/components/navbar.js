import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex flex-col justify-center items-center gap-7 pt-2 pb-3 shadow-md">
            <img src="/logo.jpg" className="w-5/12 h-28" alt="Pearl Island logo" />
            <div className="flex gap-32 font-saira text-2xl tracking-widest ">
                <NavLink to='/' className={({ isActive }) => (isActive ? "font-normal border-b-2 border-black" : "font-light hover:font-normal border-b-2 border-transparent hover:border-black transition-all duration-500")}>
                    HOME
                </NavLink>
                <NavLink to='/products' className={({ isActive }) => (isActive ? "font-normal border-b-2 border-black" : "font-light hover:font-normal border-b-2 border-transparent hover:border-black transition-all duration-500")}>
                    DISCOVER
                </NavLink>
                <NavLink to='/aboutUs' className={({ isActive }) => (isActive ? "font-normal border-b-2 border-black" : "font-light hover:font-normal border-b-2 border-transparent hover:border-black transition-all duration-500")}>
                    ABOUT US
                </NavLink>
                <NavLink to='/contactUs' className={({ isActive }) => (isActive ? "font-normal border-b-2 border-black" : "font-light hover:font-normal border-b-2 border-transparent hover:border-black transition-all duration-500")}>
                    CONTACT US
                </NavLink>
            </div>
        </div>
    )
};
