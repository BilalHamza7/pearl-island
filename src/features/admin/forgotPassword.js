export default function ForgotPassword() {
    return (
        <>
            <div className="p-6 h-screen w-full flex flex-col">
                <img src="/bigLogo.png" alt="Logo" className="w-80" />
                <div className="flex h-full justify-center items-center">
                    <div className="bg-gray-200 w-fit flex flex-col justify-center items-center px-9 py-4 gap-1 rounded-xl">
                        <p className="text-4xl font-saira tracking-wider">Reset Password</p>
                        <p className="text-lg text-center w-96 leading-tight tracking-wider font-light font-montserrat">Please Enter Your Email And We'll Send You A 4-Digit Code</p>

                        <form className="flex flex-col w-full my-3 gap-7">
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-saira tracking-wide">
                                    Email:
                                </label>
                                <div className="flex gap-4">
                                    <input type="email" className="text-xl font-montserrat p-2 rounded-lg outline-none drop-shadow-lg" />
                                    <button className="button-style">
                                        Send Code
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl font-saira tracking-wide">
                                    Email:
                                </label>
                                <div className="flex gap-4">
                                    <input type="email" className="text-xl font-montserrat p-2 rounded-lg outline-none drop-shadow-lg" />
                                    <button className="button-style">
                                        Send Code
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
