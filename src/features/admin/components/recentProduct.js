import { useEffect, useState } from "react";
import axios from 'axios';

export default function RecentProduct() {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product/getLatestProducts');
                setProduct(response.data.products);
                console.log('getLatestProduct Successful');
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 404) { // response status 404
                        console.error(error.response.data.message || 'No products available yet.');
                        setProduct([]);
                    } else if (error.response.status === 500) { // response status 500
                        console.error('Server error. Please try again later.');
                        setProduct([]);
                    } else { // other response status
                        console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                        setProduct([]);
                    }
                } else { // Network Errors
                    console.error('Network error. Please check your connection.');
                    setProduct([]);
                }
            }
        }

        fetchData();
    }, [])

    return (
        <table className="rounded-lg overflow-hidden border-b">
            <thead className="text-left bg-gray-200 text-xl font-montserrat tracking-widest">
                <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Weight(Cts)</th>
                    <th className="p-3 text-left">Shape</th>
                    <th className="p-3 text-left">Date</th>
                </tr>
            </thead>
            <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">

                {product.length > 0 ?
                    product.map((product) => (
                        <tr key={product.productId} className="font-light p-3 border-b border-gray-300">
                            <td className="p-3 ">{product.name}</td>
                            <td className="p-3 ">{product.weight}</td>
                            <td className="p-3 ">{product.shape}</td>
                            <td className="p-3 ">{product.dateListed}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <th colSpan='4' className="p-3 text-left text-base font-medium">No Products Are Available</th>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
};
