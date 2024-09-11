import "./ProductPhone.css";
import rightarrow from "../Pic/right-arrow.png";
import leftarrow from "../Pic/left-arrow.png";
import banner1 from "../Pic/img-banner2.png";
import applelogo from "../Pic/applelogo.png";
import samsunglogo from "../Pic/samsung.png";
import nokialogo from "../Pic/nokia.png";
import asuslogo from "../Pic/asuslogo.png";
import vivologo from "../Pic/vivo.png";
import gglogo from "../Pic/google.png";
import sonylogo from "../Pic/sony.png";
import exchangeRate from "../Pic/arrange.png";
import promotion from "../Pic/promotion.png";
import eyeexam from "../Pic/eye-exam.png";
import iphone from "../Pic/ip15prm.webp";
import rating from "../Pic/rating.png";
import like from "../Pic/like.png";



const ProductPhone = () => {
    return (
        <div className="phone-main">
            <div className="banner-phone">
                <img src={leftarrow} className="arrow-phone" />

                <div className="phone-banner">
                    <img src={banner1} className="banner1-phone" />
                </div>
                <div className="img-banner">
                    <img src={banner1} className="banner1-phone" />
                </div>

                <img src={rightarrow} className="arrow-phone" />
            </div>

            <div className="phone-content">
                <div className="select-logo">
                    <a href="#"> <div><img src={applelogo} className="applelogo" /></div> </a>
                    <a href="#"> <div> <img src={samsunglogo} className="samsunglogo" /> </div> </a>
                    <a href="#"> <div> <img src={nokialogo} className="nokialogo" /></div> </a>
                    <a href="#"> <div> <img src={asuslogo} className="asuslogo" /> </div> </a>
                    <a href="#"> <div> <img src={vivologo} className="vivologo" /> </div> </a>
                    <a href="#"> <div> <img src={gglogo} className="gglogo" /> </div> </a>
                    <a href="#"> <div> <img src={sonylogo} className="sonylogo" /> </div> </a>
                </div>

                <h2>Sắp xếp theo</h2>

                <div className="select-price-phone">
                    <a href="#"><div> <img src={exchangeRate} className="exchangeRate" /> High-Low Price </div></a>
                    <a href="#"><div> <img src={exchangeRate} className="exchangeRate" /> Low-High Price</div></a>
                    <a href="#"><div> <img src={promotion} className="promotion" /> Hot Promotion </div></a>
                    <a href="#"><div> <img src={eyeexam} className="eyeExam" /> See more </div></a>
                </div>

                <div className="item-phone-center">
                    <div className="phone-center">
                        <div className="item-phone">
                            <div className="phone-sale">0%</div>
                            <img src={iphone} className="ip" />
                            <p className="phone-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="phone-money-big">21.990.000đ</p>
                            <p className="phone-money-lit">26.990.000đ</p>
                            <div className="phone-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="phone-item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>
                        <div className="item-phone">
                            <div className="phone-sale">0%</div>
                            <img src={iphone} className="ip" />
                            <p className="phone-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="phone-money-big">21.990.000đ</p>
                            <p className="phone-money-lit">26.990.000đ</p>
                            <div className="phone-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="phone-item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>
                        <div className="item-phone">
                            <div className="phone-sale">0%</div>
                            <img src={iphone} className="ip" />
                            <p className="phone-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="phone-money-big">21.990.000đ</p>
                            <p className="phone-money-lit">26.990.000đ</p>
                            <div className="phone-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="phone-item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>
                        <div className="item-phone">
                            <div className="phone-sale">0%</div>
                            <img src={iphone} className="ip" />
                            <p className="phone-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="phone-money-big">21.990.000đ</p>
                            <p className="phone-money-lit">26.990.000đ</p>
                            <div className="phone-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="phone-item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>
                        
                    </div>
                    <div className="phone-bottom">
                        <a href="#">View all</a>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default ProductPhone;