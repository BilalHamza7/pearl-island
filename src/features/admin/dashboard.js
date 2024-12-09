import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import RecentProduct from "./components/recentProduct";
import ProductsCount from "./components/productsCount";
import RecentRequest from "./components/recentRequest";
import axios from "axios";

export default function Dashboard() {

    const navigate = useNavigate();

    const validateSession = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/checkSession', { withCredentials: true });
            if (!response.data.authenticated) {
                navigate('/admin');
            }
        } catch (error) {
            console.error(error.data);
        }
    }

    useEffect(() => {
        validateSession();
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center w-full min-h-screen py-10">
                <p className="title_text">Welcome!</p>
                <p className="subtitle_text mt-2">Get Started Right Away</p>
                <button onClick={() => navigate('/admin/addNewProduct')} className="button_style mt-6">
                    Add New Product
                </button>
                <div className="flex w-full px-10 mt-10 gap-12">
                    <ProductsCount />
                    <div className="flex flex-col w-full gap-5">
                        <div className="flex flex-col gap-5">
                            <p className="title_text">Recently Added Products</p>

                            {/* Recent Products */}
                            <RecentProduct />
                        </div>

                        {/* Recent Requests */}
                        <div className="flex flex-col gap-5">
                            <p className="title_text">Recent Price Requests</p>
                            <RecentRequest />
                        </div>
                    </div>
                </div>
                <p className="mt-10 title_text">Quick Links</p>
                <div className="flex justify-center gap-10 w-full mt-5">
                    <button onClick={() => navigate('/admin/manageProduct')} className="button_style">
                        View All Products
                    </button>
                    <button onClick={() => navigate('/admin/manageCustomer')} className="button_style">
                        View All Requests & Inquiries
                    </button>
                </div>
            </div>
        </>
    )
};
