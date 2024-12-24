export default function CollectionCards() {

    const collection = [
        { source: "/gem1.jpg", name: "Sapphire" },
        { source: "/pp2.jpg", name: "Padparadscha" },
        { source: "/ruby.jpg", name: "Ruby" },
        { source: "/spinel.jpg", name: "Spinel" },
        { source: "/alex.jpg", name: "Alexandrite" },
        { source: "/garnet.jpg", name: "Garnet" },
        { source: "/aquamarine.jpg", name: "Aquamarine" },
        { source: "/cryso.jpg", name: "Crysoberyl" },
        { source: "/emerald.jpg", name: "Emerald" },
        { source: "/others.jpg", name: "Others" },
    ];

    return (
        <div className="grid grid-cols-5 gap-x-10 gap-y-5">
            {collection.map((obj, index) => (
                <div key={index} className="text-center font-saira text-2xl font-light cursor-pointer">
                    <img src={obj.source} alt={obj.name} className="h-52 w-52 object-contain hover:scale-105 transition duration-300" />
                    <p>{obj.name}</p>
                </div>
            ))}
        </div>
    )
};
