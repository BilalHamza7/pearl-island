import { useEffect, useState } from "react";

export default function InqRespond({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
                <div className="flex flex-col items-center px-10 w-full h-full bg-white">
                    <button className="flex flex-col items-end w-full pt-10" onClick={onClose}>
                        <img src="/close.png" className="w-7 h-7" />
                    </button>
                    <p>Inq respond Page</p>
                </div>
            </div>

        </>
    )
}