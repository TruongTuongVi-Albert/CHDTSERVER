import "./ProductLaptop.css";
import rightarrow from "../Pic/right-arrow.png";
import leftarrow from "../Pic/left-arrow.png";
import banner1 from "../Pic/img-banner2.png";
import office from "../Pic/office.png";
import gaming from "../Pic/gaming.png";
import touch from "../Pic/touch.png";
import graphics from "../Pic/graphics.png";
import technology from "../Pic/technology.png";
import more from "../Pic/more.png";
import fire from "../Pic/fire.png";
import laptop from "../Pic/demo-laptop.webp";
import rating from "../Pic/rating.png";
import like from "../Pic/like.png";
import exchangeRate from "../Pic/arrange.png";
import promotion from "../Pic/promotion.png";
import eyeexam from "../Pic/eye-exam.png";



const ProductLaptop = () => (
    <div className="main-laptop">
        <div className="laptop-banner">
            <img src={leftarrow} className="arrow" />

            <div className="img-banner">
                <img src={banner1} className="banner1" />
            </div>
            <div className="img-banner">
                <img src={banner1} className="banner1" />
            </div>

            <img src={rightarrow} className="arrow" />
        </div>

        <div className="laptop-center">
            <h2>Sắp xếp theo</h2>

            <div className="select-laptop">
                <a href="#"><div> <img src={office} className="office" /> Office </div></a>
                <a href="#"><div> <img src={gaming} className="gaming" />Gaming</div></a>
                <a href="#"><div> <img src={touch} className="touch" /> Touch</div></a>
                <a href="#"><div> <img src={graphics} className="graphics" /> Graphics </div></a>
                <a href="#"><div> <img src={technology} className="technology" /> LapTop AI </div></a>
                <a href="#"><div className="more-d"> <img src={more} className="more" />  </div></a>
            </div>

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
                        <img src={laptop} className="laptop" />
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
                        <img src={laptop} className="laptop" />
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
                        <img src={laptop} className="laptop" />
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
                        <img src={laptop} className="laptop" />
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

            <h2>Sắp xếp theo</h2>

            <div className="select-price-laptop">
                <a href="#"><div> <img src={exchangeRate} className="exchangeRate" /> High-Low Price </div></a>
                <a href="#"><div> <img src={exchangeRate} className="exchangeRate" /> Low-High Price</div></a>
                <a href="#"><div> <img src={promotion} className="promotion" /> Hot Promotion </div></a>
                <a href="#"><div> <img src={eyeexam} className="eyeExam" /> See more </div></a>
            </div>

            <div className="item-bestSellers">
                <div className="best-center">
                    <div className="item-best">
                        <div className="item-best-sale">0%</div>
                        <img src={laptop} className="laptop" />
                        <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                        <p className="best-money-big">21.990.000đ</p>
                        <p className="best-money-lit">26.990.000đ</p>
                        <div className="best-intro">
                            <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                        </div>
                        <div className="best-item-bottom">
                            <img src={rating} className="rating" />
                            <p>Yêu thích</p>
                            <img src={like} className="like" />
                        </div>
                    </div>
                    <div className="item-best">
                        <div className="item-best-sale">0%</div>
                        <img src={laptop} className="laptop" />
                        <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                        <p className="best-money-big">21.990.000đ</p>
                        <p className="best-money-lit">26.990.000đ</p>
                        <div className="best-intro">
                            <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                        </div>
                        <div className="best-item-bottom">
                            <img src={rating} className="rating" />
                            <p>Yêu thích</p>
                            <img src={like} className="like" />
                        </div>
                    </div>
                    <div className="item-best">
                        <div className="item-best-sale">0%</div>
                        <img src={laptop} className="laptop" />
                        <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                        <p className="best-money-big">21.990.000đ</p>
                        <p className="best-money-lit">26.990.000đ</p>
                        <div className="best-intro">
                            <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                        </div>
                        <div className="best-item-bottom">
                            <img src={rating} className="rating" />
                            <p>Yêu thích</p>
                            <img src={like} className="like" />
                        </div>
                    </div>
                    <div className="item-best">
                        <div className="item-best-sale">0%</div>
                        <img src={laptop} className="laptop" />
                        <p className="best-title-name">Samsung Galaxy S24 Plus 12GB 256 GB</p>
                        <p className="best-money-big">21.990.000đ</p>
                        <p className="best-money-lit">26.990.000đ</p>
                        <div className="best-intro">
                            <p>Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng từ 3-6-9-12 tháng...</p>
                        </div>
                        <div className="best-item-bottom">
                            <img src={rating} className="rating" />
                            <p>Yêu thích</p>
                            <img src={like} className="like" />
                        </div>
                    </div>

                </div>
                <div className="best-bottom">
                    <a href="#">View all</a>
                </div>
            </div>
        </div>

    </div>
);
export default ProductLaptop;