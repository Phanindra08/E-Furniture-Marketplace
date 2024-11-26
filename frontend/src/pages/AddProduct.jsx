import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TextField, Button, Typography, Card, CardContent, Grid } from "@mui/material";
import { APIEndPoints, LOCAL_STORAGE } from "../utils/config";

function AddProduct({ mode }) {
    const location = useLocation();
    const { product } = location?.state || {};
    const productId = product?._id || {};
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        location: "",
        img:""
    });
    const [image, setImage] = useState(null); // State for handling the selected image file


    useEffect(() => {
        if(product){
            const prefilledData = {
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                location: product.location,
                img: product.img
            };
            setFormData(prefilledData);
        }
      }, [mode=='EDIT',product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file
    };
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const method = mode === "add" ? "POST" : "PUT";
            const endpoint = mode === "add" ? APIEndPoints.ADDPRODUCT : `${APIEndPoints.UPDATEPRODUCT}/${productId}`;
            console.log("FormData:", formData);
            console.log("Image:", image);

            // Create a FormData object to include the image file and other fields
            const formDataWithImage = new FormData();
            formDataWithImage.append("title", formData.title);
            formDataWithImage.append("description", formData.description);
            formDataWithImage.append("category", formData.category);
            formDataWithImage.append("price", formData.price);
            formDataWithImage.append("location", formData.location);
            if (image) {
                formDataWithImage.append("img", image); // Append the selected file
            }
            for (let [key, value] of formDataWithImage.entries()) {
                console.log(key, value);
            }

            const res = await fetch(endpoint, {
                method,
                headers: {
                    Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN), // No Content-Type for FormData
                },
                body: formDataWithImage,
            });

            if (!res.ok) throw new Error(`Failed to ${mode === "add" ? "add" : "update"} product`);
            const data = await res.json();
            console.log(`${mode === "add" ? "Product added" : "Product updated"} successfully:`, data);

            alert(`Product ${mode === "add" ? "added" : "updated"} successfully!`);

            // Reset the form for add mode
                setFormData({
                    title: "",
                    description: "",
                    category: "",
                    price: "",
                    location: "",
                    img:""
                });
            setImage(null); // Clear the image file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Reset the file input
            }
        } catch (error) {
            console.error(`Error ${mode === "add" ? "adding" : "updating"} product:`, error);
        }
    };

    return (
        <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
            <Card style={{ maxWidth: 600, padding: "20px 5px" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {mode === "add" ? "Add a New Product" : "Edit Product Details"}
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
                        {/* File Input for Image Upload */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginTop: "1rem" }}
                            required={mode === "add"} // Required for adding a new product
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "1rem" }}
                        >
                            {mode === "add" ? "Add Product" : "Update Product"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AddProduct;
