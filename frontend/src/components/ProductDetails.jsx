import { useContext, useState, useEffect } from "react";
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
				<div className="button-container">
					<button className="make-offer-btn" onClick={onClickMakeOffer}>Make an Offer</button>
					{isLoggedIn && product.userId === userId &&
						<Link 
							to={`${PAGE_LINK.UPDATEPRODUCT}/${productId}`} 
							className="make-offer-btn"
							state={{ product }}
							>
								Edit Product Details
					</Link>}
				</div>
				{/* <CarouselImages /> */}
			</div>
			<div className="productInfo-container">
				<h2 className="productInfo-title">{product.title}</h2>
				<div className="stars">
					<div>{`Product Seller: ${product.seller ? product.seller.username : ''}`}</div>
                </div>
                <h3 className="productInfo-price">£{product.price}</h3>
                <ProductInfo description={product.description}/>
                {product.userId !== userId && <div className="productInfo-select">
					<button className="add-btn" onClick={addItemToBasketHandler}>
						Add to Wishlist
					</button>
				</div>}
			</div>
			{showModal && 
			<MakeOfferModal 
				onCloseModal={onCloseModal} 
				handleShowSnackbar={handleShowSnackbar}
				sellerEmail={product.seller.email} 
				userEmail={user.email}
				productTitle={product.title}
				productPrice={product.price} />}

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
