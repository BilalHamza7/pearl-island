import { useState } from "react";
import FeaturedProducts from "./components/featuredProducts";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

export default function Homepage() {
    const navigate = useNavigate();

    const [aboutUsHovered, setAboutUsHovered] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="hidden sm:block">
                {/* Navbar : MAKE RESPONSIVE */}
                <Navbar />
            </div>

            <div className="sm:flex">
                <img src="/homepageImg.jpg" className="w-full sm:w-1/2 h-52 sm:h-72 object-cover" alt="figure 1" />
                <div className="flex flex-col gap-2 items-center justify-center bg-gray-200 w-full sm:w-1/2 p-5 sm:p-12">
                    <p className="font-saira text-lg sm:text-2xl tracking-wider sm:tracking-widest w-full ">EXQUISITE GEMSTONES & FINE JEWELLERY COLLECTION</p>
                    <p className="font-montserrat text-sm sm:text-lg tracking-widest font-extralight text-gray-600">Dive into the world of precious gemstones and jewellery & discover the timeless beauty and elegance of precious gemstones at Pearl Island. </p>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center p-10">
                <p className="font-saira text-3xl tracking-widest ">Our Exclusive Products</p>
                <FeaturedProducts />
            </div>

            <div className="flex">
                <img src="/profilePic.jpg" className="w-8/12 h-72 object-cover" alt="figure 1" />
                <div className="flex gap-2 flex-col items-center justify-center bg-gray-200 w-full" onMouseEnter={() => setAboutUsHovered(true)} onMouseLeave={() => setAboutUsHovered(false)}>
                    <p className="font-saira text-2xl tracking-wider leading-relaxed capitalize w-4/5">ABOUT US</p>
                    <p className="font-montserrat text-lg tracking-wider font-light text-gray-600 w-4/5">At Pearl Island Gem & Jewelry, we specialize in sourcing and offering premium-quality gemstones and bespoke jewellery. With a focus on craftsmanship and attention to detail, we bring timeless elegance to every piece.</p>
                    <p className={`font-saira text-lg text-gray-600 transition duration-300 w-4/5 hover:cursor-pointer ${aboutUsHovered ? 'text-black' : 'text-transparent'}`} onClick={() => navigate('/aboutUs')}>READ MORE &rarr;</p>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center p-10">
                <p className="font-saira text-3xl tracking-widest ">Our Collections</p>

            </div>

            <div className="flex flex-col justify-center items-center p-10">
                <p className="font-saira text-3xl tracking-widest ">Pearl Island Services</p>

            </div>
            <Footer />
        </div>
    )
};
