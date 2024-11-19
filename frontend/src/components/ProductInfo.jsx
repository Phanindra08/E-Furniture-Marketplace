import { productInfoText, productInfoSize, colorNames } from "../utils/utils";

const ProductInfo = () => {
	return (
		<>
			<p className="productInfo-text">{productInfoText}</p>
			<ul className="productInfo-size">
				{productInfoSize.map((info, index) => {
					return <li key={index}>{info}</li>;
				})}
			</ul>
			<div className="productInfo-colors">
				{colorNames.map((color, index) => {
					return <span className={`circle ${color}`} key={index}></span>;
				})}
			</div>
		</>
	);
};

export default ProductInfo;
