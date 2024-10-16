import { useEffect, useState } from "react";
import InqRespond from "./inqRespond";

function checkRespond(props) {

    if (props.value === true) { //true respond
        return (
            <>
                <div className="text-center bg-green-200 rounded-lg font-medium cursor-pointer hover:bg-green-300 transition duration-300" onClick={props.onOpen}>
                    <p>Responded</p>
                </div>
                <InqRespond isOpen={props.isOpen} onClose={props.onClose} />
            </>
        )
    } else {  //false respond
        return (
            <>
                <div className="text-center bg-red-200 rounded-lg font-medium cursor-pointer hover:bg-red-300 transition duration-300" onClick={props.onOpen}>
                    <p>Respond</p>
                </div>
                <InqRespond isOpen={props.isOpen} onClose={props.onClose} />
            </>

        )
    }
}

export default function ManageInq() {

    const [inquiryId, setInquiryId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [selectedRespond, setSelectedRespond] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [selectedDate, setSelectedDate] = useState('all');

    const [isInqModalOpen, setIsInqModalOpen] = useState(false);
    const openModal = () => setIsInqModalOpen(true);
    const closeModal = () => setIsInqModalOpen(false);

    const [test, setTest] = useState('');

    const [isClearHovered, setisClearHovered] = useState(false);

    const handleClearFilterClick = () => {
        setInquiryId('');
        setCustomerName('');
        setSelectedRespond('all');
        setSelectedSubject('all');
        setSelectedDate('all');
    };

    useEffect(() => {
        setTest('Customer Name: ' + customerName + '  Inquiry ID: ' + inquiryId + '  Subject: ' + selectedSubject + '  Respond:' + selectedRespond + '  Date: ' + selectedDate);

    }, [inquiryId, customerName, selectedRespond, selectedSubject, selectedDate])

    return (
        <div className="flex flex-col px-10 gap-5">
            <div className="flex gap-5 items-center ">
                <p className="font-montserrat ">Search By:</p> {/**Crimson Text */}
                <input type="text" placeholder="Customer Name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="input_style w-40" />
                <input type="text" placeholder="Inquiry ID" value={inquiryId} onChange={(event) => setInquiryId(event.target.value)} className="input_style w-40" />

                <select onChange={(event) => setSelectedSubject(event.target.value)} value={selectedSubject} className="w-40 dropdown_style">
                    <option value='all'>
                        All Subjects
                    </option>
                    <option value='custom-order'>
                        Custom Order
                    </option>
                    <option value='inquiry'>
                        Inquiry
                    </option>
                    <option value='suggestion'>
                        Suggestion
                    </option>
                    <option value='complaint'>
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
                    <option value='responded'>
                        Responded
                    </option>
                    <option value='to-respond'>
                        To Respond
                    </option>
                </select>

                <img
                    src="/searchOutlined.png"
                    className="w-7 cursor-pointer"
                />

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
                        <th className="p-3">Inquiry ID</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Subject</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">
                    <tr className="font-light p-3 border-b border-gray-300">
                        <td className="p-3 ">INQ-0001</td>
                        <td className="p-3 ">Bilal Hamza</td>
                        <td className="p-3 ">Custom Order</td>
                        <td className="p-3 ">bilalhamzazuhry@gmail.com</td>
                        <td className="p-3 ">01/10/2024</td>
                        <td className="p-3 ">{checkRespond({ value: false, onOpen: openModal, onClose: closeModal, isOpen: isInqModalOpen })}</td>
                    </tr>

                </tbody>
            </table>
            <div className="flex justify-between items-center font-montserrat text-lg">
                <p>&larr; Previous Page</p>
                <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
                <p>Next Page &rarr;</p>
            </div>
        </div>
    )
};
