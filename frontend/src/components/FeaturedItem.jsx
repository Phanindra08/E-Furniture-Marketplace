import { Link } from "react-router-dom";

import "../styles/Home.css";

import { getRating, starIcons } from "../utils/utils";
import { PAGE_LINK } from "../utils/config";

const FeaturedItem = ({ item }) => {
	return (
		<div className="features-item">
			<img src={item.img} alt={item.category} loading="lazy" />
			<div className="sub-img">
				<p className="sub-img__title">{item.title}</p>
				<div className="sub-img__star">
					<div className="stars">
						{starIcons.map((star, index) => {
							return <span key={index}>{star}</span>;
						})}
						<span>{getRating(item.rating)}</span>
					</div>
					<p>£{item.price}</p>
				</div>
				<Link to={`${PAGE_LINK.SHOP}/${item._id}`} state={{ item }}>
					<button className="sub-img__btn">more details</button>
				</Link>
			</div>
		</div>
	);
};

export default FeaturedItem;
