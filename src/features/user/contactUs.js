import { useNavigate } from "react-router-dom";
import FaqList from "./components/faqList";

export default function ContactUs() {

    const navigate = useNavigate();

    return (
        <>
            <div className="sm:flex">
                <img src="/contactusimg.jpg" loading="lazy" className="w-full sm:w-1/2 h-52 sm:h-72 object-fill" alt="figure 1" />
                <div className="flex flex-col gap-2 items-center justify-center bg-gray-200 w-full sm:w-1/2 p-5 sm:p-12">
                    <p className="font-saira text-lg sm:text-2xl tracking-wider sm:tracking-widest w-full ">GET IN TOUCH WITH US</p>
                    <p className="font-montserrat text-sm sm:text-lg tracking-widest font-extralight text-gray-600">We here at Pearl Island would be delighted to assist you with inquiries, special requests, custom orders and more. Reach out to us via the form below, and we’ll respond promptly to help you with your needs.</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-10 gap-y-14">
                <form action="" className="flex flex-col items-center gap-7 w-6/12">
                    <div className="flex flex-col items-center gap-4">
                        <p className="title_text">Get In Touch!</p>
                        <p className="subtitle_text">Fill out the form and we'll get right back to you.</p>
                    </div>
                    <div className="flex w-full justify-between gap-20">
                        <label htmlFor="" className="flex flex-col w-full gap-1 input_label">
                            Full Name:
                            <input type="text" className="input_style" placeholder="John Smith" />
                        </label>
                        <label className="flex flex-col w-full gap-1 input_label">
                            Company Name:
                            <input type="text" className="input_style" />
                        </label>
                    </div>
                    <div className="flex w-full justify-between gap-20">
                        <label htmlFor="" className="flex flex-col w-full gap-1 input_label">
                            Email:
                            <input type="text" className="input_style" placeholder="ABC Limited" />
                        </label>
                        <label className="flex flex-col w-full gap-1 input_label">
                            Mobile Number:
                            <input type="text" className="input_style" placeholder="+94 077 123 4567" />
                        </label>
                    </div>
                    <div className="flex justify-between w-full gap-20">
                        <div className="flex flex-col gap-1 w-full">
                            <p className="input_label">Subject:</p>
                            <label className="flex gap-2 items-center font-montserrat text-lg hover:cursor-pointer">
                                <input type="radio" id="Cusom Order" value="Custom Order" name="subject" />
                                Custom Order
                            </label>
                            <label className="flex gap-2 items-center font-montserrat text-lg hover:cursor-pointer">
                                <input type="radio" id="Inquiry" value="Inquiry" name="subject" />
                                Inquiry
                            </label>
                            <label className="flex gap-2 items-center font-montserrat text-lg hover:cursor-pointer">
                                <input type="radio" id="Suggestion" value="Suggestion" name="subject" />
                                Suggestion
                            </label>
                            <label className="flex gap-2 items-center font-montserrat text-lg hover:cursor-pointer">
                                <input type="radio" id="Complaint" value="Complaint" name="subject" />
                                Complaint
                            </label>
                        </div>
                        <label htmlFor="" className="flex flex-col w-full gap-1 input_label">
                            Your Message:
                            <textarea className="input_style resize-none" rows={4} placeholder="Your Message" />
                        </label>
                    </div>
                    <button className="button_style w-96">Send Message</button>
                    <p className="subtitle_text">Thank You For Reaching Out! We'll Be In Contact With You Promptly.</p>
                </form>

                {/* Socials */}
                <div className="flex flex-col gap-10 items-center justify-between">
                    <p className="title_text">Connect With Us On</p>
                    <div className="flex gap-36 justify-center items-center w-full">
                        <label htmlFor="" className="flex items-center gap-2 font-montserrat text-3xl tracking-wider cursor-pointer rounded-lg hover:bg-gray-200 transition duration-500">
                            <img src="/instaColoured.png" loading="lazy" alt="instagram" className="w-20" />
                            Instagram
                        </label>
                        <label htmlFor="" className="flex items-center gap-2 font-montserrat text-3xl tracking-wider cursor-pointer rounded-lg hover:bg-gray-200 transition duration-500">
                            <img src="facebookColour.png" loading="lazy" alt="facebook" className="w-20" />
                            Facebook
                        </label>
                    </div>
                    <div className="flex gap-36 justify-center items-center w-full">
                        <label htmlFor="" className="flex items-center gap-2 font-montserrat text-3xl tracking-wider cursor-pointer rounded-lg hover:bg-gray-200 transition duration-500">
                            <img src="/etsyColour.png" loading="lazy" alt="etsy" className="w-20" />
                            ETSY
                        </label>
                        <label htmlFor="" className="flex items-center gap-2 font-montserrat text-3xl tracking-wider cursor-pointer rounded-lg hover:bg-gray-200 transition duration-500">
                            <img src="whatsAppColour.png" loading="lazy" alt="whatsapp" className="w-20" />
                            WhatsApp
                        </label>
                    </div>
                </div>

                {/* FAQs */}
                <div className="flex flex-col gap-7 items-center w-full">
                    <p className="title_text" id="faq">Frequently Asked Questions</p>
                    <FaqList />
                </div>

                <div className="flex flex-col gap-5 items-center">
                    <p className="subtitle_text">Not Ready To Reach Out? Continue Shopping And Explore Our Full Range Of Products.</p>
                    <button className="button_style w-96" onClick={() => navigate('/products')}>Explore Products</button>
                </div>
            </div >
        </>
    )
};
