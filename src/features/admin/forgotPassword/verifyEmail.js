import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {

    const navigate = useNavigate();
    const location = useLocation();

    const [verifyOtp, setVerifyOtp] = useState('');

    const { otp, email } = location.state || {};

    const handleEmailVerification = (e) => {
        e.preventDefault();
        if (verifyOtp == otp) {
            navigate('/admin/newPassword', { state: { email: email } });
        } else {
            alert('The OTP Code you entered is incorrect!');
        }
    }

    return (
        <div className="p-6 h-screen w-full flex flex-col">
            <img src="/bigLogo.png" alt="Logo" className="w-80" />
            <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                <p className="title_text">Password Reset</p>
                <p className="subtitle_text">We Sent A Code To <span className="font-medium italic">{email}</span></p>

                <form onSubmit={handleEmailVerification} className="flex flex-col w-1/6 mt-5 gap-7">
                    <label className="flex flex-col gap-3 input_label">
                        Enter Code:
                        <input type="type" className="input_style" value={verifyOtp} onChange={(e) => setVerifyOtp(e.target.value)} />
                    </label>
                    <div className="flex flex-col items-center gap-5">
                        <button type="submit" className="button_style text-lg flex justify-center">
                            Verify
                        </button>
                        <p className="subtitle_text cursor-pointer" onClick={() => navigate('/admin')}>&#8592; Back To Login</p>
                    </div>
                </form>
            </div>
        </div>
    )
};
