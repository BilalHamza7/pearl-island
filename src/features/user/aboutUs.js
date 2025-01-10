
export default function AboutUs() {
    return (
        <>
            <div className="sm:flex">
                <img src="/aboutusimg.jpg" loading="lazy" className="w-full sm:w-1/2 h-52 sm:h-72 object-center " alt="figure 1" />
                <div className="flex flex-col gap-2 items-center justify-center bg-gray-200 w-full sm:w-1/2 p-5 sm:p-12">
                    <p className="font-saira text-lg sm:text-2xl tracking-wider sm:tracking-widest w-full ">WHO WE ARE</p>
                    <p className="font-montserrat text-sm sm:text-lg tracking-widest font-light text-gray-600">We specialize in crafting exquisite pieces that celebrate the natural beauty of gemstones. With a commitment to quality and artistry, we take pride in our rich heritage and expertise in this timeless industry.</p>
                </div>
            </div>
            <div className="min-h-screen flex flex-col items-center gap-y-14 py-10 overflow-hidden">
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
                    <div className="flex items-center justify-center gap-16 w-full font-light bg-gray-200 p-5 tracking-wider [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_div]:text-center">
                        <div className="">
                            <img src="/establishedIcon.png" alt="gem" className="h-20" />
                            <p className="font-semibold font-montserrat text-xl mt-5">Established</p>
                            <p className="font-saira text-lg">Years of industry expertise and reliability.</p>
                        </div>
                        <div className="">
                            <img src="/qualityIcon.png" alt="gem" className="h-20" />
                            <p className="font-semibold font-montserrat text-xl mt-5">Trusted Quality</p>
                            <p className="font-saira text-lg">Elite products, expertly crafted for lasting value</p>
                        </div>
                        <div className="">
                            <img src="/designIcon.png" alt="gem" className="h-20" />
                            <p className="font-semibold font-montserrat text-xl mt-5">Designs</p>
                            <p className="font-saira text-lg">Unique, elegant styles tailored to your preferences</p>
                        </div>
                        <div className="">
                            <img src="/pricingIcon.png" alt="gem" className="h-20" />
                            <p className="font-semibold font-montserrat text-xl mt-5">Pricing</p>
                            <p className="font-saira text-lg">Competitive rates without compromising quality</p>
                        </div>
                    </div>
                </div>

                {/* A auto horizontally scrolling banner */}
                <div className="flex gap-10 [&_img]:w-48 animate-infinite-scroll">
                    <img src="/gem1.jpg" alt="gem1" />
                    <img src="/gem2.jpg" alt="gem2" />
                    <img src="/gem3.jpg" alt="gem3" />
                    <img src="/gem4.jpg" alt="gem4" />
                    <img src="/gem7.jpg" alt="gem7" />
                    <img src="/gem8.jpg" alt="gem8" />
                    <img src="/garnet.jpg" alt="garnet" />
                    <img src="/alex.jpg" alt="alex" />
                    <img src="/ruby.jpg" alt="ruby" />
                    {/* duplicate */}
                    <img src="/gem1.jpg" alt="gem1" />
                    <img src="/gem2.jpg" alt="gem2" />
                    <img src="/gem3.jpg" alt="gem3" />
                    <img src="/gem4.jpg" alt="gem4" />
                    <img src="/gem7.jpg" alt="gem7" />
                    <img src="/gem8.jpg" alt="gem8" />
                    <img src="/garnet.jpg" alt="garnet" />
                    <img src="/alex.jpg" alt="alex" />
                    <img src="/ruby.jpg" alt="ruby" />
                </div>


                <div className="flex flex-col items-center gap-7 px-10">
                    <p className="title_text">Our Story</p>
                    <p className="subtitle_text w-8/12">
                        At Pearl Island, our journey began with a simple vision: to bring timeless beauty and exceptional craftsmanship to the world. Inspired by a passion for [your products/services], we dedicated ourselves to creating pieces that reflect elegance, quality, and individuality. From humble beginnings, we’ve grown into a trusted name, cherished by customers who value authenticity and excellence. Every product we offer tells a story—one of creativity, dedication, and a commitment to making dreams a reality. Join us on this journey and become a part of our story as we continue to craft timeless treasures for generations to come.</p>
                </div>
            </div>
        </>
    )
};
