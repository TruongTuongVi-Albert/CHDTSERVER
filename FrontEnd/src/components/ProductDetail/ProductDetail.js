// ProductDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';
import '../Style/Style.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [details, setDetails] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await APIs.get(`${endpoints['products']}${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchDetails = async () => {
            try {
                const res = await APIs.get(endpoints['details']);
                setDetails(res.data);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const res = await APIs.get(endpoints['reviews']);
                setReviews(res.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
        fetchDetails();
        fetchProductDetails();

        // Kiểm tra xem người dùng có đăng nhập không
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [id]);

    const handleAddToCart = () => {
        console.log('Product added to cart:', product);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login'); // Chuyển đến trang đăng nhập nếu chưa đăng nhập
            return;
        }

        try {
            const newReview = {
                product: id,
                review: reviewText,
                rating,
            };
            await APIs.post(endpoints['reviews'], newReview, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setReviews([...reviews, { ...newReview, user: { username: 'Bạn' } }]);
            setReviewText('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!product) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="product-detail">
            <div className="product-header">
                <h2>{product.product_name}</h2>
                <img src={product.image} alt={product.product_name} className="product-image" />
            </div>
            <div className="product-info">
                <div className="price-section">
                    <h3>Price: {details.length > 0 ? details[0].price : 'Không có giá'}</h3>
                </div>
                <div className="features-section">
                    <p className="outstanding-features">Outstanding features:</p>
                    <p>{product.specifications}</p>
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
            </div>
            <div className="product-detail">
                {/* Phần tiêu đề và thông tin sản phẩm */}
                <div className="reviews-section">
                    <h4>Reviews</h4>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <strong>{review.user.username} - Rating: {review.rating}</strong>
                                <p>{review.review}</p>
                                <Link to={`/reviews/${review.id}`} className="review-link">Xem chi tiết</Link>
                            </div>
                        ))
                    ) : (
                        <p>Không có đánh giá nào.</p>
                    )}
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write a comment"
                            required
                            className="review-textarea"
                        />
                        <div className="rating-container">
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                placeholder="Rating (1-5)"
                                min="1"
                                max="5"
                                required
                                className="rating-input"
                            />
                        </div>
                        <button type="submit" className="submit-review-button">Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;