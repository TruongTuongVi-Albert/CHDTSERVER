import React, { useState } from "react";
import "./Login.css";
import imageLogin from "../Pic/imageLogin.png";
import APIs, { endpoints } from "../../configs/APIs";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => { // Xử lý thông tin
        e.preventDefault();
        try {
            const res = await APIs.post(endpoints['login'], {
                'username': username,
                'password': password,
                client_id: 'uVvz38F3o3g877wq6dNfQ7cfTK8jfsdwXtHZUUMA',
                client_secret: 'N9by1xLlw7CUO5pc7kBxuQYefJwee2VNO9L397LJmxygCnNTjuWghCumviUn8G7mwn6DNkldvibmJ44EcB6Ad2oYxcvSJmTMCbuVM9gmmhZrAsQvsEQGgWHOO2iZtavP',
                grant_type: 'password'
            });
            console.log(res);
        } catch (err) {
            console.log(err);
            setError('Login failed. Please check your credentials.');
        }
    };




    return (
        <div className="contriner" onSubmit={handleSubmit}>

            <img src={imageLogin} alt="imageLogin" className="imageLogin" />
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <div className="text">Username</div>
                        <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-box">
                        <div className="text">Password</div>
                        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="show-password">
                        <input type="checkbox" /><label>Show Password</label>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p> Don't have an account? <a href="#">Register</a></p>
                    </div>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;