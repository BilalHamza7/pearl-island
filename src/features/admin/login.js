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
                <div className="flex h-full justify-center items-center">
                    <div className="bg-gray-200 w-1/3 flex flex-col justify-center items-center px-9 py-4 gap-1 rounded-xl">
                        <p className="text-4xl font-saira tracking-wider">Let's Get Started</p>
                        <p className="text-lg text-center leading-tight tracking-wider font-light font-montserrat">Enter your username and password to start managing!</p>

                        <form onSubmit={handleSubmit} className="flex flex-col w-full my-3 gap-7">
                            <label className="flex flex-col text-xl gap-2 font-saira tracking-wide">
                                Username:
                                <input type="type" className="text-xl font-montserrat p-2 rounded-lg outline-none drop-shadow-lg" />
                            </label>
                            <label className="flex flex-col text-xl gap-2 font-saira tracking-wide">
                                Password:
                                <input type="type" className="text-xl font-montserrat p-2 rounded-lg outline-none drop-shadow-lg" />
                                <p className="text-xs underline text-end text-gray-600 cursor-pointer hover:text-blue-500" onClick={() => navigate('/forgotPassword')}>Forgot your password?</p>
                            </label>
                            <div className="flex justify-center ">
                                <button type="submit" className="button-style text-lg    flex justify-center">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
