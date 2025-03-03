import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProductDisplay from "./productDisplay";
import ImageViewer from "../../components/imageViewer";

export default function NewProduct() {

    const navigate = useNavigate();

    const [section, setSection] = useState('blue');
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('This elegant <weight>-carat <colour> <kind>, ethically sourced from <Origin>, is a rare find. Expertly cut to maximize brilliance.');
    const [selectedKind, setSelectedKind] = useState('sapphire');
    const [weight, setWeight] = useState('');
    const [colour, setColour] = useState('Royal Blue');
    const [size, setSize] = useState('');
    const [selectedCut, setSelectedCut] = useState('Round');
    const [origin, setOrigin] = useState('Ceylon');
    const [shape, setShape] = useState('round');
    const [treatment, setTreatment] = useState('un-heat');
    const [clarity, setClarity] = useState('slightly-included');
    const [certificate, setCertificate] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const coloursList = [
        'Blue',
        'Royal Blue',
        'Deep Royal Blue',
        'Cornflower Blue',
        'Vivid Blue',
        'Light Blue',
        'Greenish Blue',
        'Yellow',
        'Orange',
        'Orangy Yellow',
        'Yellowish Orange',
        'Golden Yellow',
        'Light Yellow',
        'Pale Yellow',
        'Pink',
        'Reddish Pink',
        'Vivid Pink',
        'Purplish Pink',
        'Red',
        'Pigeon Blood',
        'Vivid Red',
        'Purple',
        'Deep Purple',
        'Violet',
        'Violetish Purple',
        'Purplish Violet',
        'Light Purple',
        'Green',
        'Teal',
        'Blueish Green',
        'Yellowish Green',
        'Yellow/Blue Green',
        'Padparadscha',
        'Peach',
        'White',
        'Brown',
        'Light Brown',
        'Yellow-Blue',
        'Green-Yellow',
        'Blue-Green',
        'Grey',
    ];

    const [isSeeMoreHovered, setIsSeeMoreHovered] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const maxFiles = 7;

    const certificateInputRef = useRef(null); // to trigger click of hidden input for certificate

    const handleAddCertificate = () => {
        certificateInputRef.current.click();
    }

    const handleCertificateFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedCertificate(reader.result);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCertificate = (e) => {
        setCertificate(!certificate);
        if (certificate === false) setSelectedCertificate(null);
    }

    const handleFileChange = (base64) => {

        if (base64.length > maxFiles) {
            setSelectedFiles([]);
            return alert(`You can only select up to ${maxFiles} images.`);
        }
        else {
            let images = [];
            base64.map((file, index) => {
                images[index] = file.base64;
            })
            setSelectedFiles(images);
        }
    };

    const handleNewProduct = async () => {

        if (name === '') {
            alert('Please enter a valid name');
            return;
        }
        else if (summary === '') {
            alert('Please enter a brief summary');
            return;
        }
        else if (weight === '') {
            alert('Please enter the weight');
            return;
        }
        else if (colour === '') {
            alert('Please enter the colour');
            return;
        }
        else if (size === '') {
            alert('Please enter the size');
            return;
        }
        else if (description === '') {
            alert('Please enter a description');
            return;
        }
        else if (certificate === true && selectedCertificate === null) {
            alert('Please attach an image of the certificate');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/product/saveProduct', {
                name: name,
                kind: selectedKind,
                weight: weight,
                colour: colour,
                section: section,
                size: size,
                cut: selectedCut,
                origin: origin,
                shape: shape,
                treatment: treatment,
                clarity: clarity,
                certificate: selectedCertificate,
                summary: summary,
                description: description,
                images: selectedFiles,
                soldStatus: false,
            });
            console.log(response.data);
            alert('Product Saved Successfully : ' + response.data);
            navigate('/manageProduct');
        } catch (error) {
            alert('An Error Occured, Please Try Again!');
            if (error.response) {
                if (error.response.status === 404) { // response status 404
                    console.error(error.response.data.message || 'Could Not Save Product.');
                } else if (error.response.status === 500) { // response status 500
                    console.error('Server error. Please try again later.');
                } else { // other response status
                    console.error(`Unexpected error: ${error.response.status}. Please try again later.`);
                }
            } else { // Network Errors
                console.error('Network error. Please check your connection.');
            }
        }
    }

    return (
        <>
            <div className="flex flex-col gap-10 p-10 min-h-screen z-50 ">
                <p className="text-xl w-fit font-montserrat hover:text-gray-600 transition duration-300 cursor-pointer " onClick={() => navigate('/admin/manageProduct')}>&larr; Product List</p>
                <div className="flex justify-between gap-10 w-full ">
                    <ProductDisplay selectedFiles={selectedFiles} isSeeMoreHovered={isSeeMoreHovered} handleSeeMoreHovered={() => setIsSeeMoreHovered(!isSeeMoreHovered)} openModal={openModal} handleFileChange={(base64) => handleFileChange(base64)} />
                    <ImageViewer isOpen={isModalOpen} onClose={closeModal} images={selectedFiles} certificate={certificate ? selectedCertificate : null} />

                    <datalist className="" id="coloursList"> {/**Dropdown of Colour Search */}
                        <option value="Blue" />
                        <option value="Royal Blue" />
                        <option value="Deep Royal Blue" />
                        <option value="Cornflower Blue" />
                        <option value="Vivid Blue" />
                        <option value="Light Blue" />
                        <option value="Greenish Blue" />
                        <option value="Yellow" />
                        <option value="Orange" />
                        <option value="Orangy Yellow" />
                        <option value="Yellowish Orange" />
                        <option value="Golden Yellow" />
                        <option value="Light Yellow" />
                        <option value="Pale Yellow" />
                        <option value="Pink" />
                        <option value="Reddish Pink" />
                        <option value="Vivid Pink" />
                        <option value="Purplish Pink" />
                        <option value="Red" />
                        <option value="Pigeon Blood" />
                        <option value="Vivid Red" />
                        <option value="Purple" />
                        <option value="Deep Purple" />
                        <option value="Violet" />
                        <option value="Violetish Purple" />
                        <option value="Purplish Violet" />
                        <option value="Light Purple" />
                        <option value="Green" />
                        <option value="Teal" />
                        <option value="Blueish Green" />
                        <option value="Yellowish Green" />
                        <option value="Yellow/Blue Green" />
                        <option value="Padparadscha" />
                        <option value="Peach" />
                        <option value="White" />
                        <option value="Brown" />
                        <option value="Light Brown" />
                        <option value="Yellow-Blue" />
                        <option value="Green-Yellow" />
                        <option value="Blue-Green" />
                        <option value="Grey" />
                    </datalist>

                    <div className="flex flex-col gap-5 w-full">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name Here" className="font-saira w-96 text-3xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                        <textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Enter Summary Here" className="px-2 py-1 font-montserrat text-lg resize-none focus:outline-none border-b-2 border-black" />

                        <div className="flex justify-between">
                            <p className="title_text">Details:</p>
                            <label className="flex gap-3 items-center input_label">
                                Section:
                                <select onChange={(event) => setSection(event.target.value)} value={section} className="w-56 dropdown_style"> {/**Crimson Text */}
                                    <option value='Blue'>
                                        Blue
                                    </option>
                                    <option value='Red'>
                                        Red
                                    </option>
                                    <option value='Yellow'>
                                        Yellow
                                    </option>
                                    <option value='Pink'>
                                        Pink
                                    </option>
                                    <option value='Purple'>
                                        Purple
                                    </option>
                                    <option value='Green'>
                                        Green
                                    </option>
                                    <option value='Peach'>
                                        Peach
                                    </option>
                                    <option value='Bi-Colour'>
                                        Bi-Colour
                                    </option>
                                    <option value='Grey'>
                                        Grey
                                    </option>
                                    <option value='White (Colourless)'>
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
                                        <option value='Sapphire'>
                                            Sapphire
                                        </option>
                                        <option value='Spinel'>
                                            Spinel
                                        </option>
                                        <option value='Padparadscha'>
                                            Padparadscha
                                        </option>
                                        <option value='Ruby'>
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
                                            Other
                                        </option>
                                    </select>
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Weight(cts):
                                    <input type="text" value={weight} onChange={(event) => setWeight(event.target.value)} className="font-crimson w-full text-xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                                </label>

                                {/* Add Colour Querying */}
                                <label className="flex gap-3 items-center input_label">
                                    Colour:
                                    <input type="text" list='coloursList' value={colour} onChange={(event) => setColour(event.target.value)} className="font-crimson w-full text-xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Size(mm):
                                    <input type="text" value={size} onChange={(event) => setSize(event.target.value)} className="font-crimson w-full text-xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Cut:
                                    <select onChange={(event) => setSelectedCut(event.target.value)} value={selectedCut} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='Step Cut'>
                                            Step Cut
                                        </option>
                                        <option value='Modified Step Cut'>
                                            Modified Step Cut
                                        </option>
                                        <option value='Emerald Cut'>
                                            Emerald Cut
                                        </option>
                                        <option value='Radiant Cut'>
                                            Radiant Cut
                                        </option>
                                        <option value='Asscher Cut'>
                                            Asscher Cut
                                        </option>
                                        <option value='Trilliant Cut'>
                                            Trilliant Cut
                                        </option>
                                        <option value='Brilliant Cut (Diamond Cut)'>
                                            Brilliant Cut (Diamond Cut)
                                        </option>
                                        <option value='Fancy Cut'>
                                            Fancy Cut
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <label className="flex gap-3 items-center input_label">
                                    Origin:
                                    <select onChange={(event) => setOrigin(event.target.value)} value={origin} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='n/a'>
                                            N/A
                                        </option>
                                        <option value='Ceylon'>
                                            Ceylon
                                        </option>
                                        <option value='Mozambique'>
                                            Mozambique
                                        </option>
                                        <option value='Madagascar'>
                                            Madagascar
                                        </option>
                                        <option value='Tanzania'>
                                            Tanzania
                                        </option>
                                        <option value='Kenya'>
                                            Kenya
                                        </option>
                                        <option value='Kashmir (India)'>
                                            Kashmir (India)
                                        </option>
                                        <option value='Burma'>
                                            Burma
                                        </option>
                                        <option value='Australia'>
                                            Australia
                                        </option>
                                        <option value='Nigeria'>
                                            Nigeria
                                        </option>
                                        <option value='Thailand'>
                                            Thailand
                                        </option>
                                        <option value='Afghanistan'>
                                            Afghanistan
                                        </option>
                                        <option value='Brazil'>
                                            Brazil
                                        </option>
                                        <option value='Ethiopia'>
                                            Ethiopia
                                        </option>
                                    </select>
                                </label>
                                <label className="flex gap-3 items-center input_label">
                                    Shape:
                                    <select onChange={(event) => setShape(event.target.value)} value={shape} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='Round'>
                                            Round
                                        </option>
                                        <option value='Oval'>
                                            Oval
                                        </option>
                                        <option value='Antique Cushion'>
                                            Antique Cushion
                                        </option>
                                        <option value='Square Antique Cushion'>
                                            Square Antique Cushion
                                        </option>
                                        <option value='Heart'>
                                            Heart
                                        </option>
                                        <option value='Drop/Pear'>
                                            Drop/Pear
                                        </option>
                                        <option value='Rectangle'>
                                            Rectangle
                                        </option>
                                        <option value='Square'>
                                            Square
                                        </option>
                                        <option value='Triangle'>
                                            Triangle
                                        </option>
                                        <option value='Marquise'>
                                            Marquise
                                        </option>
                                        <option value='Kite'>
                                            Kite
                                        </option>
                                        <option value='Free Form'>
                                            Free Form
                                        </option>
                                    </select>
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Treatment:
                                    <select onChange={(event) => setTreatment(event.target.value)} value={treatment} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='Heat Only'>
                                            Heat Only
                                        </option>
                                        <option value='Un-Heat'>
                                            Un-Heat
                                        </option>
                                    </select>
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Clarity:
                                    <select onChange={(event) => setClarity(event.target.value)} value={clarity} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='Flawless (FL)'>
                                            Flawless (FL)
                                        </option>
                                        <option value='Internally Flawless (IF)'>
                                            Internally Flawless (IF)
                                        </option>
                                        <option value='Very, Very Slightly Included (VVS)'>
                                            Very, Very Slightly Included (VVS)
                                        </option>
                                        <option value='Very Slightly Included (VS)'>
                                            Very Slightly Included (VS)
                                        </option>
                                        <option value='Slightly Included (SI)'>
                                            Slightly Included (SI)
                                        </option>
                                        <option value='Included'>
                                            Included
                                        </option>
                                    </select>
                                </label>

                                <div className="flex items-center gap-3">
                                    <label className="flex gap-3 w-fit items-center input_label">
                                        Certificate:
                                        <label className="flex gap-2 w-fit items-center font-montserrat text-base hover:cursor-pointer">
                                            <input type="checkbox" value="available" checked={certificate} onChange={(e) => handleCertificate(e)} />
                                            Available
                                        </label>
                                    </label>
                                    {certificate && <p className="font-saira text-sm underline hover:text-blue-500 cursor-pointer" onClick={handleAddCertificate}>Attach</p>}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={certificateInputRef}
                                        className='hidden'
                                        onChange={(e) => handleCertificateFileChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full gap-10 mt-5">
                            <button className="button_style w-full" onClick={() => navigate('/admin/manageProduct')}>Cancel</button>
                            <button onClick={handleNewProduct} className="button_style w-full">Save</button>
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
