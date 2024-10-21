import { useEffect, useState } from "react";
import ReqRespond from "./reqRespond";


export default function ManageReq() {

    const CheckRespond = (props) => {
        return (
            <>
                <div className={`text-center rounded-lg font-medium cursor-pointer transition duration-300 ${props.respond ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'}`} onClick={props.onOpen}>
                    <p>{props.respond ? 'Responded' : 'Respond'}</p>
                </div>
            </>

        )
    }

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
    const [ids, setIds] = useState([])
    const closeModal = () => setIsReqModalOpen(false);
    const openModal = ({ respond, ids }) => {
        setIsResponded(respond);
        setIsReqModalOpen(true);
        setIds(ids);
    };

    const [test, setTest] = useState('');

    const handleClearFilterClick = () => {
        setGemstoneId('');
        setCustomerName('');
        setRequestId('');
        setCheckedRespond('all');
        setSelectedDate('all');
    };

    useEffect(() => {
        setTest('Customer Name: ' + customerName + '  Request ID: ' + requestId + '  Gemstone ID: ' + gemstoneId + '  Respond? ' + checkedRespond + '  Date: ' + selectedDate);

    }, [gemstoneId, customerName, requestId, checkedRespond, selectedDate])


    return (
        <div className="flex flex-col px-10 gap-5">
            <div className="flex gap-5 items-center ">
                <p className="font-montserrat ">Search By:</p> {/**Crimson Text */}
                <input type="text" placeholder="Customer Name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="input_style w-40" />
                <input type="text" placeholder="Request ID" value={requestId} onChange={(event) => setRequestId(event.target.value)} className="input_style w-40" />
                <input type="text" placeholder="Gemstone ID" value={gemstoneId} onChange={(event) => setGemstoneId(event.target.value)} className="input_style w-40" />

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
                        <th className="p-3">Request ID</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Gemstone ID</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody className="text-left bg-gray-100 text-lg font-montserrat tracking-widest">
                    <tr className="font-light p-3 border-b border-gray-300">
                        <td className="p-3 ">REQ-0001</td>
                        <td className="p-3 ">Bilal Hamza</td>
                        <td className="p-3 max-w-56 whitespace-nowrap overflow-hidden text-ellipsis" title="value" >GEM-0001GEM-0001GEM-0001GEM-0001</td>
                        <td className="p-3 ">01/10/2024</td>
                        <td className="p-3 ">bilalhamzazuhry@gmail.com</td>
                        <td className="p-3 ">
                           {/**Pass the whole inquiry */}
                           <CheckRespond
                                respond={true}
                                onOpen={() => openModal({ respond: true, ids: ['GEM-0005', 'GEM-0006', 'GEM-0007'] })}
                                onClose={closeModal}
                                isOpen={isReqModalOpen}
                            />
                        </td>
                    </tr>
                    <tr className="font-light p-3 border-b border-gray-300">
                        <td className="p-3 ">REQ-0001</td>
                        <td className="p-3 ">Bilal Hamza</td>
                        <td className="p-3 max-w-56 whitespace-nowrap overflow-hidden text-ellipsis" title="value" >GEM-0001</td>
                        <td className="p-3 ">01/10/2024</td>
                        <td className="p-3 ">bilalhamzazuhry@gmail.com</td>
                        <td className="p-3 ">
                            {/**Pass the whole inquiry */}
                            <CheckRespond
                                respond={false}
                                onOpen={() => openModal({ respond: false, ids: ['GEM-0001'] })}
                                onClose={closeModal}
                                isOpen={isReqModalOpen}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <ReqRespond isOpen={isReqModalOpen} onClose={closeModal} respond={isResponded} gemIds={ids} />

            <div className="flex justify-center items-center font-montserrat text-lg">
                <p onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">&uarr; To Top</p>
            </div>
        </div>
    )
};
