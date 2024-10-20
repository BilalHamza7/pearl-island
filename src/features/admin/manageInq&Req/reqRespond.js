import { useEffect, useState } from "react";

export default function ReqRespond({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
                <div className="flex flex-col items-center p-10 w-full h-full bg-white">
                    <div className="flex w-full">
                        <p className="text-center w-full title_text">CUSTOMER PRICE REQUEST</p>
                        <button className="w-fit flex justify-end" onClick={onClose}>
                            <img src="/close.png" className="w-7 h-7" />
                        </button>
                    </div>

                    <div className="flex w-full h-fit mt-20 justify-center items-center">
                        <div className="flex flex-col items-start gap-5 w-full ">
                            <p className="input_label">Gemstone Details:</p>
                            <p className="font-saira text-2xl">Natural Blue Sapphire (PI-1234)</p>
                            <div className="flex w-full gap-16">
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
                        </div>
                        <div className="flex flex-col items-start gap-5 w-full">
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
                    <label className="flex justify-center w-full mt-12 gap-3 input_label ">
                        <input type="checkbox" value="responded" className="w-4" />
                        Mark As Responded
                    </label>
                    <button className="flex justify-center mt-4 button_style ">
                        Respond
                    </button>
                </div>
            </div>

        </>
    )
}