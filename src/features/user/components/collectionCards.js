export default function CollectionCards() {

    const collection = [
        { source: "/gem1.jpg", name: "Sapphire" },
        { source: "/gem1.jpg", name: "Padparadscha" },
        { source: "/gem1.jpg", name: "Ruby" },
        { source: "/gem1.jpg", name: "Spinel" },
        { source: "/gem1.jpg", name: "Alexandrite" },
        { source: "/gem1.jpg", name: "Garnet" },
        { source: "/gem1.jpg", name: "Aquamarine" },
        { source: "/gem1.jpg", name: "Crysoberyl" },
        { source: "/gem1.jpg", name: "Emerald" },
        { source: "/gem1.jpg", name: "Others" },
    ];

    return (
        <div className="grid grid-cols-5 gap-x-10 gap-y-5">
            {collection.map((obj, index) => (
                <div key={index} className="text-center font-saira text-2xl font-light cursor-pointer">
                    <img src={obj.source} alt={obj.name} className="h-52 object-contain hover:scale-105 transition duration-300" />
                    <p>{obj.name}</p>
                </div>
            ))}
        </div>
    )
};
