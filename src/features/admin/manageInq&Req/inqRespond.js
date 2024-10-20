import { useEffect, useState } from "react";

export default function InqRespond({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
                <div className="flex flex-col items-center p-10 w-full h-full bg-white">
                    <div className="flex w-full">
                        <p className="text-center w-full title_text">CUSTOMER INQUIRY RESPOND</p>
                        <button className="w-fit flex justify-end" onClick={onClose}>
                            <img src="/close.png" className="w-7 h-7" />
                        </button>
                    </div>

                    <div className="flex w-full h-fit mt-20 justify-center items-center">
                        <div className="flex flex-col items-center gap-5 w-full ">
                            <p className="input_label">Inquiry Details:</p>
                            <div className="flex gap-32 w-fit ">
                                <div className="flex flex-col gap-10 input_label">
                                    <p className="flex flex-col gap-3">Full Name: <span className="font-montserrat font-light text-lg ">John Smith</span></p>
                                    <p className="flex flex-col gap-3 ">Email: <span className="font-montserrat font-light text-lg ">johnsmith@gmail.com</span></p>
                                </div>
                                <div className="flex flex-col gap-10 input_label">
                                    <p className="flex flex-col gap-3">Company Name: <span className="font-montserrat font-light text-lg ">ABC Limited</span></p>
                                    <p className="flex flex-col gap-3">Mobile Number: <span className="font-montserrat font-light text-lg ">+96 77283723</span></p>
                                </div>
                                <div className="gap-10 input_label">
                                    <p className="flex flex-col gap-3">Message: <span className="font-montserrat font-light text-lg ">Message Here</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className="flex justify-center w-full mt-16 gap-3 input_label ">
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