import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/navbar";
import ProductCard from "./productCard";

export default function ProductList() {

    const navigate = useNavigate();

    const [selectedKind, setSelectedKind] = useState('all');
    const [selectedWeight, setSelectedWeight] = useState('all');
    const [selectedColour, setselectedColour] = useState('all');
    const [checkedSold, setCheckedSold] = useState(false);
    const [gemstoneId, setGemstoneId] = useState('');
    const [selectedDate, setSelectedDate] = useState('all');

    const [products, setProducts] = useState([]);

    const [test, setTest] = useState('');

    const [isClearHovered, setisClearHovered] = useState(false);

    const handleKindChange = (event) => {
        setSelectedKind(event.target.value);
        setselectedColour('all')
    };

    const handleClearFilterClick = () => {
        setselectedColour('all');
        setSelectedWeight('all');
        setSelectedKind('all');
        setCheckedSold(false);
        setGemstoneId('');
        setSelectedDate('all');
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product/getProducts');
            setProducts(response.data.products);
            console.log('getProducts Successful');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) { // response status 404
                    console.error(error.response.data.message || 'No products available.');
                    setProducts([]);
                } else if (error.response.status === 500) { // response status 500
                    console.error('Server error. Please try again later.');
                    setProducts([]);
                } else { // other response status
                    console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                    setProducts([]);
                }
            } else { // Network Errors
                console.error('Network error. Please check your connection.');
                setProducts([]);
            }
        }
    }

    useEffect(() => {
        fetchProducts();

        window.scrollTo(0, 0);
        setTest('Kind: ' + selectedKind + '  Weight: ' + selectedWeight + '  Date: ' + selectedDate + '  Colour: ' + selectedColour + '  Sold? ' + checkedSold);

    }, [selectedKind, selectedWeight, selectedColour, selectedDate, checkedSold])

    const handleFeaturedSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen p-10 gap-7">
                <p className="text-4xl font-saira tracking-wider">Manage Your Gemstone Inventory</p>

                <div className="flex gap-10">
                    <a href='#featured' className="button_style my-3">Featured Products</a>
                    <button onClick={() => navigate('/addNewProduct')} className="button_style my-3">
                        Add New product
                    </button>
                </div>

                {/* Search Filters */}
                <div className="flex justify-between w-full">
                    <div className="flex gap-5 items-center ">
                        <p className="font-montserrat ">Search By:</p>
                        <select onChange={handleKindChange} value={selectedKind} className="w-40 dropdown_style">
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
                        <select onChange={(event) => setSelectedWeight(event.target.value)} value={selectedWeight} className="w-40 dropdown_style">
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
                        <select onChange={(event) => setselectedColour(event.target.value)} value={selectedColour} className="w-40 dropdown_style">
                            <option value='all'>
                                All colours
                            </option>
                            <option value='blue'>
                                Blue
                            </option>
                            <option value='red'>
                                Red
                            </option>
                            <option value='yellow'>
                                Yellow
                            </option>
                            <option value='pink'>
                                Pink
                            </option>
                            <option value='purple'>
                                Purple
                            </option>
                            <option value='green'>
                                Green
                            </option>
                            <option value='peach'>
                                Peach
                            </option>
                            <option value='bi-colour'>
                                Bi-Colour
                            </option>
                            <option value='greay'>
                                Grey
                            </option>
                            <option value='white'>
                                White (Colourless)
                            </option>
                        </select>
                        <select onChange={(event) => setSelectedDate(event.target.value)} value={selectedDate} className="w-40 dropdown_style">
                            <option value='all'>
                                All Dates
                            </option>
                            <option value='new-to-old'>
                                New to Old
                            </option>
                            <option value='old-to-new'>
                                Old to New
                            </option>
                            <option value='this-week'>
                                This Week
                            </option>
                            <option value='this-month'>
                                This Month
                            </option>
                            <option value='this-year'>
                                This Year
                            </option>
                        </select>
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
                    <div className="flex gap-1 items-center bg-gray-100 rounded-lg">
                        <input type="text" value={gemstoneId} onChange={(e) => setGemstoneId(e.target.value)} placeholder="Search By ID" className="w-36 input_style border-b border-b-black" />
                        <img
                            src="/searchOutlined.png"
                            className="w-7 mx-1 cursor-pointer"
                            onClick={null}
                        />
                    </div>
                </div>

                {/* set search by id to search through a <dataList> which fetches the Ids from DB in first render */}

                <p>{test}</p>


                {products.length > 0 ?
                    products.map((product) => (
                        <div className="grid grid-cols-5 gap-7 w-full">
                            <ProductCard prod={product} />
                        </div>
                    ))
                    : (
                        <p className="title_text">No Products To Show At The Moment</p>
                    )
                }

                {/* Design product card, pass parameters, onClick events */}
                {/* <div className="grid grid-cols-5 gap-7 w-full">

                    <ProductCard source='/gem1.jpg' />
                    <ProductCard source='/gem2.jpg' />
                    <ProductCard source='/gem3.jpg' />
                    <ProductCard source='/gem4.jpg' />
                </div> */}

                <div className="flex justify-center w-full input_label">
                    <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
                </div>

                {/* <ProductsCount /> */}

                {/* Featured Products

                    - maintain an array state to store the featured ids entered in the fields
                    - have a datalist of ids available and dropdown when entering featured id
                */}

                <div className="flex flex-col items-center gap-5 w-full">
                    <p id="featured" className="text-4xl font-saira tracking-wider">Featured Products</p>
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
