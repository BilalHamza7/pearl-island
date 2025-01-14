import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./components/productsList";
import ProductRequest from "./components/productRequest";

export default function Products() {

    const navigate = useNavigate();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const closeModal = () => setIsEditModalOpen(false);
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <div className="sm:flex">
                <img src="/productsimg.jpg" loading="lazy" className="w-full sm:w-1/2 h-52 sm:h-72 object-cover" alt="figure 1" />
                <div className="flex flex-col gap-2 items-center justify-center bg-gray-200 w-full sm:w-1/2 p-5 sm:p-12">
                    <p className="font-saira text-lg sm:text-2xl tracking-wider sm:tracking-widest w-full ">EXQUISITE CRAFTSMANSHIP, UNMATCHED ELEGANCE</p>
                    <p className="font-montserrat text-sm sm:text-lg tracking-widest font-light text-gray-600">Explore our collection of handpicked gemstones and finely crafted jewelry. Each piece is a reflection of timeless beauty, created with precision and care.</p>
                </div>
            </div>
            <div className="flex flex-col items-center min-h-screen p-10 gap-7">

                <ProductList openModal={openModal} />
                
                <div className="flex flex-col w-full items-center gap-4">
                    <p className="title_text">Cannot Find What Your Looking For?</p>
                    <p className="subtitle_text w-9/12">We are here to help! Reach out to us for personalized assistance or to inquire about custom order -  We will work with your to create the perfect piece as per your needs!</p>
                    <button className="button_style" onClick={() => navigate('/contactUs')}>Contact Us!</button>
                </div>

                {selectedProduct !== null && <ProductRequest isOpen={isEditModalOpen} onClose={closeModal} product={selectedProduct} />}

            </div >
        </>
    )
};
