import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

export default function ProductCard({ prod, openModal }) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full bg-white transition duration-300 hover:drop-shadow-xl" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

            <ReactImageMagnify
                {...{
                    smallImage: {
                        alt: 'Main Image',
                        isFluidWidth: true,
                        src: prod.images[0],
                    },
                    largeImage: {
                        src: prod.images[0],
                        width: 236,
                        height: 570,
                    },
                    enlargedImagePosition: 'over',
                }}

            />

            <div className="p-2 input_label flex flex-col items-center gap-3">
                <p className="input_label text-center">
                    {prod.name}
                </p>
                <p className="font-montserrat font-light text-lg">
                    {prod.weight} Cts
                </p>

                {/* navigate to editProduct page with the prod object */}
                <button onClick={() => openModal(prod)} className={`button_style ${!isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    VIEW MORE
                </button>
            </div>
        </div>
    )
};
