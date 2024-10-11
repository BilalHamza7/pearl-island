import { useNavigate } from "react-router-dom";

export default function NewPassword() {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/');
    }

    return (
        <div className="p-6 h-screen w-full flex flex-col">
            <img src="/bigLogo.png" alt="Logo" className="w-80" />
            <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                <p className="title_text">Set New Password</p>
                <p className="subtitle_text w-96">Must Be At Least 8 Characters</p>

                <form onSubmit={handleSubmit} className="flex flex-col w-2/6 mt-5 gap-7">
                    <label className="flex flex-col gap-2 input_label">
                        Password:
                        <input type="type" className="input_style" />
                    </label>
                    <label className="flex flex-col gap-2 input_label">
                        Confirm Password:
                        <input type="type" className="input_style" />
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
