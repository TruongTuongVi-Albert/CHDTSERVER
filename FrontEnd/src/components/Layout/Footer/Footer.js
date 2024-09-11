import "./Footer.css";
import samsungpay from "../../Pic/samsungpay.png";
import vnpay from "../../Pic/vnpay.png";
import tiktok from "../../Pic/tik-tok.png";
import face from "../../Pic/facebook.png";
import youtube from "../../Pic/youtube.png";
import ins from "../../Pic/ins.png";
import zalo from "../../Pic/zalo.png";


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="left">
                    <h2 className="title-hotline">Free support hotline</h2>
                    <div className="title-number">
                        <p>Call to buy: 1800.3097 ( 7am - 10pm )</p>
                        <p>Call to complain: 1800.3098 ( 8am - 10pm )</p>
                        <p>Call for warranty: 1800.3099 ( 8am - 10pm )</p>
                    </div>

                    <h2 className="title-pay">Payment method</h2>
                    <div className="image-pay">

                        <a href="#"><img src={samsungpay} alt="samsungpay" className="samsungpay" /></a>
                        <a href="#"><img src={vnpay} alt="vnpay" className="vnpay" /></a>
                    </div>

                    <h2 className="title-method">Method to connect with</h2>
                    <div className="image-method">
                        <a href="#"><img src={tiktok} alt="tiktok" className="tiktok" /></a>
                        <a href="#"><img src={youtube} alt="youtube" className="youtube" /></a>
                        <a href="#"><img src={face} alt="face" className="face" /></a>
                        <a href="#"><img src={ins} alt="ins" className="ins" /></a>
                        <a href="#"><img src={zalo} alt="zalo" className="zalo" /></a>
                    </div>

                </div>


                <div className="cennter">
                    <h2>Policy information</h2>
                    <div className="center-top">
                        <p>Buy and pay online</p>
                        <p>Buy online in installments</p>
                        <p>Look up electronic invoices</p>
                        <p>Purchase invoice information</p>
                        <p>Apple product unboxing policy</p>
                    </div>

                    <h2>Services-other information</h2>
                    <div className="center-bottom">
                        <p>Personal information security policy</p>
                        <p>Warranty Policy</p>
                        <p>Contact for business cooperation</p>
                        <p>Extended warranty service</p>
                    </div>
                </div>

                <div className="right">
                    <h2>Sign up to receive promotional information</h2>
                    <p className="voucher">(*) Get 10% voucher now</p>
                    <p className="voucher-little">*Voucher will be sent after 24 hours, only applies to new customers</p>
                    <div className="input-register">
                        <input type="text" placeholder="Email *" /> 
                        <input type="text" placeholder="Phone *" />
                    </div>
                    <div className="check">
                        <label> <input type="checkbox" />
                            I agree to the terms</label>
                    </div>
                    <button type="submit">Register</button>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="one">TVT Mobile Company Limited - Business Registration Certificate: 0316579658
                    issued by the City Department of Planning and Investment. HCM issued on November 9, 2020.</p>
                <p className="two">Address: 135/1/8 Nguyen Huu Canh, Ward 22, Binh Thanh District, Ho Chi Minh City, Vietnam</p>
                <div className="three">
                    <p>Điện thoại: 1800 3355-0838335577</p>
                    <p>Email: hotmail@TVTmobile.com</p>
                </div>
            </div>
        </div>
    );
};
export default Footer;