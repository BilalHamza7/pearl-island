import { useState } from "react";

export default function ReqRespond({ isOpen, onClose, products, request }) {

    const [hoveredGem, setHoveredGem] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const singleProd = products[0];

    const showDetails = (gem, event) => {
        // Get the mouse position to position the popup
        const { clientX, clientY } = event;
        setPopupPosition({ top: clientY - 20, left: clientX });
        setHoveredGem(gem); // Set the gem details
    };

    const hideDetails = () => {
        setHoveredGem(null); // Hide the popup when not hovering
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0">
                <div className="flex flex-col items-center p-10 w-full h-full bg-white">

                    <div className="flex w-full z-10">
                        <p className="text-center w-full title_text">CUSTOMER PRICE REQUEST</p>
                        <button className="w-fit flex justify-end" onClick={onClose}>
                            <img src="/close.png" className="w-7 h-7" />
                        </button>
                    </div>

                    <div className="flex w-full h-fit mt-20 justify-center  ">
                        <div className="flex flex-col items-start gap-5 w-full">
                            <p className="input_label z-10">Gemstone Details:</p>

                            <div className="flex w-full gap-16">
                                <div className="flex flex-col gap-3">
                                    {/** Multiple Gem Request */}
                                    {request.gemstoneId.length > 1 ? (
                                        request.gemstoneId.map((ids, index) => (
                                            <p
                                                key={ids}
                                                onMouseOver={(e) => showDetails(products[index], e)}
                                                onMouseLeave={hideDetails}
                                                className="font-saira w-fit text-2xl my-2 underline z-10"
                                            >
                                                {products[index].name} {ids}
                                            </p>
                                        ))
                                    ) : (
                                        <>
                                            <img src={singleProd.images[0]} className="w-5/12 absolute top-14 left-96 opacity-55 z-0" />
                                            <p className="font-saira text-2xl ">{singleProd.name} {singleProd.productId}</p>
                                            <div className="flex gap-10 z-10">
                                                <div className="flex flex-col gap-5 input_label">
                                                    <p>Kind: <span className="font-montserrat font-light text-xl">{singleProd.kind}</span></p>
                                                    <p>Weight: <span className="font-montserrat font-light text-xl">{singleProd.weight} Carat</span></p>
                                                    <p>Colour: <span className="font-montserrat font-light text-xl">{singleProd.colour}</span></p>
                                                    <p>Size (mm): <span className="font-montserrat font-light text-xl">{singleProd.size} mm</span></p>
                                                    <p>Cut: <span className="font-montserrat font-light text-xl">{singleProd.cut}</span></p>
                                                </div>
                                                <div className="flex flex-col gap-5 input_label">
                                                    <p>Origin: <span className="font-montserrat font-light text-xl">{singleProd.origin}</span></p>
                                                    <p>Shape: <span className="font-montserrat font-light text-xl">{singleProd.shape}</span></p>
                                                    <p>Treatment: <span className="font-montserrat font-light text-xl">{singleProd.treatment}</span></p>
                                                    <p>Clarity: <span className="font-montserrat font-light text-xl">{singleProd.clarity}</span></p>
                                                    <p>Certificate: <span className="font-montserrat font-light text-xl">{singleProd.certificate ? 'Available' : 'N/A'}</span></p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {hoveredGem && (
                                        <div
                                            className="absolute bg-white shadow-md border p-4 rounded z-20"
                                            style={{ top: popupPosition.top, left: popupPosition.left, transform: 'translate(-50%, -100%)' }}
                                        >
                                            <img src={hoveredGem.images[0]} className="w-48 absolute left-20 opacity-55  " />
                                            <div className="relative z-50">
                                                <p className="font-saira text-xl">{hoveredGem.name} {hoveredGem.productId}</p>
                                                <div className="flex gap-5 z-50">
                                                    <div className="flex flex-col gap-2">
                                                        <p>Kind: <span className="font-montserrat font-light text-sm">{hoveredGem.kind}</span></p>
                                                        <p>Weight: <span className="font-montserrat font-light text-sm">{hoveredGem.weight} Carat</span></p>
                                                        <p>Colour: <span className="font-montserrat font-light text-sm">{hoveredGem.colour}</span></p>
                                                        <p>Size (mm): <span className="font-montserrat font-light text-sm">{hoveredGem.size} mm</span></p>
                                                        <p>Cut: <span className="font-montserrat font-light text-sm">{hoveredGem.cut}</span></p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 ">
                                                        <p>Origin: <span className="font-montserrat font-light text-sm">{hoveredGem.origin}</span></p>
                                                        <p>Shape: <span className="font-montserrat font-light text-sm">{hoveredGem.shape}</span></p>
                                                        <p>Treatment: <span className="font-montserrat font-light text-sm">{hoveredGem.treatment}</span></p>
                                                        <p>Clarity: <span className="font-montserrat font-light text-sm">{hoveredGem.clarity}</span></p>
                                                        <p>Certificate: <span className="font-montserrat font-light text-sm">{hoveredGem.certificate ? 'Available' : 'N/A'}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 w-full z-10">
                            <p className="input_label">Request Details:</p>
                            <div className="flex w-full gap-16">
                                <div className="flex flex-col gap-5 input_label">
                                    <p className="flex flex-col gap-3">Full Name: <span className="font-montserrat font-light text-xl">{request.fullName}</span></p>
                                    <p className="flex flex-col gap-3">Email: <span className="font-montserrat font-light text-xl">{request.email}</span></p>
                                    <p className="flex flex-col gap-3">Mobile Number: <span className="font-montserrat font-light text-xl">{request.mobileNumber}</span></p>
                                </div>
                                <div className="flex flex-col gap-5 input_label">
                                    <p className="flex flex-col gap-3">Company Name: <span className="font-montserrat font-light text-xl">{request.companyName}</span></p>
                                    <p className="flex flex-col gap-3">Message: <span className="font-montserrat font-light text-xl">{request.message}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`z-10 text-center text-xl font-montserrat tracking-widest mt-12 p-3 rounded-lg font-medium ${request.responded ? 'bg-green-300' : 'bg-red-300'}`}>
                        <p>{request.responded ? 'Responded' : 'Not Responded'}</p>
                    </div>
                    <button className="z-10 flex justify-center mt-4 button_style ">
                        Respond
                    </button>
                </div>
            </div>
        </>
    )
}