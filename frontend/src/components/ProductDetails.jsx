import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
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
    const { product, isLoggedIn, user } = store.state;
    const navigate = useNavigate();
  
    const productId = product._id;
    
    const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
    const [showModal, setShowModal] = useState(false);
    const [showCheckModal, setCheckModal] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [localProduct, setLocalProduct] = useState(product);
    const [imageLoaded, setImageLoaded] = useState(false); // Image load state
    const [isMarkAsSold, setIsMarkAsSold] = useState(false);
  
    const placeholderImage = "https://via.placeholder.com/300"; // Default placeholder
  
  
    const handleImageError = useCallback((e) => {
      e.target.src = placeholderImage;
    }, []);

    const fetchUpdatedProduct = async () => {
        try {
          const res = await fetch(`${APIEndPoints.GETPRODUCT}/${productId}`);
          const updatedProduct = await res.json();
          if (res.ok) {
            console.log("updated product data is ", updatedProduct);
            setLocalProduct(updatedProduct);
            console.log("product id is ", productId);
            console.log("local product data is ", localProduct);
            store.dispatch({
              type: StoreActions.UPDATE_PRODUCT,
              payload: updatedProduct,
            });
          }
        } catch (error) {
          console.error("Error fetching updated product details:", error);
        }
    }

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
      };
  
      const markAsSoldHandler = useCallback(async () => {
        try {
          const res = await fetch(`${APIEndPoints.MARKASSOLD}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
            },
            body: JSON.stringify({
              sold: true,
              productId,
              userId,
            }),
          });
      
          if (res.ok) {
            alert("Product marked as sold successfully!");
            store.dispatch({
              type: StoreActions.UPDATE_PRODUCT,
              payload: { ...localProduct, sold: true }, // Update the product status in state
            });
          } else {
            console.error("Failed to mark product as sold");
          }
        } catch (error) {
          console.error("Error marking product as sold:", error);
        }
      }, [localProduct, productId, userId, store]);
      
  
    const handleSubmitOffer = useCallback(
      async (offerPrice) => {
        const sellerEmail = product.seller.email;
        const userEmail = user.email;
        const productTitle = product.title;
        const productPrice = product.price;
  
        if (offerPrice <= 0 || isNaN(offerPrice) || productPrice < offerPrice) {
          alert("Please enter a valid offer price.");
          return;
        }
  
        try {
          const response = await fetch(`${APIEndPoints.MAKEOFFER}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
            setIsSnackbarOpen(true);
          } else {
            alert("Failed to send offer");
          }
        } catch (error) {
          console.error("Error sending offer:", error);
          alert("An error occurred while submitting your offer.");
        }
      },
      [onCloseModal, product, user]
    );
  
    const addItemToBasketHandler = useCallback(() => {
      if (!isLoggedIn) setCheckModal(true);
      else setSubmit(true);
    }, [isLoggedIn]);
  
    const onDeleteProduct = useCallback(async () => {
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
        navigate(PAGE_LINK.USERPRODUCTS, { replace: true });
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again later.");
      }
    }, [navigate, product.title, productId]);

    useEffect(() => {
        setIsMarkAsSold(isLoggedIn && product.userId === userId)
        setLocalProduct(product);
    }, [product]);

    useEffect(() => {
        if (!product || product._id !== productId) {
          const fetchProduct = async () => {
            try {
              const response = await fetch(`${APIEndPoints.GETPRODUCT}/${productId}`);
              const data = await response.json();
              if (response.ok) {
                store.dispatch({ type: StoreActions.UPDATE_PRODUCT, payload: data });
                setLocalProduct(data);
              }
            } catch (error) {
              console.error("Failed to fetch product details:", error);
            }
          };
          fetchProduct();
        }
      }, [product, productId, store]);
    
      if (!localProduct) return <div>Loading product details...</div>;

    // useEffect(() => {
    //   if (submit) {
    //     const postBasketData = async () => {
    //       try {
    //         const res = await fetch(`${APIEndPoints.BASKET}`, {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
    //           },
    //           body: JSON.stringify({
    //             productId,
    //             userId,
    //             quantity: 1,
    //           }),
    //         });
    //         const resData = await res.json();
    //         const numberOfItems = resData.data.items;
    //         store.dispatch({
    //           type: StoreActions.UPDATE_NUMOFITEMS,
    //           payload: numberOfItems.length,
    //         });
    //       } catch (error) {
    //         console.error("Error adding item to basket:", error);
    //       } finally {
    //         setSubmit(false);
    //       }
    //     };
    //     postBasketData();
    //   }
    // }, [submit, productId, userId, store]);
  
    return (

        <section className="product-item">
            <div className="productImg-container">
                <img
                    src={product.img}
                    alt={product.title}
                    loading="lazy"
                    className="product-image"
                />
                      {isMarkAsSold ? (
            <div>
              {localProduct.sold ? (
                <div className="sold-banner">This product is sold.</div>
              ) : (
                <button className="mark-as-sold-btn" onClick={markAsSoldHandler}>
                  Mark as Sold
                </button>
              )}
            </div>
          ) : (
            <div className="button-container">
              <button className="make-offer-btn" onClick={() => setShowModal(true)}>
                Make an Offer
              </button>
              <button
                className="make-offer-btn"
                onClick={() => handleSubmitOffer(localProduct.price)}
              >
                Buy Product Now
              </button>
            </div>
          )}
//                 {isLoggedIn && product.userId != userId && <div className="button-container">
//                     <button className="make-offer-btn" onClick={onClickMakeOffer}>Make an Offer</button>
//                     <button className="make-offer-btn" onClick={()=>handleSubmitOffer(product.price)}>Buy Product now</button>
//                 </div>}        
            </div>
            <div className="productInfo-container">
                <h2 className="productInfo-title">{product.title}</h2>
                <div className="stars">
                    <div>{`Product Seller: ${product.seller ? product.seller.username : ''}`}</div>
                </div>
                <h3 className="productInfo-price">£{product.price}</h3>
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
          )}
          {showCheckModal && <LoginCheckModal onCloseModal={onCloseCheckModal} />}
        </Suspense>
  
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={1000}
          onClose={() => setIsSnackbarOpen(false)}
          message="Your offer has been successfully sent to the seller!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </section>
    );
  };
  
  export default React.memo(ProductDetails);  