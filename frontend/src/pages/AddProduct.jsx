import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import { APIEndPoints, LOCAL_STORAGE } from "../utils/config";

function AddProduct() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        location: '',
        img: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, img:  e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend to add a new product
                const res = await fetch(`${APIEndPoints.ADDPRODUCT}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json",Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN), }, // Send JSON data
				body: JSON.stringify(formData), // Convert formData to JSON
              });
            
    
            // Check if the response is not successful (status code outside 200–299 range)
            if (!res.ok) {
                throw new Error(`Failed to add product: ${res.statusText}`);
            }
    
            // // Parse the response JSON to get the created product data
            const data = await res.json();
            console.log("Product added successfully:", data);
    
            // // Reset the form after successful submission
            setFormData({
                title: '',
                description: '',
                category: '',
                price: '',
                location: '',
                img: '',
            });
            
            // Optional: Display success message or handle success state
            alert("Product added successfully!");    
            

        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
            <Card style={{ maxWidth: 600, padding: '20px 5px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        Add a New Product
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

                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                placeholder="Image URL"
                                value={formData.img}
                                onChange={(e) => handleImageChange(e)}
                                margin="normal"
                            />
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '1rem' }}
                        >
                            Add Product
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AddProduct;
