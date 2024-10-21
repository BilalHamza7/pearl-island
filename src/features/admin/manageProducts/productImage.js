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
            <div className="px-10 w-full h-full bg-white">

                <div className="flex justify-end w-full">
                    <button className="pt-10" onClick={onClose}>
                        <img src="/close.png" className="w-7 h-7" />
                    </button>
                </div>

                <div className="flex w-full justify-center">
                    <div className="w-2/6 object-contain">
                        {/* <img src={source} alt="source" className="relative cursor-none hover:image_hover_magnify" /> */}
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Main Image',
                                    isFluidWidth: true,
                                    src: source ,
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
                                } ,
                                isHintEnabled: true,
                            }}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 h-fit w-full z-20 ">
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <img key={index} src={image} alt={`Selected ${index}`} onClick={() => setSource(image)} className="w-36 h-36 object-cover cursor-pointer hover:opacity-75 transition duration-300" />
                        ))
                    ) : (
                        <p className="title_text ">No images selected</p>
                    )}
                </div>

                {/* <div className="flex flex-col h-full w-3/6 gap-44 items-center border border-red-600">
                    <div className="w-fit h-3/5 border border-green-500">
                        <div className="w-3/5 h-full border border-black z-10">

                        </div>
                    </div>

                    
                </div> */}
            </div>
        </div>
    );
};
