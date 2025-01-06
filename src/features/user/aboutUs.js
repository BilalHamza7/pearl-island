
export default function AboutUs() {
    return (
        <>
            <div className="sm:flex">
                <img src="/aboutusimg.jpg" className="w-full sm:w-1/2 h-52 sm:h-72 object-center " alt="figure 1" />
                <div className="flex flex-col gap-2 items-center justify-center bg-gray-200 w-full sm:w-1/2 p-5 sm:p-12">
                    <p className="font-saira text-lg sm:text-2xl tracking-wider sm:tracking-widest w-full ">WHO WE ARE</p>
                    <p className="font-montserrat text-sm sm:text-lg tracking-widest font-extralight text-gray-600">We specialize in crafting exquisite pieces that celebrate the natural beauty of gemstones. With a commitment to quality and artistry, we take pride in our rich heritage and expertise in this timeless industry.</p>
                </div>
            </div>
            <div className="min-h-screen flex flex-col items-center gap-y-14 py-10">
                <div className="flex gap-20 px-10">
                    <div className="flex flex-col gap-7 items-center">
                        <p className="title_text">Our Mission</p>
                        <p className="subtitle_text">
                            Our mission is to provide our clients with the finest gemstones and meticulously crafted jewelry that reflect both beauty and individuality. We believe in creating pieces that are not only visually stunning but also carry a personal story, becoming a cherished part of your life.
                        </p>
                    </div>
                    <div className="flex flex-col gap-7 items-center">
                        <p className="title_text">Our Vision</p>
                        <p className="subtitle_text">
                            We aspire to be a global leader in luxury gemstones and jewelry, known for our commitment to quality, ethical sourcing, and innovation. Our vision is to set new standards in the industry by consistently delivering exceptional products and experiences for our clients.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-y-7 w-full">
                    <p className="title_text">Why Choose Us</p>
                    <div className="flex items-center justify-center gap-16 w-full text-xl font-saira font-light bg-gray-200 p-5 tracking-wider">
                        <div className="flex flex-col items-center gap-3 ">
                            <i mg src="/shipped.png" alt="gem" className="h-20" />
                            <p >Complimentary Shipping</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 ">
                            <img src="/transaction.png" alt="gem" className="h-20" />
                            <p className="">Easy Return/Refund Policy</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 ">
                            <img src="/writing.png" alt="gem" className="h-20" />
                            <p >Personalized Orders</p>
                        </div>
                        <div className="flex flex-col items-center gap-3 ">
                            <img src="/certificate.png" alt="gem" className="h-20" />
                            <p >Certificate of Authenticity</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    {/* A auto horizontally scrolling banner */}
                </div>

                <div className="flex flex-col gap-7 items-center">
                    <p className="title_text">Our Story</p>
                    <p className="subtitle_text ">
                        Our mission is to provide our clients with the finest gemstones and meticulously crafted jewelry that reflect both beauty and individuality. We believe in creating pieces that are not only visually stunning but also carry a personal story, becoming a cherished part of your life.
                    </p>
                </div>
            </div>
        </>
    )
};
