import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/productCard";
import axios from "axios";
import { dateFilter } from "../../components/dateFilter";

export default function ProductList({ openModal }) {

    const { state } = useLocation();
    const { colour, kind } = state || {};

    const [selectedKind, setSelectedKind] = useState(kind ? kind : 'all');
    const [selectedWeight, setSelectedWeight] = useState('all');
    const [selectedColour, setselectedColour] = useState(colour ? colour : 'all');
    const [checkedNatural, setCheckedNatural] = useState(false);
    const [gemstoneId, setGemstoneId] = useState('');
    const [selectedDate, setSelectedDate] = useState('all');
    const [isClearHovered, setisClearHovered] = useState(false);

    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(20);

    const handleClearFilterClick = () => {
        setselectedColour('all');
        setSelectedWeight('all');
        setSelectedKind('all');
        setCheckedNatural(false);
        setGemstoneId('');
        setSelectedDate('all');
        handleProductList();
    };

    const handleKindChange = (event) => {
        setSelectedKind(event.target.value);
        setselectedColour('all');
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/product/getProducts');
            setProducts(response.data.products);
            console.log('getProducts Successful');
            setLoading(false);
        } catch (error) {
            if (error.response) {
                setLoading(false);
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
        if (checkedNatural !== false) {
            filtered = filtered.filter(product => product.treatment === 'Un-Heat');
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
    }

    useEffect(() => {
        fetchProducts();
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        handleProductList();
    }, [products, selectedKind, selectedWeight, selectedColour, selectedDate, checkedNatural, pageLoad])


    return (
        <>
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
                        <option value='all' className="bg-gray-">
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
                        <option value='Yellow/Orange'>
                            Yellow/Orange
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

                    <img
                        src={isClearHovered ? "/clearFilterFilled.png" : "/clearFilterOutlined.png"}
                        onMouseEnter={() => setisClearHovered(true)}
                        onMouseLeave={() => setisClearHovered(false)}
                        onClick={handleClearFilterClick}
                        className="w-7 cursor-pointer"
                        alt=""
                    />
                </div>
            </div>

            {/* Product Lists */}
            {loading ?
                <video
                    width="240"
                    height="240"
                    autoPlay
                    loop
                    muted
                    className=""
                >
                    <source src="/loadingVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                : (
                    loading === false && productList.length > 0 ?
                        <div className="grid grid-cols-5 gap-7 w-full">
                            {productList.map((product, index) => index < pageLoad &&
                                <ProductCard key={product.productId} prod={product} openModal={() => openModal(product)} />
                            )}
                        </div>
                        :
                        <p className="title_text mt-10 motion-safe:animate-bounce">No Products To Show :(</p>
                )
            }
            
            <div className="flex gap-28 font-saira font-light text-xl">
                <p className="hover:text-gray-700 transition duration-300 cursor-pointer" onClick={() => setPageLoad((pageLoad) => pageLoad + 2)}>Load More &rarr;</p>
                <p className="hover:text-gray-700 transition duration-300 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>To Top &uarr;</p>
            </div>
        </>
    )
};
