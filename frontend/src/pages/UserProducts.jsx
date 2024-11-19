import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { APIEndPoints, LOCAL_STORAGE } from '../utils/config';
import Product from '../components/Product';
import "../styles/MyProduct.css";

function UserProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserProducts = async () => {
        try {
            const res = await fetch(APIEndPoints.MYPRODUCTS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN), // Pass the token if required
                }
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user products:', error);
            setLoading(false);
        }
    };

    // Fetch user products from the backend
    useEffect(() => {
        fetchUserProducts();
    }, []);

    // Render loading message if data is still being fetched
    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }


    return (
		<>
            {products.length > 0 ? 
                <div className="product-container">
					{products &&
						products.map((item, index) => {
							return <Product key={index} item={item} />;
						})}
				</div>
            : <>No items</>}</>
    );
}

export default UserProducts;
