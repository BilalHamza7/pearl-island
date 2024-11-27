import { useRef, useState } from "react";

export default function ProductCard({ prod, openModal }) {

    const [isHovered, setIsHovered] = useState(false);

    

    return (
        <div className="w-full bg-white transition duration-300 rounded-lg " onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            
            <div className="relative h-52 overflow-clip">
                <img
                    alt="source"
                    src={prod.images[0]}
                    className={`w-full h-full relative object-cover transition duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
                {(isHovered && prod.soldStatus) &&
                    <div className="absolute bottom-3 right-3  border border-red-500 p-1 rounded z-10">
                        <p className="font-montserrat text-red-500 tracking-wider">SOLD</p>
                    </div>
                }
            </div>

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
        </div >
    )
};
