import axios from "axios";

import { useEffect, useRef, useState } from "react";
import FileBase from 'react-file-base64';
import { useNavigate } from "react-router-dom";
import ProductImages from "./productImage";

export const EditProduct = ({ isOpen, onClose, product }) => {

    const navigate = useNavigate();

    const [section, setSection] = useState('');
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [selectedKind, setSelectedKind] = useState('');
    const [weight, setWeight] = useState('');
    const [colour, setColour] = useState('');
    const [size, setSize] = useState('');
    const [selectedCut, setSelectedCut] = useState('');
    const [origin, setOrigin] = useState('');
    const [shape, setShape] = useState('');
    const [treatment, setTreatment] = useState('');
    const [clarity, setClarity] = useState('');
    const [certificate, setCertificate] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [selectedSoldStatus, setSelectedSoldStatus] = useState(false);

    const [activeImage, setActiveImage] = useState();
    const [isSeemoreHovered, setIsSeemoreHovered] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
            setActiveImage(images[0]);
        }
    };

    const updateProduct = async () => {

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
            setLoading(true);
            const response = await axios.put('http://localhost:5000/product/updateProduct', {
                productId: product.productId,
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
                soldStatus: selectedSoldStatus,
            });

            if (response.data) {
                console.log(response.data);
                setLoading(false);
                alert('Product Updated Successfully : ' + response.data);
                onClose();
                window.location.reload();
            }
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

    const handleDeleteProduct = async () => {
        const id = product.productId;
        const response = window.confirm(`Do you really want to delete the Product - ${id}?`);
        if (response) {
            try {
                setLoading(true);
                const response = await axios.delete(`http://localhost:5000/product/deleteProduct/${id}`);
                if (response.data.productId) {
                    setLoading(false);
                    alert(`Product with ID: ${response.data.productId} is successfully deleted!`);
                    onClose();
                    window.location.reload();
                }
            } catch (error) {
                alert('An Error Occured, Please Try Again!');
                setLoading(false);
                onClose();

                if (error.response) {
                    if (error.response.status === 404) { // response status 404
                        console.error(error.response.data.message || 'Could Not Delete Product.');
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
    };

    useEffect(() => {

        setSection(product.section);
        setName(product.name);
        setSummary(product.summary);
        setSelectedKind(product.kind);
        setWeight(product.weight);
        setColour(product.colour);
        setSize(product.size);
        setSelectedCut(product.cut);
        setOrigin(product.origin);
        setShape(product.shape);
        setTreatment(product.treatment);
        setClarity(product.clarity);
        setDescription(product.description);
        setCertificate(product.certificate !== null ? true : false);
        setSelectedCertificate(product.certificate ? product.certificate : null);
        setSelectedFiles(product.images.length > 0 ? [...product.images] : []);
        setSelectedSoldStatus(product.soldStatus);
        setActiveImage(product.images[0]);
    }, [product]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-50 overflow">
                <div className="flex flex-col gap-5 p-10 w-full h-full overflow-y-scroll bg-white">
                    <div className="flex w-full justify-between items-center">
                        <p className="text-xl w-fit font-montserrat hover:text-gray-600 transition duration-300 cursor-pointer " onClick={onClose}>&larr; Product List</p>
                        <div className="flex gap-5">
                            <label className="flex gap-2 w-fit items-center font-montserrat text-base hover:cursor-pointer">
                                <input type="checkbox" value="available" checked={selectedSoldStatus} onChange={() => setSelectedSoldStatus(!selectedSoldStatus)} />
                                Mark As Sold
                            </label>
                            <button className="p-2 bg-red-400 hover:bg-red-500 transition duration-300 text-lg font-saira rounded-md" onClick={handleDeleteProduct}>
                                Delete Product
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between gap-10 w-full h-fit">
                        <div className="flex flex-col gap-5 items-center w-full "> {/*Remove div when using for customer display */}
                            <div className="flex gap-10 w-full h-full ">
                                <img src={activeImage ? activeImage : '/addImage.jpg'} className="w-3/4 h-full object-contain " />
                                <div className="flex flex-col gap-3 justify-between">
                                    <img src={selectedFiles[0] ? selectedFiles[0] : '/addImage.jpg'} className="w-full h-full cursor-pointer border border-transparent hover:border-black transition duration-500" onClick={() => setActiveImage(selectedFiles[0])} />
                                    <img src={selectedFiles[1] ? selectedFiles[1] : '/addImage.jpg'} className="w-full h-full cursor-pointer border border-transparent hover:border-black transition duration-500" onClick={() => setActiveImage(selectedFiles[1])} />
                                    <img src={selectedFiles[2] ? selectedFiles[2] : '/addImage.jpg'} className="w-full h-full cursor-pointer border border-transparent hover:border-black transition duration-500" onClick={() => setActiveImage(selectedFiles[2])} />
                                    <button
                                        className="flex items-center justify-center text-xs font-saira text-center h-full w-full border hover:border-black border-transparent transition duration-500 relative bg-cover bg-center overflow-hidden"
                                        onMouseEnter={() => setIsSeemoreHovered(!isSeemoreHovered)}
                                        onMouseLeave={() => setIsSeemoreHovered(!isSeemoreHovered)}
                                        onClick={openModal}
                                        title="See More Images"
                                        style={{ backgroundImage: `url(${selectedFiles[3] ? selectedFiles[3] : '/addImage.jpg'})` }}
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
                                <FileBase
                                    type='file'
                                    multiple={true}
                                    onDone={(base64) => handleFileChange(base64)}
                                />
                                <ProductImages isOpen={isModalOpen} onClose={closeModal} images={selectedFiles} certificate={certificate ? selectedCertificate : null} />
                            </div>
                        </div>

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
                            <label className="flex gap-5 items-center font-montserrat text-xl">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name Here" className="font-saira w-96 text-3xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                                ID: <span className="font-saira">{product.productId}</span>
                            </label>
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

                            <div className={`flex w-full gap-10 mt-5 bg-${loading}-500`}>
                                <button className="button_style w-full" onClick={() => navigate('/manageProduct')}>Cancel</button>
                                <button onClick={updateProduct} className="button_style w-full">Save</button>
                            </div>


                        </div>
                    </div>
                    {loading && (
                        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 overflow">
                            <div className="flex w-full h-full items-center justify-center overflow-y-scroll bg-gray-600 bg-opacity-70 text-white text-2xl font-montserrat">LOADING...</div>
                        </div>
                    )}
                    <div className="flex flex-col items-center justify-center gap-5">
                        <p className="title_text">Description</p>
                        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description Here" className="px-2 py-1 w-full text-center font-montserrat text-lg resize-none focus:outline-none border-b-2 border-black" />
                    </div>
                </div>
            </div>
        </>
    )
};
