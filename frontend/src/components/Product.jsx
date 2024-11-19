import { Link } from "react-router-dom";

import "../styles/Shop.css";

import { getRating, starIcons } from "../utils/utils";
import { PAGE_LINK } from "../utils/config";

const Product = ({ item }) => {
	const itemId = item._id;
	return (
		<div className="product">
			<img className="product__img" src={item.img} alt={item.title} />
			<p className="product__name">{item.title}</p>
			<div className="product__stars">
				{/* <div className="stars">
					{starIcons.map((star, index) => {
						return <span key={index}>{star}</span>;
					})}
					<span>{getRating(item.rating)}</span>
				</div> */}
				<p className="product__price">£{item.price}</p>
			</div>
			<Link
				className="product__btn"
				to={`${PAGE_LINK.SHOP}/${itemId}`}
				state={{ item }}
			>
				More details
			</Link>
		</div>
	);
};

export default Product;
