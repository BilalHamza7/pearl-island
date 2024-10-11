import { useEffect, useState } from "react";
import Navbar from "../comp/navbar";
import TotalProducts from "../comp/totalProducts";

export default function ProductList() {

    const [selectedKind, setSelectedKind] = useState('all');
    const [selectedWeight, setSelectedWeight] = useState('all');
    const [selectedColour, setselectedColour] = useState('all');
    const [checkedSold, setCheckedSold] = useState(false);
    const [gemstoneId, setGemstoneId] = useState('');


    const [test, setTest] = useState('');

    const [isClearHovered, setisClearHovered] = useState(false);

    const handleKindChange = (event) => {
        setSelectedKind(event.target.value);
        setselectedColour('all')
    };

    const handleWeightChange = (event) => {
        setSelectedWeight(event.target.value);
    };

    const handleColourChange = (event) => {
        setselectedColour(event.target.value);
    };

    const handleClearFilterClick = () => {
        setselectedColour('all');
        setSelectedWeight('all');
        setSelectedKind('all');
        setCheckedSold(false);
        setGemstoneId('');
    };

    useEffect(() => {
        setTest('Kind: ' + selectedKind + '  Weight: ' + selectedWeight + '  Colour: ' + selectedColour + '  Sold? ' + checkedSold);

    }, [selectedKind, selectedWeight, selectedColour, checkedSold])

    const handleFeaturedSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div className=" flex flex-col items-center min-h-screen py-10 gap-7">
                <p className="text-4xl font-saira tracking-wider">Manage Your Gemstone Inventory</p>
                <div className="flex justify-between px-10 w-full">
                    <div className="flex gap-5 items-center ">
                        <p className="font-montserrat ">Search By:</p> {/**Crimson Text */}
                        <select onChange={handleKindChange} value={selectedKind} className="w-40 font-montserrat p-1 outline-none rounded drop-shadow-md border-b border-b-black hover:cursor-pointer"> {/**Crimson Text */}
                            <option value='all' className="text-sm">
                                All kinds
                            </option>
                            <option value='sapphire' className="text-sm">
                                Sapphire
                            </option>
                            <option value='spinel' className="text-sm">
                                Spinel
                            </option>
                            <option value='padparadscha' className="text-sm">
                                Padparadscha
                            </option>
                            <option value='ruby' className="text-sm">
                                Ruby
                            </option>
                            <option value='Alexandrite' className="text-sm">
                                Alexandrite
                            </option>
                            <option value='Garnet' className="text-sm">
                                Garnet
                            </option>
                            <option value='Aquamarine' className="text-sm">
                                Aquamarine
                            </option>
                            <option value='Chrysoberyl' className="text-sm">
                                Chrysoberyl
                            </option>
                            <option value='Emerald' className="text-sm">
                                Emerald
                            </option>
                            <option value='Other' className="text-sm">
                                Others
                            </option>
                        </select>
                        <select onChange={handleWeightChange} value={selectedWeight} className="w-40 font-montserrat p-1 rounded outline-none drop-shadow-md border-b border-b-black hover:cursor-pointer">
                            <option value='all' className="text-sm">
                                All Weights(cts)
                            </option>
                            <option value='less-than-1' className="text-sm">
                                Less Than 1
                            </option>
                            <option value='1-2' className="text-sm">
                                1 - 2
                            </option>
                            <option value='2-4' className="text-sm">
                                2 - 4
                            </option>
                            <option value='4-8' className="text-sm">
                                4 - 8
                            </option>
                            <option value='greater-than-8' className="text-sm">
                                Greater Than 8
                            </option>
                        </select>
                        {selectedKind === 'sapphire' || selectedKind === 'spinel' ?
                            <select onChange={handleColourChange} value={selectedColour} className="w-40 font-montserrat rounded p-1 outline-none drop-shadow-md border-b border-b-black hover:cursor-pointer ">
                                <option value='all' className="text-sm">
                                    All colours
                                </option>
                                <option value='blue' className="text-sm">
                                    Blue
                                </option>
                                <option value='pink' className="text-sm">
                                    Pink
                                </option>
                            </select>
                            : ''
                        }
                        <label className="flex gap-2 items-center font-montserrat text-lg hover:cursor-pointer">
                            <input type="checkbox" id="sold" value='sold' checked={checkedSold} onChange={() => setCheckedSold(!checkedSold)} className="font-montserrat text-lg" />  {/**Crimson Text */}
                            Only Sold
                        </label>

                        <img
                            src={isClearHovered ? "/clearFilterFilled.png" : "/clearFilterOutlined.png"}
                            onMouseEnter={() => setisClearHovered(true)}
                            onMouseLeave={() => setisClearHovered(false)}
                            onClick={handleClearFilterClick}
                            className="w-7 cursor-pointer"
                        />
                    </div>
                    <div className="flex gap-5 items-center">
                        <input type="text" value={gemstoneId} onChange={(e) => setGemstoneId(e.target.value)} placeholder="Search By ID" className="font-montserrat p-1 w-36 rounded outline-none border-b border-b-black drop-shadow-md" />

                        <button className="button-style">
                            Add New product
                        </button>
                    </div>
                </div>
                <p>{test}</p>
                <table>
                    <tbody>
                        <tr>
                            {/**4 each row  */}
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-col items-center gap-5 w-full">
                    {/* <TotalProducts /> */}
                    <p className="text-4xl font-saira tracking-wider">Featured Products</p>
                    <p className="text-xl font-montserrat ">Add Four Gemstone ID's To Be Featured</p>
                    <form onSubmit={handleFeaturedSubmit} className="flex gap-5 font-montserrat">
                        <input type="text" placeholder="ID One" className=" p-1 w-36 rounded outline-none border-b border-b-black drop-shadow-md" />
                        <input type="text" placeholder="ID Two" className=" p-1 w-36 rounded outline-none border-b border-b-black drop-shadow-md" />
                        <input type="text" placeholder="ID Three" className=" p-1 w-36 rounded outline-none border-b border-b-black drop-shadow-md" />
                        <input type="text" placeholder="ID Four" className=" p-1 w-36 rounded outline-none border-b border-b-black drop-shadow-md" />
                        <button type="submit" className="button-style">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};
