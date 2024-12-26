import axios from "axios";
import { useEffect, useState } from "react";
import { dateFilter } from "../../../components/dateFilter";
import ReqRespond from "./reqRespond";

//allow to change responded

export default function ManageReq() {

    const CheckRespond = ({ request, onClick }) => {
        return (
            <>
                <div className={`text-center rounded-lg font-medium cursor-pointer transition duration-300 ${request.responded ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'}`} onClick={onClick}>
                    <p>{request.responded ? 'Responded' : 'Respond'}</p>
                </div>
            </>

        )
    };

    {/** Filters */ }
    const [gemstoneId, setGemstoneId] = useState(''); // not applied
    const [customerName, setCustomerName] = useState('');
    const [requestId, setRequestId] = useState('');
    const [checkedRespond, setCheckedRespond] = useState('all');
    const [selectedDate, setSelectedDate] = useState('all');
    const [isClearHovered, setisClearHovered] = useState(false);

    {/**Modal */ }
    const [isReqModalOpen, setIsReqModalOpen] = useState(false);
    const [requestRespond, setRequestRespond] = useState({});

    const [product, setProduct] = useState(null);
    const [requests, setRequests] = useState([]);
    const [requestList, setRequestList] = useState([]); // to list requests and filter
    const [loading, setLoading] = useState(false); // when updating status
    const [message, setMessage] = useState(''); // when fetching requests
    // const [gemstoneIdList, setGemstoneIdList] = useState([]);


    const closeModal = () => setIsReqModalOpen(false); 
    const handleRespondClick = async ({ req }) => {  // open modal
        try {
            setMessage('Loading...');
            const response = await axios.post('http://localhost:5000/product/getProductById', {
                gemstoneId: req.gemstoneId,
            });

            if (response.data.product.length > 0) {
                setProduct(response.data.product);
                setRequestRespond(req);
                setIsReqModalOpen(true);
            }
        } catch (error) {
            setMessage(error.message);
            console.error("Error Fetching Product Details: ", error.message);
        }
    };

    const fetchPriceRequests = async () => {
        try {
            setMessage('Loading...');
            const response = await axios.get('http://localhost:5000/request/getRequests');
            if (response.status === 200) {
                setRequests(response.data.requests);
                console.log('getRequests Successful');
            }
        } catch (error) {
            if (error.response) {
                setMessage('No Requests To Show!');
                if (error.response.status === 404) { // response status 404
                    console.error(error.response.data.message || 'No Requests available.');
                    setRequests([]);
                } else if (error.response.status === 500) { // response status 500
                    console.error('Server error. Please try again later.');
                    setRequests([]);
                } else { // other response status
                    console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                    setRequests([]);
                }
            } else { // Network Errors
                console.error('Network error. Please check your connection.');
                setRequests([]);
            }
        }
    };

    const handleRequestList = async () => {
        let filtered = [...requests];

        // Filter by customer fullName
        if (customerName !== '') {
            filtered = filtered.filter(request => request.fullName === customerName);
        }

        // Filter by RequestID
        if (requestId !== '') {
            filtered = filtered.filter(request => request.requestId === requestId);
        }

        // // Filter by gemstoneID
        // if (gemstoneId !== '') {
        //     filtered = filtered.filter(request => request.gemstoneId === gemstoneId);
        // }

        // Filter by responded
        if (checkedRespond !== 'all') {
            const res = checkedRespond === 'true';
            filtered = filtered.filter(request => request.responded === res);
        }

        // Date filtering
        // Sorting by date
        if (selectedDate === 'new-to-old') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (selectedDate === 'old-to-new') {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (selectedDate !== 'all') {
            const dateConditions = await dateFilter(selectedDate);
            if (dateConditions.date) {
                const { $gte, $lt } = dateConditions.date;
                filtered = filtered.filter(request => {
                    const date = new Date(request.date);
                    return date >= $gte && date < $lt;
                });
            }
        }

        setRequestList(filtered);
        if (filtered.length === 0 && requests.length !== 0) setMessage('No Requests Found!');
    }

    const handleClearFilterClick = async () => {
        setGemstoneId('');
        setCustomerName('');
        setRequestId('');
        setCheckedRespond('all');
        setSelectedDate('all');
        handleRequestList();
    };

    const handleRespondedChange = async (id, value) => {
        try {
            setLoading(true);
            const response = await axios.put('http://localhost:5000/request/updateRequest', {
                id: id,
                responded: !value,
            });
            if (response.status === 200) {
                fetchPriceRequests();
                setLoading(false);
                console.log('updateRespond Successful');
            }
        } catch (error) {
            if (error) {
                console.error('error occured: ', error.message);
            }
        }
    }


    // const getGemstoneIdList = () => {
    //     let ids = [];
    //     requests.map((request, index) => {
    //         ids[index] = request.gemstoneId;
    //     });
    //     setGemstoneIdList(ids);
    // };

    // useEffect(() => {
    //     getGemstoneIdList();
    // }, [requests]);

    useEffect(() => {
        fetchPriceRequests();
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        handleRequestList();
    }, [requests, checkedRespond, selectedDate]);

    return (
        <div className="flex flex-col px-10 gap-5">
            <datalist id="customerNameList">
                {requests.length > 0 ?
                    (
                        requests.map((request) =>
                            <option key={request.requestId} value={request.fullName} />
                        )
                    ) : (
                        <option value="none" />
                    )
                }
            </datalist>
            <datalist id="requestIdList">
                {requests.length > 0 ?
                    (
                        requests.map((request) =>
                            <option key={request.requestId} value={request.requestId} />
                        )
                    ) : (
                        <option value="none" />
                    )
                }
            </datalist>
            {/* <datalist id="gemstoneIdList">
                {gemstoneIdList.length > 0 ?
                    (
                        gemstoneIdList.map((id, outIndex) => {
                            if (gemstoneIdList[outIndex].length > 1) {
                                return gemstoneIdList[outIndex].map((spread, InIndex) => (
                                    <option key={`${outIndex}-${InIndex}`} value={spread} />
                                ))
                            } else {
                                return <option key={outIndex} value={id} />
                            }
                        }
                        )
                    ) : (
                        <option value="none" />
                    )
                }
            </datalist> */}

            <div className="flex gap-5 items-center ">
                <p className="font-montserrat ">Search By:</p> {/**Crimson Text */}
                <input type="text" list="customerNameList" placeholder="Customer Name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="input_style w-40" />
                <input type="text" list="requestIdList" placeholder="Request ID" value={requestId} onChange={(event) => setRequestId(event.target.value)} className="input_style w-40" />
                {/* <input type="text" list="gemstoneIdList" placeholder="Gemstone ID" value={gemstoneId} onChange={(event) => setGemstoneId(event.target.value)} className="input_style w-40" /> */}

                <img
                    src="/searchOutlined.png"
                    className="w-7 cursor-pointer"
                    onClick={handleRequestList}
                />


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

                <select onChange={(event) => setCheckedRespond(event.target.value)} value={checkedRespond} className="w-40 dropdown_style">
                    <option value='all'>
                        All
                    </option>
                    <option value='true'>
                        Responded
                    </option>
                    <option value='false'>
                        To Respond
                    </option>
                </select>


                <img src={isClearHovered ? "/clearFilterFilled.png" : "/clearFilterOutlined.png"}
                    onMouseEnter={() => setisClearHovered(true)}
                    onMouseLeave={() => setisClearHovered(false)}
                    onClick={handleClearFilterClick}
                    className="w-7 cursor-pointer"
                />
            </div>

            <table className="rounded-lg overflow-hidden border-b">
                <thead className="text-left bg-gray-200 text-xl font-montserrat tracking-widest">
                    <tr>
                        <th className="p-3">Request ID</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Gemstone ID</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Flag</th>
                    </tr>
                </thead>
                <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">
                    {requestList.length > 0 ?
                        requestList.map((request) => (
                            <tr key={request.requestId} className="font-light p-3 border-b border-gray-300">
                                <td className="p-3 ">{request.requestId}</td>
                                <td className="p-3 ">{request.fullName}</td>
                                <td className="p-3 max-w-56 whitespace-nowrap overflow-hidden text-ellipsis" title={request.gemstoneId} >{request.gemstoneId}</td>
                                <td className="p-3 ">{new Date(request.date).toLocaleDateString('en-GB')}</td>
                                <td className="p-3 ">{request.email}</td>
                                <td className="p-3 ">
                                    <CheckRespond
                                        request={request}
                                        onClick={() => handleRespondClick({ req: request })}
                                    />
                                </td>
                                <td className="p-3 my-auto flex gap-4 items-center">
                                    <input type='checkbox' defaultChecked={request.responded} onChange={() => handleRespondedChange(request.requestId, request.responded)} />
                                    <p className={loading ? 'text-black' : 'text-transparent'}>...</p>
                                </td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <th colSpan='7' className="p-3 text-left text-base font-medium">{message}</th>
                            </tr>)
                    }
                </tbody>
            </table>
            {product &&
                < ReqRespond isOpen={isReqModalOpen} onClose={closeModal} products={product} request={requestRespond} />
            }

            <div className="flex justify-center input_label">
                <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
            </div>
        </div>
    )
};
