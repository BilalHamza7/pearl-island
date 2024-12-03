import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                <p className="subtitle_text w-96">Must Be At Least 8 Characters</p>

                <form onSubmit={handleNewPassword} className="flex flex-col w-2/6 mt-5 gap-7">
                    <label className="flex flex-col gap-2 input_label">
                        Password:
                        <input type="type" value={password} onChange={(e) => setPassword(e.target.value)} className="input_style" />
                    </label>
                    <label className="flex flex-col gap-2 input_label">
                        Confirm Password:
                        <input type="type" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input_style" />
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
