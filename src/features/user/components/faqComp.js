import { useState } from "react"

export default function FaqComp({ question, message }) {

    const [messageToggle, setMessageToggle] = useState(false);

    return (
        <div className="flex flex-col overflow-hidden">
            <p className="flex gap-4 font-saira text-xl tracking-wider cursor-pointer" onClick={() => setMessageToggle(!messageToggle)}>
                {question}
                <span className={`transition duration-300 ${messageToggle && 'rotate-180'}`}>&dArr;</span>
            </p>
            <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${messageToggle ? "max-h-[200px]" : "max-h-0"
                    }`}
            >
                <p
                    className="font-montserrat text-md font-light tracking-wider"
                >
                    {message}   
                </p>
            </div>
        </div>
    )
};
