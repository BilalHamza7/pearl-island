import axios from "axios";
import { useEffect, useState } from "react";
import { dateFilter } from "../components/dateFilter";
import ReqRespond from "./reqRespond";

//allow to change responded

export default function ManageReq() {

    const CheckRespond = ({ responded, onOpen }) => {
        return (
            <>
                <div className={`text-center rounded-lg font-medium cursor-pointer transition duration-300 ${responded ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'}`} onClick={onOpen}>
                    <p>{responded ? 'Responded' : 'Respond'}</p>
                </div>
            </>

        )
    };


    {/**Filters */ }
    const [gemstoneId, setGemstoneId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [requestId, setRequestId] = useState('');
    const [checkedRespond, setCheckedRespond] = useState('all');
    const [selectedDate, setSelectedDate] = useState('all');
    const [isClearHovered, setisClearHovered] = useState(false);

    {/**Modal */ }
    const [isReqModalOpen, setIsReqModalOpen] = useState(false);
    const [isResponded, setIsResponded] = useState(false);
    const [ids, setIds] = useState([]);
    const closeModal = () => setIsReqModalOpen(false);
    const openModal = ({ respond, ids }) => {
        setIsResponded(respond);
        setIsReqModalOpen(true);
        setIds(ids);
    };
    const setRespond = ({ val }) => {
        setIsResponded(val);
    }

    const [requests, setRequests] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [message, setMessage] = useState('');
    const [gemstoneIdList, setGemstoneIdList] = useState([]);
    const [test, setTest] = useState('');

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
                    setGemstoneIdList([]);
                    setRequests([]);
                } else if (error.response.status === 500) { // response status 500
                    console.error('Server error. Please try again later.');
                    setGemstoneIdList([]);
                    setRequests([]);
                } else { // other response status
                    console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                    setGemstoneIdList([]);
                    setRequests([]);
                }
            } else { // Network Errors
                console.error('Network error. Please check your connection.');
                setGemstoneIdList([]);
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

        // Filter by gemstoneID
        if (gemstoneId !== '') {
            filtered = filtered.filter(request => request.gemstoneId === gemstoneId);
        }

        // Filter by responded
        if (checkedRespond !== 'all') {
            filtered = filtered.filter(request => request.responded === checkedRespond ? true : false);
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
        console.log(requestList);
        if (filtered.length === 0 && requests.length !== 0) setMessage('No Requests Found!');
    }

    const handleClearFilterClick = () => {
        setGemstoneId('');
        setCustomerName('');
        setRequestId('');
        setCheckedRespond('all');
        setSelectedDate('all');
    };

    useEffect(() => {
        fetchPriceRequests();
        window.scroll(0, 0);
    }, [])

    useEffect(() => {
        handleRequestList();
        setTest(customerName, requestId);
    }, [requests, checkedRespond, selectedDate])

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
            {/* <datalist id="gemstoneIdList"> CHECK
                {gemstoneIdList.length > 0 ?
                    (
                        gemstoneIdList.map((gemstone) =>
                            <option key={gemstone.requestId} value={gemstone.gemstoneId} />
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
                <input type="text" list="gemstoneIdList" placeholder="Gemstone ID" value={gemstoneId} onChange={(event) => setGemstoneId(event.target.value)} className="input_style w-40" />

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
                    <option value='responded'>
                        Responded
                    </option>
                    <option value='to-respond'>
                        To Respond
                    </option>
                </select>


                <img
                    src={isClearHovered ? "/clearFilterFilled.png" : "/clearFilterOutlined.png"}
                    onMouseEnter={() => setisClearHovered(true)}
                    onMouseLeave={() => setisClearHovered(false)}
                    onClick={handleClearFilterClick}
                    className="w-7 cursor-pointer"
                />
            </div>
            <p>{test}</p>

            <table className="rounded-lg overflow-hidden border-b">
                <thead className="text-left bg-gray-200 text-xl font-montserrat tracking-widest">
                    <tr>
                        <th className="p-3">Request ID</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Gemstone ID</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">
                    {requestList.length > 0 ?
                        requestList.map((request) => (
                            <tr key={request.requestId} className="font-light p-3 border-b border-gray-300">
                                <td className="p-3 ">{request.requestId}</td>
                                <td className="p-3 ">{request.fullName}</td>
                                <td className="p-3 max-w-56 whitespace-nowrap overflow-hidden text-ellipsis" title="value" >{request.gemstoneId}</td>
                                <td className="p-3 ">{new Date(request.date).toLocaleDateString('en-GB')}</td>
                                <td className="p-3 ">{request.email}</td>
                                <td className="p-3 ">
                                    {/**Pass the whole request */}
                                    <CheckRespond
                                        request={request}
                                        onOpen={() => openModal({ responded: request.responded, ids: [...request.gemstoneId] })}
                                    />
                                </td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <th colSpan='6' className="p-3 text-left text-base font-medium">{message}</th>
                            </tr>)
                    }
                </tbody>
            </table>

            <ReqRespond isOpen={isReqModalOpen} onClose={closeModal} respond={isResponded} gemIds={ids} setRespond={setRespond} />

            <div className="flex justify-center input_label">
                <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
            </div>
        </div>
    )
};
