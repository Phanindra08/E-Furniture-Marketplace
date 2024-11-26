import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { APIEndPoints, LOCAL_STORAGE } from "../utils/config";

function AddProduct({ mode }) {
    const location = useLocation();
    const { product } = location?.state || {};
    const productId = product?._id  || {};
    const productFormData = mode=='EDIT' ? {
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        location: product.location,
        img: product.img,
        sold: false
    } : {
        title: '',
        description: '',
        category: '',
        price: '',
        location: '',
        img: '',
        sold: false
    };

    const [formData, setFormData] = useState(productFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const method = mode === 'add' ? 'POST' : 'PUT';
            const endpoint = mode === 'add' ? APIEndPoints.ADDPRODUCT : `${APIEndPoints.UPDATEPRODUCT}/${productId}`;
            const res = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
                },
                body: JSON.stringify(formData),
            });

            console.log("res --",res)
            if (!res.ok) throw new Error(`Failed to ${mode === 'add' ? 'add' : 'update'} product`);
            const data = await res.json();
            console.log(`${mode === 'add' ? 'Product added' : 'Product updated'} successfully:`, data);

            alert(`Product ${mode === 'add' ? 'added' : 'updated'} successfully!`);
            // Reset the form for add mode
            
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    price: '',
                    location: '',
                    img: '',
                });
            
        } catch (error) {
            console.error(`Error ${mode === 'add' ? 'adding' : 'updating'} product:`, error);
        }
    };

    return (
        <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
            <Card style={{ maxWidth: 600, padding: '20px 5px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {mode === 'add' ? 'Add a New Product' : 'Edit Product Details'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            name="title"
                            label="Product Title"
                            variant="outlined"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            name="description"
                            label="Product Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            name="category"
                            label="Category (e.g., Sofa, Table)"
                            variant="outlined"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            type="number"
                            name="price"
                            label="Price"
                            variant="outlined"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            name="location"
                            label="Location"
                            variant="outlined"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            placeholder="Image URL"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '1rem' }}
                        >
                            {mode === 'add' ? 'Add Product' : 'Update Product'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AddProduct;
