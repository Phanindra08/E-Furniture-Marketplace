import { Link } from "react-router-dom";

import "../styles/Shop.css";

import { getRating, starIcons } from "../utils/utils";
import { PAGE_LINK } from "../utils/config";

const Product = ({ item }) => {
  const itemId = item._id;

  // Use the img field directly, as the backend sends a Base64 string
  const imageSrc = item.img || "/path/to/default/image.png"; // Provide a default image if img is null

  return (
    <div className="product">
      {/* Render the image using Base64 encoding */}
      <img className="product__img" src={imageSrc} alt={item.title} />
      <p className="product__name">{item.title}</p>
      <div className="product__stars">
        {/* Uncomment and use this when you want to include star ratings */}
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
