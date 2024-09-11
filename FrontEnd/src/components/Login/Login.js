import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";
import imageLogin from "../Pic/imageLogin.png";
import APIs, { endpoints } from "../../configs/APIs";

const Login = () => {
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await APIs.post(endpoints['login'], {
                username,
                password,
                client_id: 'EykXf6AAwtcU0p1rkO1CdELiJ0IOwDl13teJWMzW',
                client_secret: '91iVADCWuvYkFD1R6O64FIiD1t7b9cnlRezuiC0nVfiQTKuiV1eHVy0E4Nqsmu57BUZVDWK3ryheLSU7p5hDPxN5ZefnBOgbSMjmfdhl9YFxZg0q6F87NMnmjXALAt9p',
                grant_type: 'password'
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Lưu access_token vào localStorage
            localStorage.setItem('access_token', res.data.access_token);

            // Lấy thông tin người dùng
            const userInfo = await APIs.get(endpoints['current-users'], {
                headers: {
                    Authorization: `Bearer ${res.data.access_token}`
                }
            });

            console.log(userInfo.data); // Xử lý thông tin người dùng ở đây

            // Chuyển hướng về trang Index
            navigate('/'); // Thay đổi đường dẫn nếu cần
        } catch (err) {
            console.log(err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <img src={imageLogin} alt="Login" className="imageLogin" />
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <div className="text">Username</div>
                        <input 
                            type="text" 
                            placeholder="Enter Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <div className="text">Password</div>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="show-password">
                        <input 
                            type="checkbox" 
                            checked={showPassword} 
                            onChange={() => setShowPassword(!showPassword)} 
                        />
                        <label>Show Password</label>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;