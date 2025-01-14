import { useEffect, useRef, useState } from "react";

export default function ImageViewer({ isOpen, onClose, images, certificate }) {

    const [source, setSource] = useState();

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
            left: (left * -xRatio) + 130,
            top: (top * -yRatio) + 180
        });
    }

    useEffect(() => {
        if (images.length > 0) {
            setSource(images[0]);
        }
        else if (certificate !== null) {
            setSource(certificate);
        }
    }, [images, certificate]);


    if (!isOpen) return null;

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-screen z-50">
            <div className="px-10 h-screen bg-white">
                <div className="flex justify-end w-full">
                    <button className="pt-10" onClick={onClose}>
                        <img src="/close.png" alt="close" className="w-7 h-7" />
                    </button>
                </div>
                {images.length > 0 &&
                    <div className="flex justify-center h-fit">
                        <div
                            className="relative overflow-hidden block w-[420px] h-[420px]"
                            ref={containerRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                        >
                            <img
                                ref={sourceRef}
                                alt="source"
                                src={source}
                                className="w-full h-full object-fill"
                            />
                            <img
                                ref={targetRef}
                                alt="zoomed"
                                src={source}
                                style={{
                                    position: 'absolute',
                                    left: `${offset.left}px`,
                                    top: `${offset.top}px`,
                                    opacity: opacity,
                                    transform: `scale(1.6)`,
                                    pointerEvents: 'none',
                                    transition: 'opacity 0.3s',
                                }}
                                className="w-full h-full object-fill"
                            />
                        </div>
                    </div>
                }
                {images.length > 0 ? (
                    <div className="absolute left-0 right-0 bottom-3 w-full flex items-center justify-center gap-3 z-20  ">
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Selected ${index}`} onClick={() => setSource(image)} className="w-36 h-36 object-cover cursor-pointer hover:opacity-75 border border-transparent hover:border-black transition duration-300" />
                        ))}
                        {certificate &&
                            <img src={certificate} alt={'certificate'} onClick={() => setSource(certificate)} className="w-36 h-36 object-cover cursor-pointer hover:opacity-75 border border-transparent hover:border-black transition duration-300" />
                        }
                    </div>
                ) : (
                    <p className="title_text h-full flex justify-center items-center">No images selected</p>
                )}
            </div>
        </div>
    );
};
