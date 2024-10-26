import { useEffect, useState } from "react";
import ReactImageMagnify from 'react-image-magnify';

export default function ProductImages({ isOpen, onClose, images, certificate }) {

    const [source, setSource] = useState();

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
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
            <div className="px-10 w-full h-full bg-white">

                <div className="flex justify-end w-full">
                    <button className="pt-10" onClick={onClose}>
                        <img src="/close.png" className="w-7 h-7" />
                    </button>
                </div>

                <div className="flex w-full justify-center">
                    <div className="w-2/6 object-contain">
                        {(images.length > 0 || certificate !== null) && (
                            <ReactImageMagnify
                                {...{
                                    smallImage: {
                                        alt: 'Main Image',
                                        isFluidWidth: true,
                                        src: source,
                                    },
                                    largeImage: {
                                        src: source,
                                        width: 440,
                                        height: 1520,
                                    },
                                    enlargedImagePosition: 'over',
                                    enlargedImageContainerDimensions: {
                                        width: 440,
                                        height: 440
                                    },
                                    isHintEnabled: true,
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 h-fit w-full z-20  ">
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <img key={index} src={image} alt={`Selected ${index}`} onClick={() => setSource(image)} className="w-36 h-36 object-cover cursor-pointer hover:opacity-75 border border-transparent hover:border-black transition duration-300" />
                        ))
                    ) : (
                        <p className="title_text ">No images selected</p>
                    )}
                    {certificate &&
                        <img src={certificate} alt={'certificate'} onClick={() => setSource(certificate)} className="w-36 h-36 object-cover cursor-pointer hover:opacity-75 border border-transparent hover:border-black transition duration-300" />
                    }
                </div>
            </div>
        </div>
    );
};
