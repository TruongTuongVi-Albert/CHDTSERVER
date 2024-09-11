import "./Header.css";
import cart from "../../Pic/cart.png";
import oder from "../../Pic/oder.png";
import nearstore from "../../Pic/nearStore.png";
import userIcon from "../../Pic/user.png"; // Icon cho user
import search from "../../Pic/search.png";
import logo from "../../Pic/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const token = localStorage.getItem('access_token');
        const userAvatar = localStorage.getItem('user_avatar'); // Lấy avatar từ localStorage
        setIsLoggedIn(!!token);
        setAvatar(userAvatar); // Cập nhật avatar
    }, []);

    const handleLogout = () => {
        // Xóa access_token và cập nhật trạng thái đăng nhập
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_avatar'); // Xóa avatar
        setIsLoggedIn(false);
        setAvatar(null);
        navigate('/'); // Chuyển hướng về trang chính sau khi đăng xuất
    };

    return (
        <div className="header">
            <div className="header-top">
                <img src={logo} alt="header-logo" className="header-logo" />
                <div className="header-nameStore">
                    <h2>TVT Mobile</h2>
                    <p>Prestige - Quality</p>
                </div>
                <div className="header-search">
                    <input type="text" placeholder="What do you need?" />
                    <img src={search} alt="search" className="Search" />
                </div>
                <div className="header-right">
                    <div className="nav">
                        <a href="#" className="nearStore-link">
                            <img src={nearstore} alt="Near-store" className="img" />
                            <p className="title-nearStore">Store</p>
                        </a>
                    </div>
                    <div className="nav">
                        <a href="#" className="Oder-link">
                            <img src={oder} alt="Order" className="img" />
                            <p className="title-Order">Order</p>
                        </a>
                    </div>
                    <div className="nav">
                        <Link to="/cart" className="Cart-link">
                            <img src={cart} alt="Cart" className="img" />
                            <p className="title-Cart">Cart</p>
                        </Link>
                    </div>
                    {isLoggedIn ? (
                        <>
                            <div className="nav">
                                <Link to="/profile" className="User-link">
                                    {avatar ? (
                                        <img src={avatar} alt="User Avatar" className="img" />
                                    ) : (
                                        <img src={userIcon} alt="User" className="img" />
                                    )}
                                    <p className="title-User">Profile</p>
                                </Link>
                            </div>
                            <div className="nav" onClick={handleLogout}>
                                <div><img src={userIcon} alt="Logout" className="img" /></div>
                                <p className="title-User">Logout</p>
                            </div>
                        </>
                    ) : (
                        <div className="nav">
                            <Link to="/login" className="User-link">
                                <img src={userIcon} alt="User" className="img" />
                                <p className="title-User">Login</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;