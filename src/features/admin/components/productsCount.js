import { useEffect, useState } from "react";
import axios from 'axios';

export default function ProductsCount() {

    const [productCount, setProductCount] = useState([]);
    const [totalCount, setTotalcount] = useState(0);
    const [message, setMessage] = useState('');


    const calculateTotalCount = () => {
        let total = 0
        for(let i = 0; i < productCount.length; i++) {
            total += productCount[i].count;
        }
        setTotalcount(total);
    }
    
    const fetchData = async () => {
        try {
            setMessage('Loading...');
            const response = await axios.get('http://localhost:5000/product/getKindCount');

            // will only execute if a response with status 200 is received
            setProductCount(response.data.products);
            calculateTotalCount();
            console.log('getKindCount Successful');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) { // response status 404
                    setMessage('No Products Are Available Yet');
                    console.error(error.response.data.message || 'No products available yet.');
                    setProductCount([]);
                } else if (error.response.status === 500) { // response status 500
                    console.error('Server error. Please try again later.');
                    setProductCount([]);
                } else { // other response status
                    console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                    setProductCount([]);
                }
            } else { // Network Errors
                console.error('Network error. Please check your connection.');
                setProductCount([]);
            }
        }
    };

    useEffect(() => {
        calculateTotalCount();
    }, [productCount]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <p className="title_text">Products In Stock</p>
            <table className="w-96 rounded-lg overflow-hidden border-b">
                <thead className="text-left bg-gray-200 text-2xl font-montserrat tracking-widest">
                    <tr>
                        <th className="p-3 text-left">Total</th>
                        <th className="p-3 text-right">{totalCount}</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 text-2xl font-montserrat tracking-widest">
                    {productCount.length > 0 ? (
                        productCount.map((product) => (
                            <tr key={product.kind} className=" font-light p-3 border-b border-gray-300">
                                <td className="p-3 text-left">{product.kind}</td>
                                <td className="p-3 text-right">{product.count}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="p-3 text-left text-base font-medium">
                                {message}
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div >
    )
};
