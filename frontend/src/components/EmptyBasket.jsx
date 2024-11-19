import { Link } from "react-router-dom";

import { PAGE_LINK } from "../utils/config";

const EmptyBasket = () => {
	return (
		<div className="empty-container">
			<p className="empty-basket">You have no items in your shopping basket.</p>
			<Link to={PAGE_LINK.SHOP}>
				<button className="continue-btn">Continue Shopping</button>
			</Link>
		</div>
	);
};

export default EmptyBasket;
