import axios from "axios";
import { useState } from "react"

export default function CreateAdmin() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!fullName || /\d/.test(fullName)) {
            return { fullNameError: "Full name is required and should not contain numbers." };
        }
        if (!email) {
            return { emailError: "Email is required." };
        } else if (!/\S+@\S+\.\S+/.test(email)) { // / => indicates start and end of regex, \S+ any characters except whitespace, @ \. => required characters
            return { emailError: "Email format is invalid. Eg: example@gmail.com" };
        }
        if (!username || /\d/.test(fullName)) {
            return { usernameError: "Username is required and should not contain numbers." };
        }
        if (!password) {
            return { passwordError: "Password is required." };
        } else if (password.length < 6) {
            return { passwordError: "Password must be at least 6 characters long." };
        }
        if (confirmPassword !== password) {
            return { confirmPasswordError: "Passwords do not match." };
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const response = validateForm();
        if (response === true) {
            try {
                const response = await axios.post('http://localhost:5000/admin/createAdmin',
                    {
                        fullName: fullName,
                        email: email,
                        username: username,
                        password: password,
                    }
                );
                if (response) {
                    alert(response.data.message + response.data.adminId);
                } else {
                    alert("Login failed. " + response.data.error);
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
            setError(response);
        }
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <form onSubmit={(e) => handleSubmit(e)} className="w-96 flex flex-col gap-3 justify-center">
                    <label className="flex flex-col h-24 gap-2 input_label">
                        Full Name:
                        <input type="text" className="input_style" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <p className={`font-saira text-sm ${error.fullNameError ? 'text-red-600' : 'text-transparent'}`}>{error.fullNameError}</p>
                    </label>
                    <label className="flex flex-col h-24 gap-2 input_label">
                        Email:
                        <input type="text" className="input_style" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p className={`font-saira text-red-600 text-sm ${error.emailError ? 'text-black' : 'text-transparent'}`}>{error.emailError}</p>
                    </label>
                    <label className="flex flex-col h-24 gap-2 input_label">
                        Username:
                        <input type="text" className="input_style" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p className={`font-saira text-red-600 text-sm ${error.usernameError ? 'text-black' : 'text-transparent'}`}>{error.usernameError}</p>
                    </label>
                    <label className="flex flex-col h-24 gap-2 input_label">
                        Password:
                        <input type="text" className="input_style" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p className={`font-saira text-red-600 text-sm ${error.passwordError ? 'text-black' : 'text-transparent'}`}>{error.passwordError}</p>
                    </label>
                    <label className="flex flex-col h-24 gap-2 input_label">
                        Confirm Password:
                        <input type="text" className="input_style" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <p className={`font-saira text-red-600 text-sm ${error.confirmPasswordError ? 'text-black' : 'text-transparent'}`}>{error.confirmPasswordError}</p>
                    </label>
                    <button type="submit" className="button_style">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
};
