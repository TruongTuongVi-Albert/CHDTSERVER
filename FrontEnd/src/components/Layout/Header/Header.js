import "./Header.css";
import cart from "../../Pic/cart.png";
import oder from "../../Pic/oder.png";
import nearstore from "../../Pic/nearStore.png";
import user from "../../Pic/user.png";
import search from "../../Pic/search.png";
import logo from "../../Pic/logo.png";
import phone from "../../Pic/phone.png";
import tablet from "../../Pic/tablet.png";
import laptop from "../../Pic/laptop.png";
import sound from "../../Pic/bluetooth-headset.png";
import accessory from "../../Pic/charger.png";
import news from "../../Pic/news.png";
import { Link } from "react-router-dom";


const Header = () => (
    <div className="header">
        <div className="header-top">
            <img src={logo} alt="header-logo" className="header-logo" />
            <div className="header-nameStore">
                <h2>TVT Mobile</h2>
                <p>Prestige - Quality</p>
            </div>
            <div className="header-search">
                <input type="text" placeholder="What do you need?" />
                <img src={search} alt="searcch" className="Search" />
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
                <div className="nav">
                    <Link to="/login" className="User-link">
                        <div><img src={user} alt="User" className="img" /></div>
                        <p className="title-User">Login</p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);
export default Header;