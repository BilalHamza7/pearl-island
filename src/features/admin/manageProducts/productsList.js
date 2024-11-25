import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/navbar";
import ProductCard from "./productCard";
import { dateFilter } from "../components/dateFilter";
import { EditProduct } from "./editProduct";
import FeaturedProduct from "../components/featuredProduct";

export default function ProductList() {

    const navigate = useNavigate();

    // filters
    const [selectedKind, setSelectedKind] = useState('all');
    const [selectedWeight, setSelectedWeight] = useState('all');
    const [selectedColour, setselectedColour] = useState('all');
    const [checkedSold, setCheckedSold] = useState(false);
    const [gemstoneId, setGemstoneId] = useState('');
    const [selectedDate, setSelectedDate] = useState('all');
    const [isClearHovered, setisClearHovered] = useState(false);

    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [message, setMessage] = useState('');

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
        handleProductList();
    };

    const fetchProducts = async () => {
        try {
            setMessage('Loading...');
            const response = await axios.get('http://localhost:5000/product/getProducts');
            setProducts(response.data.products);
            console.log('getProducts Successful');
        } catch (error) {
            if (error.response) {
                setMessage('No Products To Show :(');
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

    const weightFilter = async (weight) => {
        const filteredWeight = {};

        try {
            switch (weight) {
                case 'less-than-1':
                    filteredWeight.weight = { $lt: 1 };
                    break;
                case '1-2':
                    filteredWeight.weight = { $gte: 1, $lt: 2 };
                    break;
                case '2-4':
                    filteredWeight.weight = { $gte: 2, $lt: 4 };
                    break;
                case '4-8':
                    filteredWeight.weight = { $gte: 4, $lt: 8 };
                    break;
                case 'greater-than-8':
                    filteredWeight.weight = { $gte: 8 };
                    break;
                default:
                    break;
            }
            return filteredWeight;
        } catch (error) {
            console.error(error);
            return 'Could Not Filter Weight';
        }
    }

    const fetchProductById = async () => {
        let filtered = [...products];

        // Filter by ID
        if (gemstoneId !== '') {
            filtered = filtered.filter(product => product.productId === gemstoneId);
        }

        setProductList(filtered);
        if (filtered.length === 0) setMessage('No Products Are Available!');
    }

    const handleProductList = async () => {
        let filtered = [...products];

        // Filter by kind
        if (selectedKind !== 'all') {
            filtered = filtered.filter(product => product.kind === selectedKind);
        }

        // Apply weight filter
        if (selectedWeight !== 'all') {
            const weightConditions = await weightFilter(selectedWeight);
            if (weightConditions.weight) {
                const { $lt, $gte } = weightConditions.weight;
                filtered = filtered.filter(product => {
                    const productWeight = product.weight;
                    return ($lt ? productWeight < $lt : true) && ($gte ? productWeight >= $gte : true);
                });
            }
        }

        // Filter by colour
        if (selectedColour !== 'all') {
            filtered = filtered.filter(product => product.section === selectedColour);
        }

        // Filter by soldStatus
        if (checkedSold !== null) {
            filtered = filtered.filter(product => product.soldStatus === checkedSold);
        }

        // Date filtering
        // Sorting by date
        if (selectedDate === 'new-to-old') {
            filtered.sort((a, b) => new Date(b.dateListed) - new Date(a.dateListed));
        } else if (selectedDate === 'old-to-new') {
            filtered.sort((a, b) => new Date(a.dateListed) - new Date(b.dateListed));
        } else if (selectedDate !== 'all') {
            const dateConditions = await dateFilter(selectedDate);
            if (dateConditions.date) {
                const { $gte, $lt } = dateConditions.date;
                filtered = filtered.filter(product => {
                    const dateListed = new Date(product.dateListed);
                    return dateListed >= $gte && dateListed < $lt;
                });
            }
        }

        setProductList(filtered);
        if (filtered.length === 0 && products.length !== 0) setMessage('No Products Are Available!');
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const closeModal = () => setIsEditModalOpen(false);
    const openModal = (product) => {
        setSelectedProduct(product);
            setIsEditModalOpen(true);
    };

    useEffect(() => {
        fetchProducts();
        window.scroll(0, 0);
    }, [])

    useEffect(() => {
        handleProductList();
    }, [products, selectedKind, selectedWeight, selectedColour, selectedDate, checkedSold])

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

                <datalist id="productIdList">
                    {products.length > 0 ?
                        (
                            products.map((product) =>
                                <option key={product.productId} value={product.productId} />
                            )
                        ) : (
                            <option value="none" />
                        )
                    }
                </datalist>

                {/* Search Filters */}
                <div className="flex justify-between w-full">
                    <div className="flex gap-5 items-center ">
                        <p className="font-montserrat ">Search By:</p>
                        <select onChange={handleKindChange} value={selectedKind} className="w-40 dropdown_style">
                            <option value='all' className="">
                                All kinds
                            </option>
                            <option value='Sapphire'>
                                Sapphire
                            </option>
                            <option value='Spinel'>
                                Spinel
                            </option>
                            <option value='Padparadscha'>
                                Padparadscha
                            </option>
                            <option value='Ruby'>
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
                            <option value='Blue'>
                                Blue
                            </option>
                            <option value='Red'>
                                Red
                            </option>
                            <option value='Yellow'>
                                Yellow
                            </option>
                            <option value='Pink'>
                                Pink
                            </option>
                            <option value='Purple'>
                                Purple
                            </option>
                            <option value='Green'>
                                Green
                            </option>
                            <option value='Peach'>
                                Peach
                            </option>
                            <option value='Bi-Colour'>
                                Bi-Colour
                            </option>
                            <option value='Grey'>
                                Grey
                            </option>
                            <option value='White'>
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
                        <input type="text" list="productIdList" value={gemstoneId} onChange={(e) => setGemstoneId(e.target.value)} placeholder="Search By ID" className="w-36 input_style" />
                        <img
                            src="/searchOutlined.png"
                            className="w-7 mx-1 cursor-pointer"
                            onClick={fetchProductById}
                        />
                    </div>
                </div>

                {productList.length > 0 ?
                    <div className="grid grid-cols-5 gap-7 w-full">
                        {productList.map((product) =>
                            <ProductCard key={product.productId} prod={product} openModal={() => openModal(product)} />
                        )}
                    </div>
                    : (
                        <p className="title_text mt-10 text-red-500">{message}</p>
                    )
                }
                
                {selectedProduct !== null && <EditProduct isOpen={isEditModalOpen} onClose={closeModal} product={selectedProduct} />}

                <div className="flex justify-center w-full input_label">
                    <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
                </div>

                <FeaturedProduct products={productList} />

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
