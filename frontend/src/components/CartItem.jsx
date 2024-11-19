import { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import { StoreContext, StoreActions } from "../store";
import { starIcons, getRating } from "../utils/utils";
import { LOCAL_STORAGE, APIEndPoints } from "../utils/config.js";

import "../styles/Basket.css";

const CartItem = ({ item }) => {
	const store = useContext(StoreContext);

	// update the basket=======================================
	const updateBasketData = async (quantity, productId) => {
		console.log("productId---",productId);
		await fetch(`${APIEndPoints.BASKET}${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
			},
			body: JSON.stringify({
				productId,
				userId: localStorage.getItem(LOCAL_STORAGE.USER_ID),
				quantity,
			}),
		});
		const basketItems = store.state.basketItems;
		// if the quantity is zero or less, remove the item from basket
		if (quantity <= 0) {
			const updatedItems = basketItems.filter(
				(item) => item.productId._id !== productId
			);
			store.dispatch({
				type: StoreActions.UPDATE_BASKETITEMS,
				payload: updatedItems,
			});
			store.dispatch({
				type: StoreActions.UPDATE_NUMOFITEMS,
				payload: null,
			});
		} else {
			// update the quantity of the item in the state
			console.log("item.productId?._id === productId",item.productId?._id === productId)
			const updatedItems = basketItems.map((item) =>
				item.productId?._id === productId ? { ...item, quantity } : item
			);
			console.log("updatedItems after adding item",updatedItems)
			store.dispatch({
				type: StoreActions.UPDATE_BASKETITEMS,
				payload: updatedItems,
			});
			store.dispatch({
				type: StoreActions.UPDATE_NUMOFITEMS,
				payload: updatedItems.length,
			});
		}
	};

	// add more items to cart ================================
	const addItem = (item) => {
		const quantity = Number(item.quantity) + 1;
		console.log("add item",item)
		const productId = item.productId._id;

		updateBasketData(quantity, productId);
	};

	// remove items from cart==================================
	const removeItem = (item) => {
		console.log("remove item",item)
		const quantity = Number(item.quantity) - 1;
		const productId = item.productId._id;

		updateBasketData(quantity, productId);
	};

	// console.log("basketItems irtem cartitem ---- item ---",item, item.productId,item.productId.title)
	return (
		<>{item.productId && item.quantity ? <div className="row body-row">
			<div className="body-row-info">
				{/* <img src={item.productId.img} alt={item.productId.title} /> */}
				<div className="info-cart">
					<p>{item?.productId?.title}</p>
					{/* <div className="cart-stars">
						{starIcons.map((star, index) => {
							return <span key={index}>{star}</span>;
						})}
						<span>{getRating(item.productId.rating)}</span>
					</div>
					<p className="delivery">Estimated dispatch within 5 working days</p> */}
				</div>
			</div>
			<p>£{item.productId.price}</p>
			<div className="quantity-container">
				<button className="popup-plus" onClick={() => removeItem(item)}>
					<FaMinus />
				</button>
				<div className="quantity">{item.quantity}</div>
				<button className="popup-minus" onClick={() => addItem(item)}>
					<FaPlus />
				</button>
			</div>
			<p>£{Number(item.quantity * item.productId.price).toFixed(2)}</p>
		</div> : <></>}</>
	);
};

export default CartItem;
