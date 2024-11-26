import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { PAGE_LINK } from "../utils/config";
import LoginCheckModal from "./LoginCheckModal.jsx";
import Snackbar from '@mui/material/Snackbar';
import ProductInfo from "./ProductInfo";
import MakeOfferModal from "./MakeOfferModal.jsx";

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

	const [localProduct, setLocalProduct] = useState(product); // Local state to handle product updates

	const onCloseModal = () => {
		setShowModal(false);
	};

	const onCloseCheckModal = () => {
		setCheckModal(false);
	}

	const onClickMakeOffer = () => {
		if(!isLoggedIn) setCheckModal(true);
		else setShowModal(true);
	}
	const handleShowSnackbar = (val) => {
		setIsSnackbarOpen(val);
	  };

	// Mark as Sold Handler
	const markAsSoldHandler = async () => {
		try {
			const res = await fetch(`${APIEndPoints.MARKASSOLD}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
				},
				body: JSON.stringify({
					sold: true, // Marking the product as sold
					productId: productId,
					userId: userId,
				}),
			});

			if (res.ok) {
				const updatedProduct = await res.json();

				// Update the local state for immediate UI update
				setLocalProduct({ ...localProduct, sold: true });

				// Update the product in the store
				store.dispatch({
					type: StoreActions.UPDATE_PRODUCT,
					payload: updatedProduct,
				});

				alert("Product marked as sold successfully!");
			} else {
				console.error("Failed to mark product as sold");
			}
		} catch (error) {
			console.error("Error marking product as sold:", error);
		}
	};

	// useEffect for adding product to basket
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
					src={localProduct.img}
					alt={localProduct.title}
					loading="lazy"
					className="product-image"
				/>
				<div className="button-container">
					{isLoggedIn && localProduct.userId === userId ? (
						// Mark as Sold Button for Product Owner
						!localProduct.sold ? (
							<button className="mark-as-sold-btn" onClick={markAsSoldHandler}>
								Mark as Sold
							</button>
						) : (
							<div className="sold-status">Product has been sold</div>
						)
					) : (
						// Make an Offer Button for Other Users
						<button className="make-offer-btn" onClick={onClickMakeOffer}>
							Make an Offer
						</button>
					)}
					{isLoggedIn && localProduct.userId === userId && (
						<Link
							to={`${PAGE_LINK.UPDATEPRODUCT}/${productId}`}
							className="edit-product-btn"
							state={{ product: localProduct }}
						>
							Edit Product Details
						</Link>
					)}
				</div>
			</div>
			<div className="productInfo-container">
				<h2 className="productInfo-title">{localProduct.title}</h2>
				<div className="stars">
					<div>{`Product Seller: ${
						localProduct.seller ? localProduct.seller.username : ""
					}`}</div>
				</div>
				<h3 className="productInfo-price">£{localProduct.price}</h3>
				<ProductInfo description={localProduct.description} />
				{localProduct.userId !== userId && (
					<div className="productInfo-select">
						<button className="add-btn" onClick={addItemToBasketHandler}>
							Add to Wishlist
						</button>
					</div>
				)}
			</div>
			{showModal && (
				<MakeOfferModal
					onCloseModal={onCloseModal}
					handleShowSnackbar={handleShowSnackbar}
					sellerEmail={localProduct.seller.email}
					userEmail={user.email}
					productTitle={localProduct.title}
					productPrice={localProduct.price}
				/>
			)}

			{showCheckModal && <LoginCheckModal onCloseModal={onCloseCheckModal} />}

			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={1000}
				onClose={() => handleShowSnackbar(false)}
				message={
					<div style={{ fontSize: "15px" }}>
						{"Your offer has been successfully sent to the seller!"}
					</div>
				}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			/>
		</section>
	);
};

export default ProductDetails;