import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store";
import { APIEndPoints } from "../utils/config";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

const UserProfile = () => {
    const store = useContext(StoreContext); // Access global state
    const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "" });
    const [passwords, setPasswords] = useState({ newPassword: "", reEnterPassword: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch user details on component load
    useEffect(() => {
        if (store.state.user?.id) {
            const fetchUserDetails = async () => {
                setLoading(true); // Start loading
                try {
                    const response = await fetch(
                        `${APIEndPoints.USERDETAILS}/${store.state.user.id}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Fetched user details:", data); // Log fetched data
                        setUserDetails(data || { username: "", email: "", password: "" });
                    } else {
                        console.error("Error fetching user details:", data.message);
                        setErrorMessage(data.message || "Failed to fetch user details.");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    setErrorMessage("An error occurred while fetching user details.");
                } finally {
                    setLoading(false); // End loading
                }
            };

            fetchUserDetails();
        } else {
            setLoading(false);
            setErrorMessage("User is not logged in or invalid user data.");
        }
    }, [store.state.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "newPassword" || name === "reEnterPassword") {
            setPasswords((prev) => ({ ...prev, [name]: value }));
        } else {
            setUserDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        if (!userDetails.username) {
            setErrorMessage("Username cannot be empty.");
            return false;
        }

        if (passwords.newPassword && passwords.reEnterPassword && passwords.newPassword !== passwords.reEnterPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        return true;
    };

    // Handle form submission to update profile
    const handleSave = async (e) => {
        console.log("Handling Save");
        console.log(userDetails);
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!validateForm()) return;

        try {
            const response = await fetch(
                `${APIEndPoints.UPDATEUSERDETAILS}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        username: userDetails.username,
                        email: userDetails.email,
                        password: passwords.newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Profile updated successfully!");
                console.log(data);
                setPasswords({ newPassword: "", reEnterPassword: "" });
            } else {
                setErrorMessage(data.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("An error occurred while updating your profile.");
        }
    };

    if (loading) {
        return (
            <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
                <Typography variant="h6">Loading user details...</Typography>
            </Grid>
        );
    }

    return (
        <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
            <Card style={{ maxWidth: 600, padding: "20px 5px" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        User Profile
                    </Typography>
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    {successMessage && <Typography color="primary">{successMessage}</Typography>}

                    <form onSubmit={handleSave}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            value={userDetails.email || ""}
                            disabled
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            name="username"
                            value={userDetails.username || ""}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Re-enter Password"
                            type="password"
                            name="reEnterPassword"
                            value={passwords.reEnterPassword}
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "1rem" }}
                        >
                            Save Details
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserProfile;