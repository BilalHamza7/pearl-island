import { useNavigate } from "react-router-dom"

export default function ResetPassword() {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/admin/verifyEmail');
    }

    return (
        <>
            <div className="p-6 h-screen w-full flex flex-col">
                <img src="/bigLogo.png" alt="Logo" className="w-80" />
                <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                    <p className="title_text">Forgot Password?</p>
                    <p className="subtitle_text w-96">No Worries, Enter Your Email And We'll Send You The Instructions</p>

                    <form onSubmit={handleSubmit} className="flex flex-col w-2/6 mt-5 gap-7">
                        <label className="flex flex-col gap-2 input_label">
                            Email:
                            <input type="type" className="input_style" />
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
