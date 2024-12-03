import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import axios from 'axios';

export default function AdminProfile() {

    const navigate = useNavigate();

    const [adminId, setAdminId] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [totalListing, setTotalListing] = useState('');
    const [requestToRespond, setRequestToRespond] = useState('');
    const [inquiryToRespond, setInquiryToRespond] = useState('');
    const [productSold, setProductSold] = useState('');
    const [totalRequest, setTotalRequest] = useState('');
    const [totalInquiry, setTotalInquiry] = useState('');

    const fetchAdmindetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/getAdminDetails');
            if (response.data.admin.adminId) {
                setAdminId(response.data.admin.adminId);
                setUsername(response.data.admin.username);
                setFullname(response.data.admin.fullName);
                setEmail(response.data.admin.email);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateAdminDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.put('http://localhost:5000/admin/updateAdmin', {
                adminId: adminId,
                username: username,
                fullName: fullname,
                email: email,
            });
            if (response.data) {
                setLoading(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getTotalListing = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product/getKindCount');

            if (response.data) {
                let total = 0
                for (let i = 0; i < response.data.products.length; i++) {
                    total += response.data.products[i].count;
                }
                setTotalListing(total);
            }
        } catch (error) {
            console.log(error.data);
        }
    }

    const getAllRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/request/getRequests');
            if (response.data.requests.length > 0) {
                setTotalRequest(response.data.requests.length);
                let count = 0;
                for (let i = 0; i < response.data.requests.length; i++) {
                    !response.data.requests[i].responded && (count = count + 1);
                }
                setRequestToRespond(count);
            }
        } catch (error) {
            console.error(error.data);
        }
    }

    const getAllInquirys = async () => {
        try {
            const response = await axios.get('http://localhost:5000/inquiry/getInquirys');
            if (response.data.inquirys.length > 0) {
                setTotalInquiry(response.data.inquirys.length);
                let count = 0;
                for (let i = 0; i < response.data.inquirys.length; i++) {
                    !response.data.inquirys[i].responded && (count = count + 1);
                }
                setInquiryToRespond(count);
            }
        } catch (error) {
            console.error(error.data);
        }
    }

    const getSoldStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product/getSoldStatus');
            if (response.data.products.length > 0) {
                let count = 0;
                for (let i = 0; i < response.data.products.length; i++) {
                    response.data.products[i].soldStatus && (count = count + 1);
                }
                setProductSold(count);
            }
        } catch (error) {
            console.error(error.data);
        }
    }



    useEffect(() => {
        fetchAdmindetails();
        getTotalListing();
        getAllRequests();
        getAllInquirys();
        getSoldStatus();
    }, [])


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

                {/* {message && <p className="input_label text-green-400">{message}</p>} */}

                <div className="flex gap-10 justify-center">
                    <button className="button_style" onClick={() => navigate('/admin/resetPassword')}>
                        Change Password
                    </button>
                    <button className="button_style" onClick={() => updateAdminDetails()}>
                        Save Details
                    </button>
                    <img
                        src="/loadingGif.gif"
                        className={`w-7 h-7 ${!loading && 'opacity-0'}`}
                    />
                </div>
                <div className="flex flex-col gap-5 w-full px-10">
                    <div className="flex justify-around w-full">
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Number of Active Listings:
                            <label className="text-center font-montserrat font-light">
                                {totalListing}
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Pending Price Requests To Respond:
                            <label className="text-center font-montserrat font-light">
                                {requestToRespond}
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Pending Inquiries To Respond:
                            <label className="text-center font-montserrat font-light">
                                {inquiryToRespond}
                            </label>
                        </label>
                    </div>
                    <div className="flex justify-around w-full">
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Total Gems Sold:
                            <label className="text-center font-montserrat font-light">
                                {productSold}
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Total Price Requests Received:
                            <label className="text-center font-montserrat font-light">
                                {totalRequest}
                            </label>
                        </label>
                        <label className="font-saira text-2xl text-center flex flex-col gap-5">
                            Total Inquiries Received:
                            <label className="text-center font-montserrat font-light">
                                {totalInquiry}
                            </label>
                        </label>
                    </div>
                </div>
                <p className="title_text text-center">Quick Links</p>
                <div className="flex justify-center gap-10 w-full">
                    <button onClick={() => navigate('/admin/adminDashboard')} className="button_style">
                        Dashboard
                    </button>
                    <button onClick={() => navigate('/admin/manageProduct')} className="button_style">
                        View All Products
                    </button>
                    <button onClick={() => navigate('/admin/manageCustomer')} className="button_style ">
                        View All Requests & Inquiries
                    </button>
                </div>
            </div>
        </>
    )
};
