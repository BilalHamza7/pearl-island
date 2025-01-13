import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CollectionCards() {

    const sapphires = [
        { source: "/gem1.jpg", colour: "Blue", kind: "Sapphire" },
        { source: "/pp2.jpg", colour: "", kind: "Padparadscha" },
        { source: "/ruby.jpg", colour: "", kind: "Ruby" },
        { source: "/gem4.jpg", colour: "Pink", kind: "Sapphire" },
        { source: "/yellowSapphire.jpg", colour: "White", kind: "Sapphire" },
        { source: "/yellowSapphire.jpg", colour: "Yellow/Orange", kind: "Sapphire" },
        { source: "/emerald.jpg", colour: "Green/Teal", kind: "Sapphire" },
        { source: "/gem2.jpg", colour: "Purple/Violet", kind: "Sapphire" },
        { source: "/gem2.jpg", colour: "Bi-Color", kind: "Sapphire" },
        { source: "/gem2.jpg", colour: "Color Change", kind: "Sapphire" },
    ];
    const others = [
        { source: "/gem1.jpg", colour: "", kind: "Spinel" },
        { source: "/pp2.jpg", colour: "", kind: "Alex" },
        { source: "/gem4.jpg", colour: "", kind: "Chrysoberyl" },
        { source: "/yellowSapphire.jpg", colour: "", kind: "Garnet" },
        { source: "/yellowSapphire.jpg", colour: "", kind: "All Other Kinds" },
    ];

    const navigate = useNavigate();
    const [isSapphireHovered, setIsSapphireHovered] = useState(null);
    const [isOtherHovered, setIsOtherHovered] = useState(null);


    const handleCollectionClick = ({ colour, kind }) => {
        navigate('/products', { state: { colour, kind } })
    };

    return (
        <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col gap-5 items-center">
                <p className="title_text">Our Featured Varieties</p>
                <div className="grid grid-cols-5 gap-y-2 gap-x-12">
                    {sapphires.map((obj, index) => (
                        <div key={index} className="text-center cursor-pointer flex flex-col items-center boder border-black" onClick={() => handleCollectionClick(obj)} onMouseOver={() => setIsSapphireHovered(index)} onMouseLeave={() => setIsSapphireHovered(null)} >
                            <img src={obj.source} alt={obj.colour} className="h-52 w-52 object-contain hover:scale-105 transition duration-300" />
                            <p className={`font-montserrat text-xl tracking-wider w-44 transition duration-300  ${isSapphireHovered === index ? 'scale-105' : ''} `}>{obj.colour + " " + obj.kind}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-5 ">
                <p className="title_text">Other Exquisite Collections</p>
                <div className="flex gap-11">
                    {others.map((obj, index) => (
                        <div key={index} className="text-center cursor-pointer flex flex-col items-center " onClick={() => handleCollectionClick(obj)} onMouseOver={() => setIsOtherHovered(index)} onMouseLeave={() => setIsOtherHovered(null)} >
                            <img src={obj.source} alt={obj.colour} className="h-28 object-contain hover:scale-105 transition duration-300" />
                            <p className={`font-montserrat text-lg tracking-wider w-44 transition duration-300  ${isOtherHovered === index ? 'scale-105' : ''} `}>{obj.colour + " " + obj.kind}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
