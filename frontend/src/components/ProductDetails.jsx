import { Link as ScrollLink } from "react-scroll";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CarouselImages from "./CarouselImages";
import ProductInfo from "./ProductInfo";
import Modal from "./Modal";

import { StoreContext, StoreActions } from "../store";
import { getRating, starIcons } from "../utils/utils";
import { LOCAL_STORAGE, APIEndPoints } from "../utils/config.js";

const ProductDetails = () => {
	const store = useContext(StoreContext);
	const product = store.state.product;
	console.log("prodct",product)
	const productId = product._id;
	
	const location = useLocation();
	console.log("product.user != LOCAL_STORAGE.USER_ID ",product.user,LOCAL_STORAGE.USER_ID )
	const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
	const [showModal, setShowModal] = useState(false);
	const [submit, setSubmit] = useState(false);

	const onCloseModal = () => {
		setShowModal(false);
	};

	// use effect for posting data to db===============================
	useEffect(() => {
		// if user logged in
		if (submit) {
			// trigger the POST request
			const postBasketData = async () => {
				const quantity = store.state.quantity;
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
		// eslint-disable-next-line
	}, [submit]);

	// add item to basket handler ========================================
	const addItemToBasketHandler = () => {
		if (!userId) {
			setShowModal(true);
			// reset the quantity after the item has been added to the basket
			store.dispatch({ type: StoreActions.UPDATE_QUANTITY, payload: 0 });
		} else {
			setSubmit(true);
		}
	};

	return (
		<section className="product-item">
			<div className="productImg-container">
				<img
					src={product.img}
					alt={product.title}
					loading="lazy"
				/>
				<CarouselImages />
			</div>
			<div className="productInfo-container">
				<h2 className="productInfo-title">{product.title}</h2>
				<div className="stars">
					{/* {starIcons.map((star, index) => {
						return <span key={index}>{star}</span>;
					})}
					<span>{getRating(product.rating)}</span> */}
					{/* react-scroll */}
					{/* <ScrollLink
						to="reviews"
						className="review-number"
						smooth={true}
						duration={500}
						spy={true}
						exact="true"
						offset={-70}
					>
						{product.review}Reviews
					</ScrollLink> */}
					<div>{`Product Seller: ${store.state.quantity}`}</div>
				</div>
				<h3 className="productInfo-price">£{product.price}</h3>
				<ProductInfo />
				{product.user != userId && <div className="productInfo-select">
					<input
						type="number"
						name="num"
						className="num"
						min="1"
						value={store.state.quantity}
						onChange={(e) =>
							store.dispatch({
								type: StoreActions.UPDATE_QUANTITY,
								payload: e.target.value,
							})
						}
					/>
					<button className="add-btn" onClick={addItemToBasketHandler}>
						Add to basket
					</button>
				</div>}
			</div>
			{showModal && <Modal onCloseModal={onCloseModal} />}
		</section>
	);
};

export default ProductDetails;
