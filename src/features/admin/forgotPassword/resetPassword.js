import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { send } from '@emailjs/browser';


export default function ResetPassword() {

    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!email) {
            return { emailError: "Email is required." };
        } else if (!/\S+@\S+\.\S+/.test(email)) { // / => indicates start and end of regex, \S+ any characters except whitespace, @ \. => required characters
            return { emailError: "Email format is invalid. Eg: example@gmail.com" };
        }
        return true;
    };

    // verify email and get details
    const verifyEmail = async (e) => {
        e.preventDefault();
        const validation = validateForm();
        if (validation === true) {
            setError({});
            try {
                const response = await axios.get('http://localhost:5000/admin/searchAdmin', {
                    params: {
                        email: email, // Attach the email as a query parameter
                    },
                });
                if (response) {
                    sendEmail({ username: response.data.username });
                }
            } catch (error) {
                console.error(error);
                alert(error.response.data.message);
            }
        }
        else {
            setError(validation);
        }
    };

    const generateOtp = () => {
        const otp = Math.floor(10000 + Math.random() * 90000);
        return otp;
    };

    // send email using emailjsSend
    const sendEmail = async ({ username }) => {
        const otp = generateOtp();
        console.log({ otp_code: otp, username });

        const data = {
            service_id: 'service_t3hnvtc',
            template_id: 'template_0ybb7ff',
            user_id: 'qIphg6MjiyvIV3rTL',
            template_params: {
                username: username,
                otp_code: otp,
            }
        };

        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
            // const response = await send('service_t3hnvtc', 'template_0ybb7ff', {
            //     username: username,
            //     otp_code: otp,
            // });
            alert('Enter the OTP sent to your email.');
        } catch (error) {
            alert('Failed to send email!');
            console.error('FAILED...', error);
        }
        // navigate('/admin/verifyEmail');
    };

    return (
        <>
            <div className="p-6 h-screen w-full flex flex-col">
                <img src="/bigLogo.png" alt="Logo" className="w-80" />
                <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                    <p className="title_text">Forgot Password?</p>
                    <p className="subtitle_text w-96">No Worries, Enter Your Email And We'll Send You The Instructions</p>

                    <form onSubmit={verifyEmail} className="flex flex-col w-2/6 mt-5 gap-7">
                        <label className="flex flex-col gap-2 input_label">
                            Email:
                            <input type="type" value={email} onChange={(e) => setEmail(e.target.value)} className="input_style" placeholder="example@gmail.com" />
                            <p className={`font-saira text-sm ${error.emailError ? 'text-red-600' : 'text-transparent'}`}>{error.emailError}</p>
                        </label>
                        <div className="flex flex-col items-center gap-3">
                            <button type="submit" className="button_style text-lg flex justify-center">
                                Reset Password
                            </button>
                            <p className="subtitle_text cursor-pointer" onClick={() => navigate('/admin')}>&#8592; Back To Login</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};
