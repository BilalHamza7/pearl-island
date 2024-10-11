import Footer from "./comp/footer";
import Navbar from "./comp/navbar";
import TotalProducts from "./comp/totalProducts";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center w-full min-h-screen py-10">
                <p className="text-4xl font-saira tracking-wider">Welcome!</p>
                <p className="text-lg text-center leading-tight tracking-wider font-light font-montserrat mt-2">Get Started Right Away</p>
                <button className="button-style text-lg mt-6">
                    Add New Product
                </button>
                <div className="flex w-full px-10 mt-10 gap-12">
                    <TotalProducts />
                    <div className="flex flex-col w-full gap-5">
                        <div className="flex flex-col gap-5">
                            <p className="text-4xl font-saira tracking-wider">Recently Added Products</p>

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
                                <tbody className="bg-gray-100 text-lg font-montserrat tracking-widest">
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">Natural Blue Sapphire</td>
                                        <td className="p-3 text-left">3.05</td>
                                        <td className="p-3 text-left">Rectangle</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">Natural Blue Sapphire</td>
                                        <td className="p-3 text-left">3.05</td>
                                        <td className="p-3 text-left">Square</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">Natural Blue Sapphire</td>
                                        <td className="p-3 text-left">3.05</td>
                                        <td className="p-3 text-left">Round</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">Natural Blue Sapphire</td>
                                        <td className="p-3 text-left">3.05</td>
                                        <td className="p-3 text-left">Heart</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">Natural Blue Sapphire</td>
                                        <td className="p-3 text-left">3.05</td>
                                        <td className="p-3 text-left">Oval</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Recent Requests */}
                        <div className="flex flex-col gap-5">
                            <p className="text-4xl font-saira tracking-wider">Recent Price Requests</p>
                            <table className="rounded-lg overflow-hidden border-b">
                                <thead className="text-left bg-gray-200 text-xl font-montserrat tracking-widest">
                                    <tr>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Gemstone ID</th>
                                        <th className="p-3 text-left">Email</th>
                                        <th className="p-3 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-100 text-lg font-montserrat tracking-widest">
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">John Wick</td>
                                        <td className="p-3 text-left">PI-0001</td>
                                        <td className="p-3 text-left">johnwick@gmail.com</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">Batista taker</td>
                                        <td className="p-3 text-left">PI-0002</td>
                                        <td className="p-3 text-left">batista@gmail.com</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                    <tr className="font-light p-3 border-b border-gray-300">
                                        <td className="p-3 text-left">Sachin Tendulkar</td>
                                        <td className="p-3 text-left">PI-0003</td>
                                        <td className="p-3 text-left">sachin@gmail.com</td>
                                        <td className="p-3 text-left">01/10/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <p className="mt-10 font-saira text-3xl">Quick Links</p>
                <div className="flex justify-center gap-10 w-full mt-5">
                    <button className="button-style">
                        View All Products
                    </button>
                    <button className="button-style">
                        View All Requests & Inquiries
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
};
