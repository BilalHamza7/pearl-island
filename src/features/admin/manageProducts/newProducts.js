import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductImages from "./productImage";

export default function NewProduct() {

    const navigate = useNavigate();

    const [section, setSection] = useState('blue');
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('This elegant <weight>-carat <colour> <kind>, ethically sourced from <Origin>, is a rare find. Expertly cut to maximize brilliance.');
    const [selectedKind, setSelectedKind] = useState('sapphire');
    const [weight, setWeight] = useState('');
    const [selectedColour, setselectedColour] = useState('blue');
    const [size, setSize] = useState('');
    const [selectedCut, setSelectedCut] = useState('Round');
    const [origin, setOrigin] = useState('');
    const [shape, setShape] = useState('');
    const [treatment, setTreatment] = useState('');
    const [clarity, setClarity] = useState('');
    const [certificate, setCertificate] = useState(false);
    const [description, setDescription] = useState('');

    const [activeImage, setActiveImage] = useState();

    const [isSeemoreHovered, setIsSeemoreHovered] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const maxFiles = 7;

    const handleFileChange = (event) => {

        const files = event.target.files;

        if (files.length > maxFiles) {
            alert(`You can only select up to ${maxFiles} images.`);
            setSelectedFiles([]); // Clear the state
            event.target.value = ''; // Clear the input
        } else {
            const fileArray = Array.from(files);
            const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
            setSelectedFiles(imageUrls);
        }
    };

    useEffect(() => {
        if (selectedFiles.length > 0) {
            setActiveImage(selectedFiles[0]);
        }
        else {
            setActiveImage("select images.");
        }
    }, [selectedFiles])


    return (
        <>
            <div className="flex flex-col gap-10 p-10 min-h-screen z-50 ">
                <p className="text-xl w-fit font-montserrat hover:text-gray-600 transition duration-300 cursor-pointer " onClick={() => navigate('/manageProduct')}>&larr; Product List</p>

                <div className="flex justify-between gap-10 w-full h-fit">
                    <div className="flex flex-col gap-5 items-center w-full "> {/*Remove div when using for customer display */}
                        <div className="flex gap-10 w-full h-full ">
                            <img src={activeImage ? activeImage : '/gemcopy.jpg'} className="w-3/4 h-full object-contain " />
                            <div className="flex flex-col gap-3 justify-between">
                                <img src={selectedFiles[0] ? selectedFiles[0] : '/gem3.jpg'} className="w-full h-full" />
                                <img src={selectedFiles[2] ? selectedFiles[2] : '/gem1.jpg'} className="w-full h-full " />
                                <img src={selectedFiles[3] ? selectedFiles[3] : '/gem3.jpg'} className="w-full h-full " />
                                <button
                                    className="flex items-center justify-center text-xs font-saira text-center h-full w-full border hover:border-black border-transparent transition duration-500 relative bg-cover bg-center overflow-hidden"
                                    onMouseEnter={() => setIsSeemoreHovered(!isSeemoreHovered)}
                                    onMouseLeave={() => setIsSeemoreHovered(!isSeemoreHovered)}
                                    onClick={openModal}
                                    title="See More Images"
                                    style={{ backgroundImage: `url(${selectedFiles[4] ? selectedFiles[4] : '/gemcopy.jpg'})` }}
                                >
                                    <img
                                        src={isSeemoreHovered ? "/seemoreFilled.png" : "/seemoreOutlined.png"}
                                        alt="Icon"
                                        className="w-12"
                                    />
                                </button>
                            </div>
                        </div>
                        <div>
                            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                            {/* <button className="button_style" onClick={openModal}>See All</button> */}
                            <ProductImages isOpen={isModalOpen} onClose={closeModal} images={selectedFiles} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name Here" className="font-saira w-96 text-3xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                        <textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Enter Summary Here" className="px-2 py-1 font-montserrat text-lg resize-none focus:outline-none border-b-2 border-black" />

                        <div className="flex justify-between">
                            <p className="title_text">Details:</p>
                            <label className="flex gap-3 items-center input_label">
                                Section:
                                <select onChange={(event) => setSection(event.target.value)} value={section} className="w-56 dropdown_style"> {/**Crimson Text */}
                                    <option value='blue'>
                                        Blue
                                    </option>
                                    <option value='red'>
                                        Red
                                    </option>
                                    <option value='yellow'>
                                        Yellow
                                    </option>
                                    <option value='pink'>
                                        Pink
                                    </option>
                                    <option value='purple'>
                                        Purple
                                    </option>
                                    <option value='green'>
                                        Green
                                    </option>
                                    <option value='peach'>
                                        Peach
                                    </option>
                                    <option value='bi-colour'>
                                        Bi-Colour
                                    </option>
                                    <option value='greay'>
                                        Grey
                                    </option>
                                    <option value='white'>
                                        White (Colourless)
                                    </option>
                                </select>
                            </label>
                        </div>

                        <div className="flex gap-10">
                            <div className="flex flex-col gap-5 w-full">
                                <label className="flex gap-3 items-center input_label">
                                    Kind:
                                    <select onChange={(event) => setSelectedKind(event.target.value)} value={selectedKind} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='sapphire'>
                                            Sapphire
                                        </option>
                                        <option value='spinel'>
                                            Spinel
                                        </option>
                                        <option value='padparadscha'>
                                            Padparadscha
                                        </option>
                                        <option value='ruby'>
                                            Ruby
                                        </option>
                                        <option value='Alexandrite'>
                                            Alexandrite
                                        </option>
                                        <option value='Garnet'>
                                            Garnet
                                        </option>
                                        <option value='Aquamarine'>
                                            Aquamarine
                                        </option>
                                        <option value='Chrysoberyl'>
                                            Chrysoberyl
                                        </option>
                                        <option value='Emerald'>
                                            Emerald
                                        </option>
                                        <option value='Other'>
                                            Others
                                        </option>
                                    </select>
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Weight(cts):
                                    <input type="text" value={weight} onChange={(event) => setWeight(event.target.value)} className="font-crimson w-full text-xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Colour:
                                    <select onChange={(event) => setselectedColour(event.target.value)} value={selectedColour} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='neutral'>
                                            Neutral
                                        </option>
                                        <option value='blue'>
                                            Blue
                                        </option>
                                        <option value='yellow'>
                                            Yellow
                                        </option>
                                        <option value='pink'>
                                            Pink
                                        </option>
                                        <option value='green'>
                                            Green
                                        </option>
                                        <option value='Alexandrite'>
                                            Alexandrite
                                        </option>
                                        <option value='Garnet'>
                                            Garnet
                                        </option>
                                    </select>
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Size(mm):
                                    <input type="text" value={size} onChange={(event) => setSize(event.target.value)} className="font-crimson w-full text-xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Cut:
                                    <select onChange={(event) => setSelectedCut(event.target.value)} value={selectedCut} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='step-cut'>
                                            Step Cut
                                        </option>
                                        <option value='step-cut'>
                                            Emerald Cut
                                        </option>
                                        <option value='radiant-cut'>
                                            Radiant Cut
                                        </option>
                                        <option value='ya-cut'>
                                            Ya
                                        </option>
                                        <option value='asscher-cut'>
                                            Asscher Cut
                                        </option>
                                        <option value='trilliant-cut'>
                                            Trilliant Cut
                                        </option>
                                        <option value='brilliant-cut'>
                                            Brilliant Cut (Diamond Cut)
                                        </option>
                                        <option value='fancy-cut'>
                                            Fancy Cut
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <label className="flex gap-3 items-center input_label">
                                    Origin:
                                    <select onChange={(event) => setOrigin(event.target.value)} value={origin} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='sapphire'>
                                            Sapphire
                                        </option>
                                        <option value='spinel'>
                                            Spinel
                                        </option>
                                        <option value='padparadscha'>
                                            Padparadscha
                                        </option>
                                        <option value='ruby'>
                                            Ruby
                                        </option>
                                        <option value='Alexandrite'>
                                            Alexandrite
                                        </option>
                                        <option value='Garnet'>
                                            Garnet
                                        </option>
                                        <option value='Aquamarine'>
                                            Aquamarine
                                        </option>
                                        <option value='Chrysoberyl'>
                                            Chrysoberyl
                                        </option>
                                        <option value='Emerald'>
                                            Emerald
                                        </option>
                                        <option value='Other'>
                                            Others
                                        </option>
                                    </select>
                                </label>
                                <label className="flex gap-3 items-center input_label">
                                    Shape:
                                    <select onChange={(event) => setShape(event.target.value)} value={shape} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='round'>
                                            Round
                                        </option>
                                        <option value='oval'>
                                            Oval
                                        </option>
                                        <option value='cushion'>
                                            Cushion
                                        </option>
                                        <option value='pear'>
                                            Pear
                                        </option>
                                        <option value='emerald'>
                                            Emerald
                                        </option>
                                        <option value='heart'>
                                            Heart
                                        </option>
                                    </select>
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Treatment:
                                    <select onChange={(event) => setTreatment(event.target.value)} value={treatment} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='no-heat'>
                                            Heat Only
                                        </option>
                                        <option value='un-heat'>
                                            Un-Heat
                                        </option>
                                    </select>
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Clarity:
                                    <select onChange={(event) => setClarity(event.target.value)} value={clarity} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='flawless'>
                                            Flawless (FL)
                                        </option>
                                        <option value='internally-flawless'>
                                            Internally Flawless (IF)
                                        </option>
                                        <option value='very-very-slightly-included'>
                                            Very, Very Slightly Included (VVS1 and VVS2)
                                        </option>
                                        <option value='very-slightly-included'>
                                            Very Slightly Included (VS1 and VS2)
                                        </option>
                                        <option value='slightly-included'>
                                            Slightly Included (SI1 and SI2)
                                        </option>
                                        <option value='included'>
                                            Included (I1, I2, and I3)
                                        </option>
                                    </select>
                                </label>

                                <div className="flex items-center gap-3">
                                    <label className="flex gap-3 w-fit items-center input_label">
                                        Certificate:
                                        <label className="flex gap-2 w-fit items-center font-montserrat text-base hover:cursor-pointer">
                                            <input type="checkbox" value="available" checked={certificate} onChange={() => setCertificate(!certificate)} />
                                            Available
                                        </label>
                                    </label>
                                    {certificate && <p className="font-saira text-sm underline hover:text-blue-500 cursor-pointer" onClick={() => alert('Attached')}>Attach</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full gap-10 mt-5">
                            <button className="button_style w-full" onClick={() => navigate('/manageProduct')}>Cancel</button>
                            <button className="button_style w-full">Save</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5">
                    <p className="title_text">Description</p>
                    <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description Here" className="px-2 py-1 w-full text-center font-montserrat text-lg resize-none focus:outline-none border-b-2 border-black" />
                </div>
            </div>
        </>
    )
};
