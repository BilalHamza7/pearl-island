import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="flex justify-start items-center gap-28 p-10 bg-black w-full h-96">
            <div className="flex flex-col gap-5 text-white ">
                <p className="text-3xl tracking-wide underline font-saira text-gray-400">Quick Links</p>
                <Link className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 "> {/**IBM Plex Serif Font */}
                    Home
                </Link>
                <Link className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 ">
                    Our Products
                </Link>
                <Link className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 ">
                    About Us
                </Link>
                <Link className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 ">
                    Contact Us
                </Link>
            </div>
            <div className="flex flex-col gap-5 text-white ">
                <p className="text-3xl tracking-wide underline font-saira text-gray-400">Connect With Us On</p>
                <a href="" className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 ">
                    <img />
                    Instagram
                </a>
                <a href="" className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 ">
                    <img />
                    WhatsApp
                </a>
                <a href="" className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 ">
                    <img />
                    Facebook
                </a>
                <a href="" className="text-2xl font-montserrat font-light hover:text-gray-500 transition duration-300 ">
                    <img />
                    Etsy
                </a>
            </div>
            <div className="text-8xl text-white font-saira font-extralight tracking-widest leading-snug "> {/**Cormorant Font */}
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
