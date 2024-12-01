import React, {
    useContext,
    useState,
    useEffect,
    useCallback,
    lazy,
    Suspense,
    useMemo,
  } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { Snackbar } from "@mui/material";
  import { StoreContext, StoreActions } from "../store";
  import { LOCAL_STORAGE, APIEndPoints, PAGE_LINK } from "../utils/config";
  import ProductInfo from "./ProductInfo";
  import "../styles/ProductInfos.css";
  
  // Lazy-loaded components for better performance
  const LoginCheckModal = lazy(() => import("./LoginCheckModal.jsx"));
  const MakeOfferModal = lazy(() => import("./MakeOfferModal.jsx"));
  
  const ProductDetails = () => {
    const store = useContext(StoreContext);
    const { product, isLoggedIn, user } = store.state;
    const navigate = useNavigate();
  
    const productId = product._id;
    const userId = useMemo(() => localStorage.getItem(LOCAL_STORAGE.USER_ID), []);
    const [showModal, setShowModal] = useState(false);
    const [showCheckModal, setCheckModal] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [localProduct, setLocalProduct] = useState(product);
    const [imageLoaded, setImageLoaded] = useState(false); // Image load state
    const [isMarkAsSold, setIsMarkAsSold] = useState(false);
  
    const placeholderImage = "https://via.placeholder.com/300"; // Default placeholder
  
    const onCloseModal = useCallback(() => setShowModal(false), []);
    const onCloseCheckModal = useCallback(() => setCheckModal(false), []);
  
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
          {!imageLoaded && <div className="spinner">Loading Image...</div>}
          <img
            src={localProduct.img}
            alt={localProduct.title}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`product-image ${imageLoaded ? "visible" : "hidden"}`}
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
        </div>
        <div className="productInfo-container">
          <h2 className="productInfo-title">{localProduct.title}</h2>
          <div>{`Product Seller: ${localProduct.seller?.username || ""}`}</div>
          <h3 className="productInfo-price">£{localProduct.price}</h3>
          <ProductInfo description={localProduct.description} />
          {isLoggedIn && localProduct.userId === userId && (
            <div>
              <Link
                to={`${PAGE_LINK.UPDATEPRODUCT}/${productId}`}
                state={{ localProduct }}
              >
                Edit Product
              </Link>
              <button onClick={onDeleteProduct}>Delete Product</button>
            </div>
          )}
          {isLoggedIn && localProduct.userId !== userId && (
            <button className="add-btn" onClick={addItemToBasketHandler}>
              Add to Wishlist
            </button>
          )}
        </div>
  
        <Suspense fallback={<div>Loading Modal...</div>}>
          {showModal && (
            <MakeOfferModal
              onCloseModal={onCloseModal}
              handleSubmitOffer={handleSubmitOffer}
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