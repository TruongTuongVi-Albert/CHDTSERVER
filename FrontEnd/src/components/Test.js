import { useEffect, useState } from "react";
import APIs, { endpoints } from "../configs/APIs";

const Test = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogs = async () => {
            setIsLoading(true);
            try {
                const res = await APIs.get(endpoints['products']);
                setProducts(res.data);
                setError(null);
            } catch (ex) {
                console.error("Failed to fetch catalogs:", ex);
                setError(ex.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCatalogs();
    }, []);

    return (
        <>
            {isLoading ? (
                <p>Loading catalogs...</p>
            ) : error ? (
                <p>Error fetching catalogs: {error}</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.product_name}</li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default Test;