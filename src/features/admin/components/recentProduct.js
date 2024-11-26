import { useEffect, useState } from "react";
import axios from 'axios';

export default function RecentProduct() {

    const [product, setProduct] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setMessage('Loading...');
                const response = await axios.get('http://localhost:5000/product/getLatestProducts');
                setProduct(response.data.products);
            } catch (error) {
                if (error.response) {
                    setMessage('No Products Are Available');
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
                    product.map((product, index) => (
                        <tr key={index} className="capitalize font-light p-3 border-b border-gray-300">
                            <td className="p-3 ">{product.name}</td>
                            <td className="p-3 ">{product.weight}</td>
                            <td className="p-3 ">{product.shape}</td>
                            {/* creating a date object to use convertion methods */}
                            <td className="p-3 ">{new Date(product.dateListed).toLocaleDateString('en-GB')}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <th colSpan='4' className="p-3 text-left text-base font-medium">{message}</th>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
};
