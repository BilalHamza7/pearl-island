import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

export default function ProductCard({ source }) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full bg-white transition duration-300 hover:drop-shadow-xl" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <ReactImageMagnify
                {...{
                    smallImage: {
                        alt: 'Main Image',
                        isFluidWidth: true,
                        src: source,
                    },
                    largeImage: {
                        src: source,
                        width: 236,
                        height: 570,
                    },
                    enlargedImagePosition: 'over',
                }}

            />

            <div className="p-2 input_label flex flex-col items-center gap-3">
                <p className="input_label">
                    Natural Blue Sapphire
                </p>
                <p className="font-montserrat font-light text-lg">
                    2.75 cts
                </p>

                <button className={`button_style ${!isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    VIEW MORE
                </button>
            </div>
        </div>
    )
};
