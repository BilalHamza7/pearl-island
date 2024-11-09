import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductImages from "./productImage";

export const EditProduct = ({ isOpen, onClose, product }) => {

    const navigate = useNavigate();

    const [section, setSection] = useState(product.section);
    const [name, setName] = useState(product.name);
    const [summary, setSummary] = useState(product.summary);
    const [selectedKind, setSelectedKind] = useState(product.kind);
    const [weight, setWeight] = useState(product.weight);
    const [colour, setColour] = useState(product.colour);
    const [size, setSize] = useState(product.size);
    const [selectedCut, setSelectedCut] = useState(product.cut);
    const [origin, setOrigin] = useState(product.origin);
    const [shape, setShape] = useState(product.shape);
    const [treatment, setTreatment] = useState(product.treatment);
    const [clarity, setClarity] = useState(product.clarity);
    const [certificate, setCertificate] = useState(product.certificate ? true : false);
    const [description, setDescription] = useState(product.description);
    const [selectedCertificate, setSelectedCertificate] = useState(product.certificate);

    const [activeImage, setActiveImage] = useState();
    const [isSeemoreHovered, setIsSeemoreHovered] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [selectedFiles, setSelectedFiles] = useState(product.images.length > 0 ? [...product.images] : []);
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

    const handleFileChange = async (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);

        if (files.length > maxFiles) {
            alert(`You can only select up to ${maxFiles} images.`);
            setSelectedFiles([]);
            event.target.value = '';
        } else {
            const promises = fileArray.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result); // Resolve with Base64 string
                    reader.onerror = reject; // Handle errors
                    reader.readAsDataURL(file); // Convert image to Base64
                });
            });
            try {
                const base64Images = await Promise.all(promises); // Wait for all images to be read
                setSelectedFiles(base64Images); // Set state with all Base64 images
            } catch (error) {
                console.error('Error reading files:', error);
            }
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
            alert('Product Saved Successfully : ' + response.data.product.productId);
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

    const handleModalClose = () => {
        setName('');
        setSummary('');
    };

    useEffect(() => {
        if (selectedFiles.length > 0) {
            setActiveImage(selectedFiles[0]);
        }
    }, [selectedFiles])


    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-50 overflow">
                <div className="flex flex-col gap-5 p-10 w-full h-full overflow-y-scroll bg-white">
                    <p className="text-xl w-fit font-montserrat hover:text-gray-600 transition duration-300 cursor-pointer " onClick={handleModalClose}>&larr; Product List</p>
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
                                <input type="file" accept="image/*" multiple onChange={handleFileChange} />
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
                                            <option value='step-cut'>
                                                Step Cut
                                            </option>
                                            <option value='modified-step-cut'>
                                                Modified Step Cut
                                            </option>
                                            <option value='step-cut'>
                                                Emerald Cut
                                            </option>
                                            <option value='radiant-cut'>
                                                Radiant Cut
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
                                            <option value='n/a'>
                                                N/A
                                            </option>
                                            <option value='ceylon'>
                                                Ceylon
                                            </option>
                                            <option value='mozambique'>
                                                Mozambique
                                            </option>
                                            <option value='madagascar'>
                                                Madagascar
                                            </option>
                                            <option value='tanzania'>
                                                Tanzania
                                            </option>
                                            <option value='kenya'>
                                                Kenya
                                            </option>
                                            <option value='kashmir'>
                                                Kashmir (India)
                                            </option>
                                            <option value='burma'>
                                                Burma
                                            </option>
                                            <option value='australia'>
                                                Australia
                                            </option>
                                            <option value='nigeria'>
                                                Nigeria
                                            </option>
                                            <option value='thailand'>
                                                Thailand
                                            </option>
                                            <option value='afghanistan'>
                                                Afghanistan
                                            </option>
                                            <option value='brazil'>
                                                Brazil
                                            </option>
                                            <option value='ethiopia'>
                                                Ethiopia
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
                                            <option value='antique-cushion'>
                                                Antique Cushion
                                            </option>
                                            <option value='square-antique-cushion'>
                                                Square Antique Cushion
                                            </option>
                                            <option value='heart'>
                                                Heart
                                            </option>
                                            <option value='drop-pear'>
                                                Drop/Pear
                                            </option>
                                            <option value='reactangle'>
                                                Rectangle
                                            </option>
                                            <option value='square'>
                                                Square
                                            </option>
                                            <option value='triangle'>
                                                Triangle
                                            </option>
                                            <option value='marquise'>
                                                Marquise
                                            </option>
                                            <option value='kite'>
                                                Kite
                                            </option>
                                            <option value='freeform'>
                                                freeform
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
                                                Very, Very Slightly Included (VVS)
                                            </option>
                                            <option value='very-slightly-included'>
                                                Very Slightly Included (VS)
                                            </option>
                                            <option value='slightly-included'>
                                                Slightly Included (SI)
                                            </option>
                                            <option value='included'>
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
                                <button className="button_style w-full" onClick={() => navigate('/manageProduct')}>Cancel</button>
                                <button onClick={handleNewProduct} className="button_style w-full">Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5">
                        <p className="title_text">Description</p>
                        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description Here" className="px-2 py-1 w-full text-center font-montserrat text-lg resize-none focus:outline-none border-b-2 border-black" />
                    </div>
                </div>
            </div>
        </>
    )
};