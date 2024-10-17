import { useEffect, useState } from "react";
import ReactImageMagnify from 'react-image-magnify';

export default function ProductImages({ isOpen, onClose, images }) {

    const [source, setSource] = useState();

    useEffect(() => {
        if (images.length > 0) {
            setSource(images[0]);
        }
    }, [images]);


    if (!isOpen) return null;

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
            <div className="flex flex-col items-center px-10 w-full h-full bg-white">

                <button className="flex flex-col items-end w-full pt-10" onClick={onClose}>
                    <img src="/close.png" className="w-7 h-7" />
                </button>

                <div className="flex flex-col h-full w-5/6 items-center">
                    <div className="w-3/6 h-4/6 flex justify-center items-center z-10">
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Main Image',
                                    isFluidWidth: true,
                                    src: source,
                                },
                                largeImage: {
                                    src: source,
                                    width: 1200, // Width of the zoomed image
                                    height: 1000, // Height of the zoomed image
                                },
                                enlargedImagePosition: 'over',
                                isHintEnabled: true,
                            }}
                            className="w-full h-full object-fill"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-3 h-fit w-full z-20 ">
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <img key={index} src={image} alt={`Selected ${index}`} onClick={() => setSource(image)} className="w-36 h-36 object-cover" />
                            ))
                        ) : (
                            <p className="title_text ">No images selected</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
