import { useEffect, useContext } from "react";

import CartItem from "../components/CartItem";
import EmptyBasket from "../components/EmptyBasket";
import TotalCart from "../components/TotalCart";

import { LOCAL_STORAGE, APIEndPoints } from "../utils/config";
import { StoreContext, StoreActions } from "../store";

import "../styles/Basket.css";

const Basket = () => {
	const store = useContext(StoreContext);
	const basketItems = store.state.basketItems;

	// get data from db=====================
	useEffect(() => {
		const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);

		console.log("userid",userId)

		if (userId) {
			const getBasketData = async () => {
				try {
					const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
					console.log("userId---",userId);
					const val = `${APIEndPoints.BASKET}${userId}`;
					console.log("Val",val)
					const res = await fetch(`${APIEndPoints.BASKET}${userId}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
						},
					});
					const resData = await res.json();
					console.log("ResDATA",resData)
					// resData.data.items
					if (resData && resData.data && resData.data.items) {
						store.dispatch({
							type: StoreActions.UPDATE_BASKETITEMS,
							payload: resData.data.items,
						});
					} else {
						console.log("Data not found");
					}
				} catch (err) {
					console.log(err);
				}
			};
			getBasketData();
		}
		// eslint-disable-next-line
	}, []);

	console.log("basketItems",basketItems)
	return (
		<div className="shopping-cart">
			<h1>
				Shopping Cart <span>: {basketItems.length} items</span>
			</h1>
			{basketItems.length < 1 ? (
				<EmptyBasket />
			) : (
				<>
					<div className="cart-section">
						<div className="row header-row">
							<p className="header">product</p>
							<p className="header">Unit price</p>
							<p className="header">Quantity</p>
							<p className="header">Total</p>
						</div>
						<div className="cart">
							{basketItems.map((item, index) => {
								return <CartItem key={index} item={item} />;
							})}
						</div>
					</div>
					{/* <TotalCart /> */}
				</>
			)}
		</div>
	);
};

export default Basket;
