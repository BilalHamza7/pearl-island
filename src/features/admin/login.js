import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordType, setPasswordType] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!email) {
            return { emailError: "Email is required." };
        } else if (!/\S+@\S+\.\S+/.test(email)) { // / => indicates start and end of regex, \S+ any characters except whitespace, @ \. => required characters
            return { emailError: "Email format is invalid. Eg: example@gmail.com" };
        }
        if (!password) {
            return { passwordError: "Password is required." };
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateForm();
        if (validation === true) {
            setLoading(true);
            setError({});
            try {
                const response = await axios.post('http://localhost:5000/admin/verifyAdmin',
                    {
                        email: email,
                        password: password,
                    }
                );
                if (response.data.session) {
                    navigate('/admin/adminDashboard');
                    setLoading(false);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                if (error.response) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    console.error('Network or server error:', error);
                    alert("Unable to reach the server. Please try again later.");
                }
            }
        }
        else {
            setError(validation);
        }
    };

    return (
        <>
            <div className="p-6 h-screen w-full flex flex-col">
                <img src="/bigLogo.png" alt="Logo" className="w-80" />
                <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                    <p className="title_text">Let's Get Started</p>
                    <p className="subtitle_text">Enter Your Email And Password To Start Managing!</p>

                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-96 my-3 gap-7">
                        <label className="flex flex-col h-24 gap-2 input_label">
                            Email:
                            <input type="text" className="input_style" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <p className={`font-saira text-sm ${error.emailError ? 'text-red-600' : 'text-transparent'}`}>{error.emailError}</p>
                        </label>
                        <label className="flex flex-col h-24 gap-2 input_label">
                            Password:
                            <div className="flex gap-3 items-center">
                                <input type={passwordType ? "text" : "password"} className="input_style w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <img src={passwordType ? "/showPassword.png" : "/hidePassword.png"} alt="show/hide password" onClick={() => setPasswordType(!passwordType)} className="w-7 h-7 cursor-pointer hover:scale-105 transition duration-300" />
                            </div>
                            <p className={`font-saira text-sm ${error.passwordError ? 'text-red-600' : 'text-transparent'}`}>{error.passwordError}</p>
                        </label>
                        <div className="flex w-full gap-5 justify-center ">
                            <button type="submit" className="button_style text-lg flex justify-center">
                                Submit
                            </button>
                            <img
                                src="/loadingGif.gif"
                                className={`w-7 h-7 ${!loading && 'opacity-0'}`}
                                alt="loading icon"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};
