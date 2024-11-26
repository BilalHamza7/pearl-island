import { useRef, useState } from "react";

export default function ProductCard({ prod, openModal }) {

    const [isHovered, setIsHovered] = useState(false);

    //new
    const sourceRef = useRef(null);
    const targetRef = useRef(null);
    const containerRef = useRef(null);

    const [opacity, setOpacity] = useState(0);
    const [offset, setOffset] = useState({ left: 0, top: 0 });

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const handleMouseMove = (e) => {
        const targetRect = targetRef.current.getBoundingClientRect();
        const sourceRect = sourceRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
        const yRatio = (targetRect.height - containerRect.height) / sourceRect.height;

        const left = e.pageX - sourceRect.left;
        const top = e.pageY - sourceRect.top;

        setOffset({
            left: (left * -xRatio) + 110,
            top: (top * -yRatio) + 310
        });
    }

    return (
        <div className="w-full bg-white transition duration-300 rounded-lg " onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* <div
                className="relative overflow-hidden block w-full h-64 rounded-lg shadow-white"
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <img
                    ref={sourceRef}
                    alt="source"
                    src={prod.images[0]}
                    className="w-full h-full object-cover"
                />
                <img
                    ref={targetRef}
                    alt="zoomed"
                    src={prod.images[0]}
                    style={{
                        position: 'absolute',
                        left: `${offset.left}px`,
                        top: `${offset.top}px`,
                        opacity: opacity,
                        transform: `scale(2)`,
                        pointerEvents: 'none',
                        transition: 'opacity 0.2s',
                    }}
                    className="w-full h-full object-cover rounded"
                />
            </div> */}
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
