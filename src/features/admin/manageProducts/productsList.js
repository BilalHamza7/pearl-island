import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import TotalProducts from "../components/totalProducts";
import NewProduct from "./newProducts";

export default function ProductList() {

    const navigate = useNavigate();

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
        window.scrollTo(0, 0);
        setTest('Kind: ' + selectedKind + '  Weight: ' + selectedWeight + '  Colour: ' + selectedColour + '  Sold? ' + checkedSold);

    }, [selectedKind, selectedWeight, selectedColour, checkedSold])

    const handleFeaturedSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen p-10 gap-7">
                <p className="text-4xl font-saira tracking-wider">Manage Your Gemstone Inventory</p>

                {/* Search Filters */}
                <div className="flex justify-between w-full">
                    <div className="flex gap-5 items-center ">
                        <p className="font-montserrat ">Search By:</p> {/**Crimson Text */}
                        <select onChange={handleKindChange} value={selectedKind} className="w-40 dropdown_style"> {/**Crimson Text */}
                            <option value='all' className="">
                                All kinds
                            </option>
                            <option value='sapphire'>
                                Sapphire
                            </option>
                            <option value='spinel'>
                                Spinel
                            </option>
                            <option value='padparadscha'>
                                Padparadscha
                            </option>
                            <option value='ruby'>
                                Ruby
                            </option>
                            <option value='Alexandrite'>
                                Alexandrite
                            </option>
                            <option value='Garnet'>
                                Garnet
                            </option>
                            <option value='Aquamarine'>
                                Aquamarine
                            </option>
                            <option value='Chrysoberyl'>
                                Chrysoberyl
                            </option>
                            <option value='Emerald'>
                                Emerald
                            </option>
                            <option value='Other'>
                                Others
                            </option>
                        </select>
                        <select onChange={handleWeightChange} value={selectedWeight} className="w-40 dropdown_style">
                            <option value='all'>
                                All Weights(cts)
                            </option>
                            <option value='less-than-1'>
                                Less Than 1
                            </option>
                            <option value='1-2'>
                                1 - 2
                            </option>
                            <option value='2-4'>
                                2 - 4
                            </option>
                            <option value='4-8'>
                                4 - 8
                            </option>
                            <option value='greater-than-8'>
                                Greater Than 8
                            </option>
                        </select>
                        {selectedKind === 'sapphire' || selectedKind === 'spinel' ?
                            <select onChange={handleColourChange} value={selectedColour} className="w-40 dropdown_style">
                                <option value='all'>
                                    All colours
                                </option>
                                <option value='blue'>
                                    Blue
                                </option>
                                <option value='pink'>
                                    Pink
                                </option>
                            </select>
                            : ''
                        }
                        <label className="flex gap-2 items-center font-montserrat text-lg hover:cursor-pointer">
                            <input type="checkbox" id="sold" value='sold' checked={checkedSold} onChange={() => setCheckedSold(!checkedSold)} />  {/**Crimson Text */}
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
                        <div className="flex gap-1 items-center bg-gray-100 rounded-lg">
                            <input type="text" value={gemstoneId} onChange={(e) => setGemstoneId(e.target.value)} placeholder="Search By ID" className="w-36 input_style border-b border-b-black" />
                            <img
                                src="/searchOutlined.png"
                                className="w-7 mx-1 cursor-pointer"
                            />
                        </div>
                        <button onClick={() => navigate('/addNewProduct')} className="button_style">
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


                <div className="flex justify-between w-full items-center font-montserrat text-lg">
                    <p>&larr; Previous Page</p>
                    <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
                    <p>Next Page &rarr;</p>
                </div>


                {/* <TotalProducts /> */}
                <div className="flex flex-col items-center gap-5 w-full">
                    <p className="text-4xl font-saira tracking-wider">Featured Products</p>
                    <p className="text-xl font-montserrat ">Add Four Gemstone ID's To Be Featured</p>
                    <form onSubmit={handleFeaturedSubmit} className="flex gap-5">
                        <input type="text" placeholder="ID One" className="input_style w-36  border-b border-b-black" />
                        <input type="text" placeholder="ID Two" className="input_style w-36  border-b border-b-black" />
                        <input type="text" placeholder="ID Three" className="input_style w-36  border-b border-b-black" />
                        <input type="text" placeholder="ID Four" className="input_style w-36  border-b border-b-black" />
                        <button type="submit" className="button_style">
                            Save
                        </button>
                    </form>
                </div>


                <p className="title_text">Quick Links</p>
                <div className="flex justify-center gap-10 w-full">
                    <button onClick={() => navigate('/adminDashboard')} className="button_style">
                        Dashboard
                    </button>
                    <button onClick={() => navigate('/manageCustomer')} className="button_style">
                        View All Requests & Inquiries
                    </button>
                </div>
            </div>
        </>
    )
};
