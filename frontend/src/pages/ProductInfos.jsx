import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "../styles/ProductInfos.css";

import ProductDetails from "../components/ProductDetails";

import { StoreActions, StoreContext } from "../store";

const ProductInfos = () => {
	const store = useContext(StoreContext);

	const location = useLocation();

	// use effect for accessing data from location=======================
	useEffect(() => {
		if (location.state) {
			const { item } = location.state;
			store.dispatch({ type: StoreActions.UPDATE_PRODUCT, payload: item });
		}
		// eslint-disable-next-line
	}, [location]);


	return (
		<div className="product-info-section">
			<ProductDetails />
		</div>
	);
};

export default ProductInfos;
