import { useEffect, useState } from "react";

export default function InqRespond({ isOpen, onClose, inquiry }) {

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
                                    <p className="flex flex-col gap-3">Full Name: <span className="font-montserrat font-light text-lg ">{inquiry.fullName}</span></p>
                                    <p className="flex flex-col gap-3 ">Email: <span className="font-montserrat font-light text-lg ">{inquiry.email}</span></p>
                                </div>
                                <div className="flex flex-col gap-10 input_label">
                                    <p className="flex flex-col gap-3">Company Name: <span className="font-montserrat font-light text-lg ">{inquiry.companyName}</span></p>
                                    <p className="flex flex-col gap-3">Mobile Number: <span className="font-montserrat font-light text-lg ">{inquiry.mobileNumber}</span></p>
                                </div>
                                <div className="gap-10 input_label">
                                    <p className="flex flex-col gap-3">Message: <span className="font-montserrat font-light text-lg w-96">{inquiry.message}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`z-10 text-center text-xl font-montserrat tracking-widest mt-12 p-3 rounded-lg font-medium ${inquiry.responded ? 'bg-green-300' : 'bg-red-300'}`}>
                        <p>{inquiry.responded ? 'Responded' : 'Not Responded'}</p>
                    </div>
                    <button className="flex justify-center mt-4 button_style ">
                        Respond
                    </button>
                </div>
            </div>

        </>
    )
}