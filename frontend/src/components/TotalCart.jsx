import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GrDeliver } from "react-icons/gr";
import { BsShop } from "react-icons/bs";

import { StoreContext } from "../store";
import { PAGE_LINK } from "../utils/config";

const TotalCart = () => {
	const [total, setTotal] = useState(0);
	const store = useContext(StoreContext);
	const basketItems = store.state.basketItems;

	// update total============================================
	useEffect(() => {
		if (basketItems.length >= 1) {
			const priceQty = basketItems.map((el) => {
				return Number(el.productId.price) * Number(el.quantity);
			});
			const total = priceQty.reduce((acc, curr) => acc + curr).toFixed(2);
			setTotal(total);
		}
	}, [basketItems]);

	return (
		<>
			<div className="delivery-container">
				<div className="delivery-section">
					<div className="delivery">
						<p>
							<span className="delivery-icon">
								<GrDeliver />
							</span>
							<span>Home Delivery available</span>
						</p>
						<p>
							<span className="delivery-icon">
								<BsShop />
							</span>
							<span>
								Click & Collect not available (only available when all order
								items are small)
							</span>
						</p>
					</div>
					<p className="delivery-price">£39</p>
				</div>
				<div className="total-section">
					<p>{`Subtotal (${basketItems.length} item)`}</p>
					<p>£{total}</p>
				</div>
			</div>
			<Link
				className="checkout-btn"
				to={!store.state.isLoggedIn ? PAGE_LINK.REGISTER : ""}
			>
				Go to checkout
			</Link>
		</>
	);
};

export default TotalCart;
