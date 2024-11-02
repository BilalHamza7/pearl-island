import axios from "axios";
import { useState } from "react"

export default function CreateAdmin() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        alert("first");
        try {
            const response = await axios.get('http://localhost:5000/admin/verifyAdmin',
                {
                    email: 'bilala@gmail.com',
                    password: 'sdalkl'
                }
            );
            if (response) {
                alert(response.data);
            }
            else alert("not available");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-10 justify-center">
                    <label className="flex flex-col input_label">
                        Full Name:
                        <input type="text" className="input_style" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </label>
                    <label className="flex flex-col input_label">
                        Email:
                        <input type="email" className="input_style" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="flex flex-col input_label">
                        Username:
                        <input type="text" className="input_style" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label className="flex flex-col input_label">
                        Password:
                        <input type="text" className="input_style" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label className="flex flex-col input_label">
                        Confirm Password:
                        <input type="text" className="input_style" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                    <button type="submit" className="button_style">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
};
