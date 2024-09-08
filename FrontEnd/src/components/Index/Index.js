import "./Index.css";
import rightarrow from "../Pic/right-arrow.png";
import leftarrow from "../Pic/left-arrow.png";
import banner1 from "../Pic/img-banner2.png";
import airpoods from "../Video/airpoods.mp4";
import fire from "../Pic/fire.png";
import iphone from "../Pic/ip15prm.webp";
import rating from "../Pic/rating.png";
import like from "../Pic/like.png";
import picsuggest from "../Pic/img-suggest.png";
import longarrow from "../Pic/long-arrow.png";



const Index = () => {
    return (
        <div className="main-content">
            <div className="video">
                <video controls autoplay muted loop>
                    <source src={airpoods} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="content-banner">
                <img src={leftarrow} className="arrow" />

                <div className="img-banner">
                    <img src={banner1} className="banner1" />
                </div>
                <div className="img-banner">
                    <img src={banner1} className="banner1" />
                </div>

                <img src={rightarrow} className="arrow" />
            </div>

            <div className="content-center">
                <div className="hotSale">
                    <div className="hotSale-top">
                        <img src={fire} className="fire" />
                        <p className="title-hotSale">FLASH SALE </p>
                        <div className="time">
                            <p className="title-time">Finished in: </p>
                            <div className="number-time">
                                <div><p>02</p></div>
                                <p className="p">:</p>
                                <div><p>02</p></div>
                                <p className="p">:</p>
                                <div><p>02</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="hotSale-center">
                        <div className="item">
                            <div className="item-sale">-50%</div>
                            <img src={iphone} className="ip" />
                            <p className="item-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="item-money-big">21.990.000đ</p>
                            <p className="item-money-lit">26.990.000đ</p>
                            <div className="item-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-sale">-50%</div>
                            <img src={iphone} className="ip" />
                            <p className="item-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="item-money-big">21.990.000đ</p>
                            <p className="item-money-lit">26.990.000đ</p>
                            <div className="item-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-sale">-50%</div>
                            <img src={iphone} className="ip" />
                            <p className="item-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="item-money-big">21.990.000đ</p>
                            <p className="item-money-lit">26.990.000đ</p>
                            <div className="item-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-sale">-50%</div>
                            <img src={iphone} className="ip" />
                            <p className="item-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="item-money-big">21.990.000đ</p>
                            <p className="item-money-lit">26.990.000đ</p>
                            <div className="item-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="item-bottom">
                                <img src={rating} className="rating" />
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>
                        </div>  
                    </div>
                    <div className="hotSale-bottom">
                        <a href="#">View all</a>
                    </div>
                </div>

                <div className="bestSellers-title">
                    <div className="line1"></div>
                    <p>Best Sellers</p>
                    <div className="line2"></div>
                </div>

                <div className="select-bestSellers">
                    <div>
                        Apple
                    </div>
                    <div>
                        Samsung
                    </div>
                    <div>
                        Oppo
                    </div>
                    <div>
                        Xiaomi
                    </div>
                    <div>
                        View all...
                    </div>
                </div>

                <div className="item-bestSellers">
                    <div className="best-center">
                        <div className="item-best">
                            <div className="item-best-sale">0%</div>
                            <img src={iphone} className="ip"/>
                            <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="best-money-big">21.990.000đ</p>
                            <p className="best-money-lit">26.990.000đ</p>
                            <div className="best-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="best-item-bottom">
                                <img src={rating}  className="rating"/>
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>  
                        </div>
                        <div className="item-best">
                            <div className="item-best-sale">0%</div>
                            <img src={iphone} className="ip"/>
                            <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="best-money-big">21.990.000đ</p>
                            <p className="best-money-lit">26.990.000đ</p>
                            <div className="best-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="best-item-bottom">
                                <img src={rating}  className="rating"/>
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>  
                        </div>
                        <div className="item-best">
                            <div className="item-best-sale">0%</div>
                            <img src={iphone} className="ip"/>
                            <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="best-money-big">21.990.000đ</p>
                            <p className="best-money-lit">26.990.000đ</p>
                            <div className="best-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="best-item-bottom">
                                <img src={rating}  className="rating"/>
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>  
                        </div>
                        <div className="item-best">
                            <div className="item-best-sale">0%</div>
                            <img src={iphone} className="ip"/>
                            <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                            <p className="best-money-big">21.990.000đ</p>
                            <p className="best-money-lit">26.990.000đ</p>
                            <div className="best-intro">
                                <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                            </div>
                            <div className="best-item-bottom">
                                <img src={rating}  className="rating"/>
                                <p>Yêu thích</p>
                                <img src={like} className="like" />
                            </div>  
                        </div>
    
                    </div>
                    <div className="best-bottom">
                        <a href="#">View all</a>
                    </div>
                </div>

                <div className="suggest-title">
                    <div className="line1"></div>
                    <p>Suggest</p>
                    <div className="line2"></div>
                </div>

                <div className="item-suggest">
                    <div className="suggest-infor">
                        <div className="suggest-sale">SALE</div>
                        <p className="suggest-title">AirPords Max</p>
                        <p className="suggest-intro">Sounds like an epiphany</p>
                        <p className="suggest-little">Minimalist, sophisticated design but still extremely luxurious and classy.</p>
                        <div className="suggest-money">
                            <div className="suggest-money-lit">$549</div>
                            <img src={longarrow} className="One-arrow"/>
                            <div className="suggest-money-big">$499</div>
                        </div>
                        <button type="submit">Buy</button>
                    </div>
                    <div className="suggest-img">
                        <img src={picsuggest} className="img-suggest"/>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Index;