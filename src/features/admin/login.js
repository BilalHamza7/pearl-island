import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            try {
                const response = await axios.post('http://localhost:5000/admin/verifyAdmin',
                    {
                        email: email,
                        password: password,
                    }
                );
                if (response.data.adminId) {
                    navigate('/adminDashboard');
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
                    <p className="subtitle_text">Enter your username and password to start managing!</p>

                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-96 my-3 gap-7">
                        <label className="flex flex-col h-24 gap-2 input_label">
                            Email:
                            <input type="text" className="input_style" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <p className={`font-saira text-sm ${error.emailError ? 'text-red-600' : 'text-transparent'}`}>{error.emailError}</p>
                        </label>
                        <label className="flex flex-col h-24 gap-2 input_label">
                            Password:
                            <input type="text" className="input_style" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <p className={`font-saira text-sm ${error.passwordError ? 'text-red-600' : 'text-transparent'}`}>{error.passwordError}</p>
                        </label>
                        <div className="flex w-full gap-5 justify-center ">
                            <button type="submit" className="button_style text-lg flex justify-center">
                                Submit
                            </button>
                            <button className="hover:bg-gray-300 p-2" onClick={() => navigate('/createAdmin')}>
                                Create Admin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};
