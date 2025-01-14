import { useEffect, useState } from "react"
import ProductPics from "./productPics";
import ImageViewer from "../../components/imageViewer";
import { useNavigate } from "react-router-dom";

export default function ProductRequest({ isOpen, onClose, product }) {

    const navigate = useNavigate();

    const [activeImage, setActiveImage] = useState();

    const [isSeeMoreHovered, setIsSeeMoreHovered] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    console.log(product);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-50 overflow">
                <div className="flex flex-col gap-5 p-10 w-full h-full overflow-y-scroll bg-white">
                    <p className="text-xl w-full text-left font-montserrat hover:text-gray-600 transition duration-300 cursor-pointer " onClick={onClose}>&larr; Product List</p>
                    <div className="flex justify-between gap-10 w-full h-fit">
                        <ProductPics product={product} isSeeMoreHovered={isSeeMoreHovered} handleSeeMoreHovered={() => setIsSeeMoreHovered(!isSeeMoreHovered)} openModal={openModal} />
                        <ImageViewer isOpen={isModalOpen} onClose={closeModal} images={product.images} certificate={product.certificate ? product.certificate : null} />

                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex gap-5 items-center font-montserrat text-xl">
                                <p className="title_text">{product.name}</p>
                                <p className="title_text">ID: {product.productId}</p>
                            </div>
                            <p className="text-lg leading-tight tracking-wider font-light font-montserrat">{product.summary}</p>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-5">
                                    <p className="font-saira text-2xl tracking-wider">Details</p>
                                    <div className="flex w-full gap-10">
                                        <div className="flex flex-col gap-6 w-full">
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Kind:<span className="font-montserrat font-light">{product.kind}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Weight:<span className="font-montserrat font-light">{product.weight}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Colour:<span className="font-montserrat font-light">{product.colour}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Size (mm):<span className="font-montserrat font-light">{product.size}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Cut:<span className="font-montserrat font-light">{product.cut}</span></p>
                                        </div>
                                        <div className="flex flex-col gap-6 w-full">
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Origin:<span className="font-montserrat font-light">{product.kind}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Shape:<span className="font-montserrat font-light">{product.weight}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Treatment:<span className="font-montserrat font-light">{product.colour}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Clarity:<span className="font-montserrat font-light">{product.size}</span></p>
                                            <p className="flex gap-2 font-saira text-xl tracking-wider">Certificate:<span className="font-montserrat font-light">{product.cut}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex w-full gap-10 mt-5 `}>
                                    <button className="button_style w-full" onClick={() => navigate('/manageProduct')}>Cancel</button>
                                    <button className="button_style w-full">Request Price</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
};
