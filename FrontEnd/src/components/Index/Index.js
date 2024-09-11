import { useEffect, useState } from 'react';
import '../Style/Style.css';
import APIs, { endpoints } from '../../configs/APIs';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';

const Index = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [details, setDetails] = useState([]);
    const [products, setProducts] = useState({}); // Store products by ID
    const [selectedCatalog, setSelectedCatalog] = useState(null); // Track selected catalog
    const [cart, setCart] = useState([]); // State for cart items
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const res = await APIs.get(endpoints['catalogs']);
                setCatalogs(res.data);
            } catch (error) {
                console.error('Error fetching catalogs:', error);
            }
        };

        const fetchDetails = async () => {
            try {
                const res = await APIs.get(endpoints['details']);
                setDetails(res.data);
                fetchProducts(res.data.map(detail => detail.product)); // Fetch products using IDs
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        const fetchProducts = async (productIds) => {
            try {
                const res = await APIs.get(`${endpoints['products']}?ids=${productIds.join(',')}`);
                const productsData = {};
                res.data.forEach(product => {
                    productsData[product.id] = product; // Store products by ID
                });
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCatalogs();
        fetchDetails();
    }, []);

    // Filter products based on selected catalog
    const filteredDetails = selectedCatalog
        ? details.filter(detail => {
            const product = products[detail.product];
            return product && product.catalog === selectedCatalog; // Check if product catalog matches selected catalog
        })
        : details;

    const addToCart = (product) => {
        setCart([...cart, product]); // Add product to cart
    };

    return (
        <div className="content-center">
            <div className="catalogs">
                <div className="catalog-list">
                    <div className="catalog-item" onClick={() => setSelectedCatalog(null)}>All</div>
                    {catalogs.map((catalog) => (
                        <div
                            key={catalog.id}
                            className="catalog-item"
                            onClick={() => setSelectedCatalog(catalog.id)} // Set selected catalog
                        >
                            {catalog.catalog_name}
                        </div>
                    ))}
                    <div className="catalog-item"><Link to='/cart'>Cart</Link></div>
                </div>
            </div>

            <h2 className="product-title">Sản phẩm nổi bật</h2>
            <div className="product-grid">
                {filteredDetails.map((detail) => (
                    <div key={detail.id} className="product-item" onClick={() => navigate(`/products/${detail.product}`)}>
                        {products[detail.product] ? (
                            <>
                                <img
                                    src={products[detail.product].image}
                                    alt={products[detail.product].product_name}
                                    className="product-image"
                                />
                                <h3 className="product-name">{products[detail.product].product_name}</h3>
                                <p className="product-price">Giá: {detail.price ? detail.price : 'Không có giá'}</p>
                                <div className="promotion">Trả góp 0%</div>
                                <button className="favorite-button">Yêu thích</button>
                                <button
                                    className="favorite-button"
                                    onClick={() => addToCart(products[detail.product])}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </>
                        ) : (
                            <p>Không có thông tin sản phẩm</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;