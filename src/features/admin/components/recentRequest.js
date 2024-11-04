import { useEffect, useState } from "react";
import axios from 'axios';

export default function RecentRequest() {

    const [request, setRequest] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/request/getLatestRequests');
                setRequest(response.data.products);
                console.log('getLatestRequest Successful');
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 404) { // response status 404
                        console.error(error.response.data.message || 'No requests received yet.');
                        setRequest([]);
                    } else if (error.response.status === 500) { // response status 500
                        console.error('Server error. Please try again later.');
                        setRequest([]);
                    } else { // other response status
                        console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                        setRequest([]);
                    }
                } else { // Network Errors
                    console.error('Network error. Please check your connection.');
                    setRequest([]);
                }
            }
        }

        fetchData();
    }, [])

    return (
        <table className="rounded-lg overflow-hidden border-b">
            <thead className="text-left bg-gray-200 text-xl font-montserrat tracking-widest">
                <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Gemstone ID</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Date</th>
                </tr>
            </thead>
            <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">

                {request.length > 0 ?
                    request.map((request) => (
                        <tr key={request.requestId} className="text-left font-light p-3 border-b border-gray-300">
                            <td className="p-3 ">{request.fullName}</td>
                            <td className="p-3 max-w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                                {request.gemstoneId.map((prodId, index) => (
                                    { prodId }
                                ))}
                            </td>
                            <td className="p-3 ">johnwick@gmail.com</td>
                            <td className="p-3 ">01/10/2024</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <th colSpan='4' className="p-3 text-left text-base font-medium">No Requests Are Available</th>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
};
