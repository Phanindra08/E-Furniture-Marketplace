import { productInfoText, productInfoSize, colorNames } from "../utils/utils";

const ProductInfo = (props) => {
	return (
		<>
			<p className="productInfo-text">{props.description}</p>
			<ul className="productInfo-size">
				{productInfoSize.map((info, index) => {
					return <li key={index}>{info}</li>;
				})}
			</ul>
		</>
	);
};

export default ProductInfo;
