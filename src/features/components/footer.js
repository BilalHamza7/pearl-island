import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="flex justify-start items-center gap-28 p-10 bg-black w-full h-96">
            <div className="flex flex-col gap-5 text-white ">
                <p className="text-3xl tracking-wide font-saira text-gray-300">Quick Links</p>
                <Link to='/' className="text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 "> {/**IBM Plex Serif Font */}
                    Home
                </Link>
                <Link to='/products' className="text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 ">
                    Our Products
                </Link>
                <Link to='/aboutUs' className="text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 ">
                    About Us
                </Link>
                <Link to='contactUs' className="text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 ">
                    Contact Us
                </Link>
            </div>
            <div className="flex flex-col gap-5 text-white ">
                <p className="text-3xl tracking-wide font-saira text-gray-300">Connect With Us On</p>
                <a href="" className="flex gap-2 items-center text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 ">
                    <img src="/instaWhiteOutlined.png" alt="instagram" className="w-7" />
                    Instagram
                </a>
                <a href="" className="flex gap-2 items-center text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 ">
                    <img src="/whatsAppWhiteOutlined.png" alt="whatsApp" className="w-7" />
                    WhatsApp
                </a>
                <a href="" className="flex gap-2 items-center text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 ">
                    <img src="/facebookWhiteOulined.png" alt="facebook" className="w-7" />
                    Facebook
                </a>
                <a href="" className="flex gap-2 items-center text-2xl font-ibmplexserif tracking-wide hover:text-gray-400 transition duration-300 ">
                    <img src="/etsyWhiteOutlined.png" alt="etsy" className="w-7" />
                    Etsy
                </a>
            </div>
            <div className="text-8xl text-white font-cormorant font-extralight tracking-widest leading-snug "> {/**Cormorant Font */}
                <div className="flex gap-10">
                    <p>P</p>
                    <p>E</p>
                    <p>A</p>
                    <p>R</p>
                    <p>L</p>
                </div>
                <div className="flex gap-10">
                    <p>I</p>
                    <p>S</p>
                    <p>L</p>
                    <p>A</p>
                    <p>N</p>
                    <p>D</p>
                </div>
            </div>
        </div>
    )
};
