import Footer from "../components/footer";
import Navbar from "./components/navbar";

export default function ContactUs() {
    return (
        <>
            <Navbar />
            {/* <div className="sm:flex">
                <img src="/contactusimg.jpg" className="w-full sm:w-1/2 h-52 sm:h-72 object-fill" alt="figure 1" />
                <div className="flex flex-col gap-2 items-center justify-center bg-gray-200 w-full sm:w-1/2 p-5 sm:p-12">
                    <p className="font-saira text-lg sm:text-2xl tracking-wider sm:tracking-widest w-full ">GET IN TOUCH WITH US</p>
                    <p className="font-montserrat text-sm sm:text-lg tracking-widest font-extralight text-gray-600">We here at Pearl Island would be delighted to assist you with inquiries, special requests, custom orders and more. Reach out to us via the form below, and we’ll respond promptly to help you with your needs.</p>
                </div>
            </div> */}

            <div className="flex flex-col items-center justify-center p-10 gap-y-5">
                <p className="title_text">We'd Love To Help!</p>
                <p className="subtitle_text">Fill out the form and we'll get right back to you.</p>
                <form action="" className="flex justify-between gap-20 w ">
                    <div className="flex flex-col gap-7">
                        <label htmlFor="" className="flex flex-col gap-1 input_label">
                            FullName:
                            <input type="text" className="input_style" placeholder="John Smith" />
                        </label>
                        <label className="flex flex-col gap-1 input_label">
                            Email:
                            <input type="text" className="input_style" placeholder="johnsmith@gmail.com" />
                        </label>
                        <div className="flex flex-col gap-1">
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
                    </div>
                    <div className="flex flex-col gap-7">
                        <label htmlFor="" className="flex flex-col gap-1 input_label">
                            Company Name:
                            <input type="text" className="input_style" placeholder="ABC Limited" />
                        </label>
                        <label className="flex flex-col gap-1 input_label">
                            Mobile Number:
                            <input type="text" className="input_style" placeholder="+94 077 123 4567" />
                        </label>
                        <label htmlFor="" className="flex flex-col gap-1 input_label">
                            Your Message:
                            <textarea className="input_style resize-none" rows={4} placeholder="Your Message" />
                        </label>
                    </div>
                </form>
                <button className="button_style">Send Message</button>
                <p className="subtitle_text">Thank You For Reaching Out! We'll Be In Contact With You Promptly.</p>

                <p className="title_text">Connect With Us</p>
                <div className="">
                    <label htmlFor="">
                        <img src="/instaColoured.png" alt="" />
                        Instagram
                    </label>
                    <label htmlFor="">
                        <img src="facebookColour.png" alt="" />
                        Facebook
                    </label>
                    <label htmlFor="">
                        <img src="/etsyColour.png" alt="" />
                        ETSY
                    </label>
                    <label htmlFor="">
                        <img src="whatsAppColour.png" alt="" />
                        WhatsApp
                    </label>
                </div>

                <div className="">
                    <p className="title_text" id="faq">Frequently Asked Questions</p>
                    <div className="grid grid-cols-2 justify-between">
                        <div className="">
                            <p>What is the origin of your gemstones?</p>
                            <p>Our gemstones are sourced from some of the finest locations worldwide, including Sri Lanka, Madagascar, and Myanmar. Each gemstone is ethically mined and carefully selected for its quality and authenticity.</p>
                        </div>
                        <div className="">
                            <p>How can I request the price of a gemstone?</p>
                            <p>If you're interested in a specific gemstone, simply click the "Request Price" button on the product page, and we'll get back to you with the price details.</p>
                        </div>
                        <div className="">
                            <p>What is your return policy for gemstones?</p>
                            <p>We offer an easy return and refund policy within 30 days of purchase, provided the gemstone is in its original condition. For further details, refer to our Return Policy section.</p>
                        </div>
                        <div className="">
                            <p>What is your return policy for gemstones?</p>
                            <p>We offer an easy return and refund policy within 30 days of purchase, provided the gemstone is in its original condition. For further details, refer to our Return Policy section.</p>
                        </div>
                        <div className="">
                            <p>Do you ship internationally?</p>
                            <p>Yes, we ship our gemstones to various countries worldwide. International shipping times and fees will vary based on your location.</p>
                        </div>
                        <div className="">
                            <p>How long does shipping take?</p>
                            <p>We offer complimentary shipping, and delivery typically takes 5-7 business days for domestic orders. For international shipping, delivery may take 10-14 business days, depending on your location.</p>
                        </div>
                    </div>

                    <p className="subtitle_text">Not Ready To Reach Out? Continue Shopping And Explore Our Full Range Of Products.</p>

                    <button className="button_style">Explore Products</button>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
};
