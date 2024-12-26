import { useEffect, useState } from "react";
import axios from 'axios';
import InqRespond from "./inqRespond";
import { dateFilter } from "../../../components/dateFilter";


export default function ManageInq() {

    const CheckRespond = ({ inquiry, onClick }) => {
        return (
            <>
                <div className={`text-center rounded-lg font-medium cursor-pointer transition duration-300 ${inquiry.responded ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'}`} onClick={onClick}>
                    <p>{inquiry.responded ? 'Responded' : 'Respond'}</p>
                </div>
            </>

        )
    };

    const [inquiryId, setInquiryId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [selectedRespond, setSelectedRespond] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [selectedDate, setSelectedDate] = useState('all');

    const [isClearHovered, setisClearHovered] = useState(false);

    const [isInqModalOpen, setIsInqModalOpen] = useState(false);
    const [inquiryRespond, setInquiryRespond] = useState({});
    const [inquirys, setInquirys] = useState([]);
    const [inquiryList, setInquiryList] = useState([]); // to list requests and filter
    const [message, setMessage] = useState(''); // when fetching inquiry
    const [loading, setLoading] = useState(false); // when updating status

    const closeModal = () => setIsInqModalOpen(false);

    const openModal = ({ inq }) => {
        setInquiryRespond(inq);
        setIsInqModalOpen(true);
    };

    const handleClearFilterClick = () => {
        setInquiryId('');
        setCustomerName('');
        setSelectedRespond('all');
        setSelectedSubject('all');
        setSelectedDate('all');
        fetchInquiry();
    };

    const fetchInquiry = async () => {
        try {
            setMessage('Loading...');
            const response = await axios.get('http://localhost:5000/inquiry/getInquirys');
            if (response.status === 200) {
                setInquirys(response.data.inquirys);
                console.log('getInquirys Successful');
            }
        } catch (error) {
            if (error.response) {
                setMessage('No inquiries To Show!');
                if (error.response.status === 404) { // response status 404
                    console.error(error.response.data.message || 'No inquiries available.');
                    setInquirys([]);
                } else if (error.response.status === 500) { // response status 500
                    console.error('Server error. Please try again later.');
                    setInquirys([]);
                } else { // other response status
                    console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                    setInquirys([]);
                }
            } else { // Network Errors
                console.error('Network error. Please check your connection.');
                setInquirys([]);
            }
        }
    };

    const handleInquiryList = async () => {
        let filtered = [...inquirys];

        // Filter by customer fullName
        if (customerName !== '') {
            filtered = filtered.filter(inquiry => inquiry.fullName === customerName);
        }

        // Filter by RequestID
        if (inquiryId !== '') {
            filtered = filtered.filter(inquiry => inquiry.inquiryId === inquiryId);
        }

        // Filter by responded
        if (selectedRespond !== 'all') {
            const res = selectedRespond === 'true';
            filtered = filtered.filter(inquiry => inquiry.responded === res);
        }

        // Filter by subject
        if (selectedSubject !== 'all') {
            filtered = filtered.filter(inquiry => inquiry.subject === selectedSubject);
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
                filtered = filtered.filter(inquiry => {
                    const date = new Date(inquiry.date);
                    return date >= $gte && date < $lt;
                });
            }
        }

        setInquiryList(filtered);
        if (filtered.length === 0 && inquirys.length !== 0) setMessage('No inquiry Found!');
    }

    const handleRespondedChange = async (id, value) => {
        try {
            setLoading(true);
            const response = await axios.put('http://localhost:5000/inquiry/updateInquiry', {
                id: id,
                responded: !value,
            });
            if (response.status === 200) {
                fetchInquiry();
                setLoading(false);
                console.log('updateInquiry Successful');
            }
        } catch (error) {
            if (error) {
                console.error('error occured: ', error.message);
            }
        }
    }

    useEffect(() => {
        fetchInquiry();
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        handleInquiryList();
    }, [inquirys, selectedSubject, selectedRespond, selectedDate]);

    return (
        <div className="flex flex-col px-10 gap-5">
            <datalist id="customerNameList">
                {inquirys.length > 0 ?
                    (
                        inquirys.map((inquiry) =>
                            <option key={inquiry.inquiryId} value={inquiry.fullName} />
                        )
                    ) : (
                        <option value="none" />
                    )
                }
            </datalist>
            <datalist id="inquiryIdList">
                {inquirys.length > 0 ?
                    (
                        inquirys.map((inquiry) =>
                            <option key={inquiry.inquiryid} value={inquiry.inquiryId} />
                        )
                    ) : (
                        <option value="none" />
                    )
                }
            </datalist>
            <div className="flex gap-5 items-center ">
                <p className="font-montserrat ">Search By:</p> {/**Crimson Text */}
                <input type="text" list='customerNameList' placeholder="Customer Name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="input_style w-40" />
                <input type="text" list='inquiryIdList' placeholder="Inquiry ID" value={inquiryId} onChange={(event) => setInquiryId(event.target.value)} className="input_style w-40" />

                <img
                    src="/searchOutlined.png"
                    className="w-7 cursor-pointer"
                    onClick={handleInquiryList}
                />

                <select onChange={(event) => setSelectedSubject(event.target.value)} value={selectedSubject} className="w-40 dropdown_style">
                    <option value='all'>
                        All Subjects
                    </option>
                    <option value='Custom Order'>
                        Custom Order
                    </option>
                    <option value='Inquiry'>
                        Inquiry
                    </option>
                    <option value='Suggestion'>
                        Suggestion
                    </option>
                    <option value='Complaint'>
                        Complaint
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

                <select onChange={(event) => setSelectedRespond(event.target.value)} value={selectedRespond} className="w-40 dropdown_style">
                    <option value='all'>
                        All Inquiries
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
                        <th className="p-3">Inquiry ID</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Subject</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Flag</th>
                    </tr>
                </thead>
                <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">
                    {inquiryList.length > 0 ?
                        inquiryList.map((inquiry) => (
                            <tr key={inquiry.inquiryId} className="font-light p-3 border-b border-gray-300">
                                <td className="p-3 ">{inquiry.inquiryId}</td>
                                <td className="p-3 ">{inquiry.fullName}</td>
                                <td className="p-3 ">{inquiry.subject}</td>
                                <td className="p-3 ">{inquiry.email}</td>
                                <td className="p-3 ">{new Date(inquiry.date).toLocaleDateString('en-GB')}</td>
                                <td className="p-3 ">
                                    <CheckRespond
                                        inquiry={inquiry}
                                        onClick={() => openModal({ inq: inquiry })}
                                    />
                                </td>
                                <td className="p-3 my-auto flex gap-4 items-center">
                                    <input type='checkbox' defaultChecked={inquiry.responded} onChange={() => handleRespondedChange(inquiry.inquiryId, inquiry.responded)} />
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

            <InqRespond isOpen={isInqModalOpen} onClose={closeModal} inquiry={inquiryRespond} />

            <div className="flex justify-center input_label">
                <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
            </div>
        </div>
    )
};
