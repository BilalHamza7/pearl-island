import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="flex flex-col justify-start items-start gap-14 p-10 bg-black w-full h-full">
            <div className="flex gap-28">
                <div className="flex flex-col gap-5 text-white ">
                    <p className="text-2xl tracking-wide font-saira text-white">Quick Links</p>
                    <Link to='/' className="text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 "> {/**IBM Plex Serif Font */}
                        Home
                    </Link>
                    <Link to='/products' className="text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 ">
                        Our Products
                    </Link>
                    <Link to='/aboutUs' className="text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 ">
                        About Us
                    </Link>
                    <Link to='contactUs' className="text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 ">
                        Contact Us
                    </Link>
                </div>

                <div className="flex flex-col gap-5 text-white ">
                    <p className="text-2xl tracking-wide font-saira text-white">Connect With Us On</p>
                    <a href="/" className="flex gap-2 items-center w-fit text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 ">
                        <img src="/instaWhiteOutlined.png" alt="instagram" className="w-7" />
                        Instagram
                    </a>
                    <a href="/" className="flex gap-2 items-center w-fit text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 ">
                        <img src="/whatsAppWhiteOutlined.png" alt="whatsApp" className="w-7" />
                        WhatsApp
                    </a>
                    <a href="/" className="flex gap-2 items-center w-fit text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 ">
                        <img src="/facebookWhiteOulined.png" alt="facebook" className="w-7" />
                        Facebook
                    </a>
                    <a href="/" className="flex gap-2 items-center w-fit text-lg font-light font-montserrat tracking-wide hover:text-gray-400 transition duration-300 ">
                        <img src="/etsyWhiteOutlined.png" alt="etsy" className="w-7" />
                        Etsy
                    </a>
                </div>

                <div className="flex flex-col gap-5 text-white ">
                    <p className="text-2xl tracking-wide font-saira text-white">Contact Information</p>
                    <p className="text-lg font-light font-montserrat tracking-wide">
                        Email: <span className="italic"> pearlislandgnj@gmail.com</span>
                    </p>
                    <p className="text-lg font-light font-montserrat tracking-wide">
                        Phone: <span className="italic"> +94 77 758 9188 </span>
                    </p>
                    <p className="text-lg font-light font-montserrat tracking-wide">
                        Address: <span className="italic"> 92/3, Sally Hajiar Mawatha, Chinafort, <br></br> Beruwala (12070), Sri Lanka.</span>
                    </p>
                </div>
            </div>

            <div className="flex gap-20 w-full justify-center text-9xl text-white font-cormorant font-extralight tracking-wider"> {/**Cormorant Font */}
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

            <div className="w-full flex items-center justify-center text-white font-montserrat font-light">
                <p>&#169; All Rights Reserved - Pearl Island</p>
            </div>
        </div>
    )
};
