import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordType, setPasswordType] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState(false);

    const { email } = location.state || {};

    const handleNewPassword = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            alert('Password must contain atleast 8 characters');
            return;
        } else if (password !== confirmPassword) {
            alert('Password is not matching');
            return;
        }

        try {
            const response = await axios.put('http://localhost:5000/admin/updatePassword', {
                email,
                password
            })
            if (response) {
                alert(response.data.message);
                navigate('/admin');
            }
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    }

    return (
        <div className="p-6 h-screen w-full flex flex-col">
            <img src="/bigLogo.png" alt="Logo" className="w-80" />
            <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                <p className="title_text">Set New Password</p>
                <p className="subtitle_text">Enter A New Password With Atleast Atleast 8 Characters</p>

                <form onSubmit={handleNewPassword} className="flex flex-col w-2/6 mt-7 gap-7">
                    <label className="flex flex-col gap-2 input_label">
                        Password:
                        <div className="flex gap-3 items-center">
                            <input type={passwordType ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input_style w-full" />
                            <img src={passwordType ? "/showPassword.png" : "/hidePassword.png"} onClick={() => setPasswordType(!passwordType)} className="w-7 h-7 cursor-pointer hover:scale-105 transition duration-300" />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2 input_label">
                        Confirm Password:
                        <div className="flex gap-3 items-center">
                            <input type={confirmPasswordType ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input_style w-full" />
                            <img src={confirmPasswordType ? "/showPassword.png" : "/hidePassword.png"} onClick={() => setConfirmPasswordType(!confirmPasswordType)} className="w-7 h-7 cursor-pointer hover:scale-105 transition duration-300 shadow-black" />
                        </div>
                    </label>
                    <div className="flex justify-center ">
                        <button type="submit" className="button_style text-lg flex justify-center">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};
