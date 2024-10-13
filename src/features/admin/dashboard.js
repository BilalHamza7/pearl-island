import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import TotalProducts from "./components/totalProducts";

export default function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center w-full min-h-screen py-10">
                <p className="title_text">Welcome!</p>
                <p className="subtitle_text mt-2">Get Started Right Away</p>
                <button onClick={() => navigate('/addNewProduct')} className="button_style mt-6">
                    Add New Product
                </button>
                <div className="flex w-full px-10 mt-10 gap-12">
                    <TotalProducts />
                    <div className="flex flex-col w-full gap-5">
                        <div className="flex flex-col gap-5">
                            <p className="title_text">Recently Added Products</p>

                            {/* Recent Products */}
                            <table className="rounded-lg overflow-hidden border-b">
                                <thead className="text-left bg-gray-200 text-xl font-montserrat tracking-widest">
                                    <tr>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Weight(Cts)</th>
                                        <th className="p-3 text-left">Shape</th>
                                        <th className="p-3 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">Natural Blue Sapphire</td>
                                        <td className="p-3 ">3.05</td>
                                        <td className="p-3 ">Rectangle</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">Natural Blue Sapphire</td>
                                        <td className="p-3 ">3.05</td>
                                        <td className="p-3 ">Square</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">Natural Blue Sapphire</td>
                                        <td className="p-3 ">3.05</td>
                                        <td className="p-3 ">Round</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">Natural Blue Sapphire</td>
                                        <td className="p-3 ">3.05</td>
                                        <td className="p-3 ">Heart</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">Natural Blue Sapphire</td>
                                        <td className="p-3 ">3.05</td>
                                        <td className="p-3 ">Oval</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Recent Requests */}
                        <div className="flex flex-col gap-5">
                            <p className="title_text">Recent Price Requests</p>
                            <table className="rounded-lg overflow-hidden border-b">
                                <thead className="text-left bg-gray-200 text-xl font-montserrat tracking-widest">
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Gemstone ID</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-100 text-lg font-montserrat tracking-widest">
                                    <tr className="text-left font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">John Wick</td>
                                        <td className="p-3 ">PI-0001</td>
                                        <td className="p-3 ">johnwick@gmail.com</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">Batista taker</td>
                                        <td className="p-3 ">PI-0002</td>
                                        <td className="p-3 ">batista@gmail.com</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 ">Sachin Tendulkar</td>
                                        <td className="p-3 ">PI-0003</td>
                                        <td className="p-3 ">sachin@gmail.com</td>
                                        <td className="p-3 ">01/10/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <p className="mt-10 title_text">Quick Links</p>
                <div className="flex justify-center gap-10 w-full mt-5">
                    <button onClick={() => navigate('/manageProduct')} className="button_style">
                        View All Products
                    </button>
                    <button onClick={() => navigate('/manageCustomer')} className="button_style">
                        View All Requests & Inquiries
                    </button>
                </div>
            </div>
        </>
    )
};
