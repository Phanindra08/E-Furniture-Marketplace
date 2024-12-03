import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import { PAGE_LINK } from "../utils/config";
import LoginCheckModal from "./LoginCheckModal.jsx";
import Snackbar from '@mui/material/Snackbar';
import ProductInfo from "./ProductInfo";
import MakeOfferModal from "./MakeOfferModal.jsx";
import "../styles/ProductInfos.css";
import DeleteIcon from '@mui/icons-material/Delete';



import { StoreContext, StoreActions } from "../store";
import { LOCAL_STORAGE, APIEndPoints } from "../utils/config.js";

const ProductDetails = () => {
    const store = useContext(StoreContext);
    const product = store.state.product;
    const isLoggedIn = store.state.isLoggedIn;
    const user = store.state.user;
    const productId = product._id;
    
    const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
    const [showModal, setShowModal] = useState(false);
    const [showCheckModal, setCheckModal] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const onCloseModal = () => {
        setShowModal(false);
    };

    const onCloseCheckModal = () => {
        setCheckModal(false);
    }

    const handleSubmitOffer = async (offerPrice) => {
        const sellerEmail=product.seller.email;
        const userEmail=user.email
        const productTitle=product.title
        const productPrice=product.price

        if (offerPrice <= 0 || isNaN(offerPrice) || productPrice<offerPrice) {
          alert('Please enter a valid offer price.');
          return;
        }

        try {
          // Send the offer to the backend API to trigger the email
          const response = await fetch(`${APIEndPoints.MAKEOFFER}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userEmail,
              productTitle,
              offerPrice,
              sellerEmail,
            }),
          });
          
          const data = await response.json();
          if (data.success) {
             
            onCloseModal();
            handleShowSnackbar(true);
          } else {
            alert('Failed to send offer');
          }
        } catch (error) {
          console.error('Error sending offer:', error);
          alert('An error occurred while submitting your offer.');
        }
      };

    const onClickMakeOffer = () => {
        if(!isLoggedIn) setCheckModal(true);
        else setShowModal(true);
    }
    const handleShowSnackbar = (val) => {
        setIsSnackbarOpen(val);
      };

    // use effect for posting data to db
    useEffect(() => {
        // if user logged in
        if (submit) {
            // trigger the POST request
            const postBasketData = async () => {
                const quantity = 1;
                const res = await fetch(`${APIEndPoints.BASKET}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
                    },
                    body: JSON.stringify({
                        productId: productId,
                        userId: userId,
                        quantity: Number(quantity),
                    }),
                });
                const resData = await res.json();
                console.log("resdata",resData)
                const numberOfItems = resData.data.items;
                // update number of items add to basket
                store.dispatch({
                    type: StoreActions.UPDATE_NUMOFITEMS,
                    payload: numberOfItems.length,
                });
                // reset the quantity after the item has been added to the basket
                store.dispatch({ type: StoreActions.UPDATE_QUANTITY, payload: 0 });
            };
            postBasketData();
        }
        // reset submit to false after the POST request is made
        setSubmit(false);
    }, [submit]);

    const onDeleteProduct = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the product "${product.title}"? This action cannot be undone.`
        );
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${APIEndPoints.DELETEPRODUCT}/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
                },
            });

            if (!res.ok) throw new Error("Failed to delete product");

            alert("Product deleted successfully!");

            // Redirect the user after deletion
            navigate(PAGE_LINK.USERPRODUCTS, { replace: true }); // Navigate to the user's product list or another relevant page
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again later.");
        }
    };

    // add item to basket handler
    const addItemToBasketHandler = () => {
        if(!isLoggedIn) setCheckModal(true);
        else{
            if (!userId) {
                setShowModal(true);
                // reset the quantity after the item has been added to the basket
                store.dispatch({ type: StoreActions.UPDATE_QUANTITY, payload: 0 });
            } else {
                setSubmit(true);
            }
        }
    };

    return (
        <section className="product-item">
            <div className="productImg-container">
                <img
                    src={product.img}
                    alt={product.title}
                    loading="lazy"
                    className="product-image"
                />
                {isLoggedIn && product.userId != userId && <div className="button-container">
                    <button className="make-offer-btn" onClick={onClickMakeOffer}>Make an Offer</button>
                    <button className="make-offer-btn" onClick={()=>handleSubmitOffer(product.price)}>Buy Product now</button>
                </div>}        
            </div>
            <div className="productInfo-container">
                <h2 className="productInfo-title">{product.title}</h2>
                <div className="stars">
                    <div>{`Product Seller: ${product.seller ? product.seller.username : ''}`}</div>
                </div>
                <h3 className="productInfo-price">${product.price}</h3>
                <ProductInfo description={product.description}/>
                {isLoggedIn && (product.userId != userId ? <div className="productInfo-select">
                    <button className="add-btn" onClick={addItemToBasketHandler}>
                        Add to Wishlist
                    </button>
                </div> : <div style={{ display:'flex', columnGap: '20px', margin: '20px', textDecoration: 'underline', alignItems:'center'}}>
                        <Link 
                            style={{ fontSize: '15px'}}
                            to={`${PAGE_LINK.UPDATEPRODUCT}/${productId}`} 
                            state={{ product }}
                            >
                                Edit Product
                        </Link>
                        <button 
                            onClick={onDeleteProduct}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: '15px'
                            }}
                        > Delete Product
                        </button>
                   </div>)}


                <div></div>
            </div>
            {showModal && 
            <MakeOfferModal 
                onCloseModal={onCloseModal} 
                handleSubmitOffer={handleSubmitOffer} />}

            {showCheckModal && <LoginCheckModal  onCloseModal={onCloseCheckModal} />}

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={1000}
                onClose={() => handleShowSnackbar(false)}
                message={<div style={{ fontSize: "15px" }}>{"Your offer has been successfully sent to the seller!"}</div>}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            />
        </section>
    );
};

export default ProductDetails;

