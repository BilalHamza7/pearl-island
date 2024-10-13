import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ManageInq from "./manageInq";
import ManageReq from "./manageReq";

export default function Manage() {

    const navigate = useNavigate();

    const [activePage, setActivePage] = useState('requests');

    const handlePageChange = (props) => {
        setActivePage(props.value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <Navbar />
            <div className="flex flex-col w-full p-10">
                <div className="flex">
                    <NavLink className={activePage === 'requests' ? "title_text bg-gray-300 py-2 px-4 rounded-t-lg" : "title_text py-2 px-4 hover:bg-gray-200 rounded-t-lg"} onClick={() => handlePageChange({ value: 'requests' })}>
                        Price Requests
                    </NavLink>
                    <NavLink className={activePage === 'inquiries' ? "title_text bg-gray-300  py-2 px-4 rounded-t-lg" : "title_text  py-2 px-4 hover:bg-gray-200 rounded-t-lg"} onClick={() => handlePageChange({ value: 'inquiries' })}>
                        Customer Inquiries
                    </NavLink>
                </div>
                <hr className="w-full bg-gray-300 h-1 rounded-xl" />
            </div>

            {activePage === 'inquiries' ?
                <ManageInq />
                :
                <ManageReq />
            }

            <p className="mt-10 title_text text-center">Quick Links</p>
            <div className="flex justify-center gap-10 w-full my-5">
                <button onClick={() => navigate('/adminDashboard')} className="button_style">
                    Dashboard
                </button>
                <button onClick={() => navigate('/manageProduct')} className="button_style ">
                    Manage Products
                </button>
            </div>
        </div>
    )
};
