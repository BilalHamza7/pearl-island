import { useEffect, useState } from 'react';

export default function ProductPics({ product, isSeeMoreHovered, handleSeeMoreHovered, openModal }) {

    const [activeImage, setActiveImage] = useState();

    useEffect(() => {
        if (product.images.length > 0) {
            setActiveImage(product.images[0]);
        }
    }, [product]);

    return (
        <div className="flex flex-col gap-5 items-center w-[1200px] h-[575px] ">{/*Remove div when using for customer display */}
            <div className="flex justify-between w-full h-[550px]  ">
                <img src={activeImage ? activeImage : '/addImage.jpg'} alt='initial file' className="w-[460px] h-[523px] object-fill" />
                <div className="flex flex-col w-32 gap-3 justify-between items-center">
                    <img src={product.images[0] ? product.images[0] : '/addImage.jpg'} alt='file' className="w-32 h-32 cursor-pointer transition duration-500 hover:scale-110" onClick={() => setActiveImage(product.images[0])} />
                    <img src={product.images[1] ? product.images[1] : '/addImage.jpg'} alt='file' className="w-32 h-32 cursor-pointer transition duration-500 hover:scale-110" onClick={() => setActiveImage(product.images[1])} />
                    <img src={product.images[2] ? product.images[2] : '/addImage.jpg'} alt='file' className="w-32 h-32 cursor-pointer transition duration-500 hover:scale-110" onClick={() => setActiveImage(product.images[2])} />
                    <button
                        className="flex items-center justify-center text-xs font-saira text-center w-28 h-24 hover:scale-110 transition duration-500 relative bg-cover bg-center overflow-hidden"
                        onMouseEnter={() => handleSeeMoreHovered}
                        onMouseLeave={() => handleSeeMoreHovered}
                        onClick={openModal}
                        title="See More Images"
                        style={{ backgroundImage: `url(${product.images[3] ? product.images[3] : '/addImage.jpg'})` }}
                    >
                        <img
                            src={isSeeMoreHovered ? "/seemoreFilled.png" : "/seemoreOutlined.png"}
                            alt="Icon"
                            className="w-12"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
};
