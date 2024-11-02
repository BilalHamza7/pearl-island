import { useNavigate } from "react-router-dom"


export default function Login() {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/admindashboard');
    }

    return (
        <>
            <div className="p-6 h-screen w-full flex flex-col">
                <img src="/bigLogo.png" alt="Logo" className="w-80" />
                <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                    <p className="title_text">Let's Get Started</p>
                    <p className="subtitle_text">Enter your username and password to start managing!</p>

                    <form onSubmit={handleSubmit} className="flex flex-col w-96 my-3 gap-7">
                        <label className="flex flex-col gap-2 input_label">
                            Username:
                            <input type="type" className="input_style" />
                        </label>
                        <label className="flex flex-col gap-2 input_label">
                            Password:
                            <input type="type" className="input_style" />
                            <p className="text-xs underline text-end text-gray-600 cursor-pointer hover:text-blue-500" onClick={() => navigate('/resetPassword')}>Forgot your password?</p>
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
