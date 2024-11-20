import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeaturedProduct({ products }) {

    const [featuredIds, setfeaturedIds] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [featuredProdError, setFeaturedProdError] = useState('');
    const [message, setMessage] = useState('');

    const handleFeaturedSubmit = async (e) => {
        e.preventDefault();

        if (featuredIds.length === 0) {
            setFeaturedProdError('Please Enter 1-4 Product IDs To Save');
        } else {
            setFeaturedProdError('');
            try {
                setFeaturedProdError('Please Wait!');
                const response = await axios.post('http://localhost:5000/featuredProd/saveFeaturedProds',
                    featuredIds
                );
                fetchFeaturedIds();
                setFeaturedProdError('Saved!');
                console.log('saveFeaturedProds Successful');
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 404) { // response status 404
                        console.error(error.response.data.message || 'Could Not Save Featured Products.');
                    } else if (error.response.status === 500) { // response status 500
                        console.error('Server error. Please try again later.');
                    } else { // other response status
                        console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                    }
                } else { // Network Errors
                    console.error('Network error. Please check your connection.');
                }
            }
        }
    };

    const handleFeaturedInputChange = (index, value) => {
        setfeaturedIds((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts[index] = value; // Store product ID directly as a string
            return updatedProducts;
        });
    };

    const fetchFeaturedIds = async () => {
        try {
            const response = await axios.get('http://localhost:5000/featuredProd/getFeaturedProds');
            if (response.data.products) {
                setfeaturedIds(response.data.products);
                console.log('getFeaturedProds Successful');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) { // response status 404
                    console.error(error.response.data.message || 'No Featured products Are available.');
                    setfeaturedIds([]);
                } else if (error.response.status === 500) { // response status 500
                    console.error('Server error. Please try again later.');
                    setfeaturedIds([]);
                } else { // other response status
                    console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                    setfeaturedIds([]);
                }
            } else { // Network Errors
                console.error('Network error. Please check your connection.');
                setfeaturedIds([]);
            }
        }
    };

    const fetchProducts = async () => {
        try {
            const filtered = [...products];
            console.log('array', filtered);
            // for (let i = 0; i < featuredIds.length; i++) {
            //     let id = [featuredIds[i]];
            //     const response = await axios.post('http://localhost:5000/product/getProductById', {
            //         gemstoneId: id,
            //     });
            //     prods[i] = response.data.product;
            // }
            // setFeaturedProducts(prods);
            // console.log('response: ', prods);
        } catch (error) {
            setMessage(error.message);
            console.error("Error Fetching Product Details: ", error.message);
        }
    };

    useEffect(() => {
        fetchFeaturedIds();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [featuredIds]);

    return (
        <div>
            <div className="flex flex-col items-center gap-5 w-full">
                <p id="featured" className="text-4xl font-saira tracking-wider">Featured Products</p>



                <p className="text-xl font-montserrat ">Add Four Gemstone ID's To Be Featured</p>
                <form onSubmit={(e) => handleFeaturedSubmit(e)} className="flex gap-5 items-center">
                    {[0, 1, 2, 3].map((index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`ID ${index + 1}`}
                            list="productIdList"
                            value={featuredIds[index] || ""}
                            onChange={(e) => handleFeaturedInputChange(index, e.target.value)}
                            className="input_style w-36"
                        />
                    ))}
                    <button type="submit" className="button_style h-fit">
                        Save
                    </button>
                </form>
                <p className="subtitle_text text-red-600">{featuredProdError}</p>
            </div>
        </div>
    )
};
