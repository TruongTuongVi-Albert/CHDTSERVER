import React, { useState } from 'react';
import '../Style/Style.css';

const Cart = ({ cart = [], onCheckout }) => {
    const [selectedVoucher, setSelectedVoucher] = useState('');

    const handleCheckout = () => {
        const orderDetails = cart.map(item => ({
            productId: item.id,
            productName: item.product_name,
            price: item.price,
        }));
        onCheckout(orderDetails);
    };

    const totalAmount = (cart || []).reduce((total, item) => total + item.price, 0);

    return (
        <div className="cart-container">
            <h2>Giỏ hàng của bạn</h2>
            
            <div className="cart-header">
                <input type="checkbox" /> Select All (0)
                <div className="gifts">
                    Gifts <span>Select Gifts (5)</span>
                </div>
            </div>

            <div className="cart-items">
                {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.product_name} />
                        <div className="item-details">
                            <h3>{item.product_name}</h3>
                            <p className="item-price">{item.price.toLocaleString()} đ</p>
                            <p className="item-color">Color: {item.color}</p>
                            <div className="warranty-options">
                                <label>
                                    <input type="checkbox" /> Guarantee
                                </label>
                                <label>
                                    <input type="checkbox" /> Exclusive 1 year warranty +100.000đ
                                </label>
                                <label>
                                    <input type="checkbox" /> 1 for 1 exchange warranty privilege +200.000đ
                                </label>
                            </div>
                        </div>
                        <button className="remove-button">Xóa</button>
                    </div>
                ))}
            </div>

            <div className="order-summary">
                <h3>Order Information</h3>
                <div className="summary-details">
                    <p>Total: {totalAmount.toLocaleString()} đ</p>
                    <label>
                        Select Vouchers:
                        <select value={selectedVoucher} onChange={(e) => setSelectedVoucher(e.target.value)}>
                            <option value="">None</option>
                            <option value="voucher1">Voucher 1</option>
                            <option value="voucher2">Voucher 2</option>
                        </select>
                    </label>
                    <p>Payment Required: Free</p>
                </div>
                <button onClick={handleCheckout} className="checkout-button">Pay</button>
            </div>
        </div>
    );
};

export default Cart;