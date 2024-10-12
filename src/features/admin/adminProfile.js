import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";

export default function AdminProfile() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('Pearl Island');
    const [fullname, setFullname] = useState('Pearl Island');
    const [email, setEmail] = useState('pearlisland@gmail.com');

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-10 items-center justify-center py-10">
                <p className="title_text">Admin Details</p>
                <div className="flex items-center justify-center gap-28 w-full">
                    <label className="flex flex-col gap-2 input_label">
                        Full Name:
                        <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="input_style w-64" />
                    </label>
                    <label className="flex flex-col gap-2 input_label">
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input_style w-64" />
                    </label>
                    <label className="flex flex-col gap-2 input_label">
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input_style w-64" />
                    </label>
                </div>
                <div className="flex gap-10 justify-center">
                    <button className="button_style">
                        Change Password
                    </button>
                    <button className="button_style">
                        Save Details
                    </button>
                </div>
                <div className="flex flex-col gap-5 w-full px-10">
                    <div className="flex justify-around w-full">
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Number of Active Listings:
                            <label className="text-center font-montserrat font-light">
                                50
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Pending Price Requests To Respond:
                            <label className="text-center font-montserrat font-light">
                                2
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Pending Inquiries To Respond:
                            <label className="text-center font-montserrat font-light">
                                4
                            </label>
                        </label>
                    </div>
                    <div className="flex justify-around w-full">
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Total Gems Sold:
                            <label className="text-center font-montserrat font-light">
                                13
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Total Price Requests Received:
                            <label className="text-center font-montserrat font-light">
                                11
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Total Inquiries Received:
                            <label className="text-center font-montserrat font-light">
                                20
                            </label>
                        </label>
                    </div>
                </div>
                <p className="title_text text-center">Quick Links</p>
                <div className="flex justify-center gap-10 w-full">
                    <button onClick={() => navigate('/adminDashboard')} className="button_style">
                        Dashboard
                    </button>
                    <button onClick={() => navigate('/manageProduct')} className="button_style">
                        View All Products
                    </button>
                    <button onClick={() => navigate('/manageCustomer')} className="button_style ">
                        View All Requests & Inquiries
                    </button>
                </div>
            </div>
        </>
    )
};
