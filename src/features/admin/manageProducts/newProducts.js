import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {

    const navigate = useNavigate();

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
    const [certificate, setSertificate] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-10 p-10  min-h-screen w-screen z-50 ">
                <p className="text-xl w-fit font-montserrat hover:text-gray-600 transition duration-300 cursor-pointer" onClick={() => navigate('/manageProduct')}>&larr; Product List</p>

                <div className="flex justify-between gap-10 w-full">
                    <div className="w-full h-full">
                        <img src="/logo192.png" className="w-full h-full border" />
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name Here" className="font-saira w-96 text-3xl px-2 py-1 focus:outline-none border-b-2 border-black" />
                        <textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Enter Summary Here"  className="px-2 py-1 font-montserrat text-lg resize-none focus:outline-none border-b-2 border-black" />

                        <p className="title_text">Details:</p>


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
                                    <input type="text" value={weight} onChange={(event) => setWeight(event.target.value)} className="font-crimson w-full text-lg px-2 py-1 focus:outline-none border-b-2 border-black" />
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
                                    Size:
                                    <input type="text" value={size} onChange={(event) => setSize(event.target.value)} className="font-crimson w-full text-lg px-2 py-1 focus:outline-none border-b-2 border-black" />
                                </label>

                                <label className="flex gap-3 items-center input_label">
                                    Cut:
                                    <select onChange={(event) => setSelectedCut(event.target.value)} value={selectedCut} className="w-full dropdown_style"> {/**Crimson Text */}
                                        <option value='round'>
                                            Round
                                        </option>
                                        <option value='cushion'>
                                            Cushion
                                        </option>
                                        <option value='oval'>
                                            Oval
                                        </option>
                                        <option value='emerald'>
                                            Emerald
                                        </option>
                                        <option value='pear'>
                                            Pear
                                        </option>
                                        <option value='princess'>
                                            Princess
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <label className="flex gap-3 items-center input_label">
                                    Origin:
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

                                <label className="flex gap-3 items-center input_label">
                                    Certificate:

                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
