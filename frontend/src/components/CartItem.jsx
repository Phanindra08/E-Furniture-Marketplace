import { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import { StoreContext, StoreActions } from "../store";
import { starIcons, getRating } from "../utils/utils";
import { FaTrash } from 'react-icons/fa';
import { LOCAL_STORAGE, APIEndPoints } from "../utils/config.js";

import "../styles/Basket.css";

const CartItem = ({ item }) => {
	const store = useContext(StoreContext);

	// update the basket=======================================
	const updateBasketData = async (quantity, productId) => {
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
			const updatedItems = basketItems.map((item) =>
				item.productId?._id === productId ? { ...item, quantity } : item
			);
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
		const productId = item.productId._id;

		updateBasketData(quantity, productId);
	};

	// remove items from cart==================================
	const removeItem = (item) => {
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
				</div>
			</div>
			<p>£{item.productId.price}</p>
			<p>£{Number(item.quantity * item.productId.price).toFixed(2)}</p>
			<p><FaTrash size={20} color="red" onClick={()=>removeItem(item)} style={{ cursor: 'pointer'}}/></p>	
			
		</div> : <></>}</>
	);
};

export default CartItem;
