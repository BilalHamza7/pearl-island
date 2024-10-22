import { useEffect, useState } from "react";

export default function ReqRespond({ isOpen, onClose, respond, gemIds, setRespond }) {

    const gems = Array.isArray(gemIds) ? gemIds : [gemIds];

    const [hoveredGem, setHoveredGem] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

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

                    {gems.length === 0 && (
                        <img src="/gem1.jpg" className="w-5/12 absolute opacity-55 z-0 " />
                    )
                    } {/**Single Gem Request */}


                    <div className="flex w-full z-10">
                        <p className="text-center w-full title_text">CUSTOMER PRICE REQUEST</p>
                        <button className="w-fit flex justify-end" onClick={onClose}>
                            <img src="/close.png" className="w-7 h-7" />
                        </button>
                    </div>

                    <div className="flex w-full h-fit mt-20 justify-center  z-10">
                        <div className="flex flex-col items-start gap-5 w-full ">
                            <p className="input_label">Gemstone Details:</p>

                            <div className="flex w-full gap-16">

                                <div className="flex flex-col gap-3">
                                    {/** Multiple Gem Request */}
                                    {gems.length > 1 ? (
                                        gems.map((gem) => (
                                            <p
                                                key={gem}
                                                onMouseOver={(e) => showDetails(gem, e)}
                                                onMouseLeave={hideDetails}
                                                className="font-saira text-2xl my-2 underline">
                                                Natural Blue Sapphire {gem}
                                            </p>
                                        ))
                                    ) : (
                                        <>
                                            {/**Single Gem Request */}
                                            <p className="font-saira text-2xl">Natural Blue Sapphire {gems[0]}</p>
                                            <div className="flex gap-10">
                                                <div className="flex flex-col gap-5 input_label">
                                                    <p>Kind: <span className="font-montserrat font-light text-lg">Sapphire</span></p>
                                                    <p>Weight: <span className="font-montserrat font-light text-lg">2.75 Carat</span></p>
                                                    <p>Colour: <span className="font-montserrat font-light text-lg">Royal Blue</span></p>
                                                    <p>Size (mm): <span className="font-montserrat font-light text-lg">3.10 x 2.31 x 2.14</span></p>
                                                    <p>Cut: <span className="font-montserrat font-light text-lg">Princess Cut</span></p>
                                                </div>
                                                <div className="flex flex-col gap-5 input_label">
                                                    <p>Origin: <span className="font-montserrat font-light text-lg">Mozambique</span></p>
                                                    <p>Shape: <span className="font-montserrat font-light text-lg">Square</span></p>
                                                    <p>Treatment: <span className="font-montserrat font-light text-lg">Un-Heat</span></p>
                                                    <p>Clarity: <span className="font-montserrat font-light text-lg">Flawless</span></p>
                                                    <p>Certificate: <span className="font-montserrat font-light text-lg">View / N/A</span></p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {hoveredGem && (
                                        <div
                                            className="absolute bg-white shadow-md border p-4 rounded"
                                            style={{ top: popupPosition.top, left: popupPosition.left, transform: 'translate(-50%, -100%)' }}
                                        >
                                            <img src="/gemcopy.jpg" className="w-48 absolute left-20 opacity-55 z-0 " />
                                            <div className="relative z-50">
                                                <p className="font-saira text-lg">Natural Blue Sapphire {hoveredGem}</p>
                                                <div className="flex gap-5 z-50">
                                                    <div className="flex flex-col gap-2">
                                                        <p>Kind: <span className="font-montserrat font-light text-sm">Sapphire</span></p>
                                                        <p>Weight: <span className="font-montserrat font-light text-sm">2.75 Carat</span></p>
                                                        <p>Colour: <span className="font-montserrat font-light text-sm">Royal Blue</span></p>
                                                        <p>Size (mm): <span className="font-montserrat font-light text-sm">3.10 x 2.31 x 2.14</span></p>
                                                        <p>Cut: <span className="font-montserrat font-light text-sm">Princess Cut</span></p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 ">
                                                        <p>Origin: <span className="font-montserrat font-light text-sm">Mozambique</span></p>
                                                        <p>Shape: <span className="font-montserrat font-light text-sm">Square</span></p>
                                                        <p>Treatment: <span className="font-montserrat font-light text-sm">Un-Heat</span></p>
                                                        <p>Clarity: <span className="font-montserrat font-light text-sm">Flawless</span></p>
                                                        <p>Certificate: <span className="font-montserrat font-light text-sm">View / N/A</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            <p className="input_label">Request Details:</p>
                            <div className="flex w-full gap-16">
                                <div className="flex flex-col gap-5 input_label">
                                    <p className="flex flex-col gap-3">Full Name: <span className="font-montserrat font-light text-lg">John Smith</span></p>
                                    <p className="flex flex-col gap-3">Email: <span className="font-montserrat font-light text-lg">johnsmith@gmail.com</span></p>
                                    <p className="flex flex-col gap-3">Mobile Number: <span className="font-montserrat font-light text-lg">0773888721</span></p>
                                </div>
                                <div className="flex flex-col gap-5 input_label">
                                    <p className="flex flex-col gap-3">Company Name: <span className="font-montserrat font-light text-lg">ABC Limited</span></p>
                                    <p className="flex flex-col gap-3">Message: <span className="font-montserrat font-light text-lg">Message Here</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className="flex justify-center w-fit mt-12 gap-3 input_label z-10">
                        <input type="checkbox" value="respond" className="w-4" checked={respond} onChange={setRespond(!respond)} />
                        Mark As Responded
                    </label>
                    <button className="flex justify-center mt-4 button_style z-10">
                        Respond
                    </button>
                </div>
            </div>
        </>
    )
}