import { useState, useEffect, useContext } from "react";

import FilterProducts from "../components/FilterProducts";
import Product from "../components/Product";
import SearchShop from "../components/SearchShop";

import { APIEndPoints } from "../utils/config";
import { StoreActions, StoreContext } from "../store";

import "../styles/Shop.css";

const Shop = () => {
	const store = useContext(StoreContext);
	const [products, setProducts] = useState([]);

	// fetch filtered products=================================================
	const fetchFilteredProducts = async () => {
		const data = store.state.filterData;
		const price = store.state.priceValue;

		const colors = data.color.join(",");
		const categories = data.category.join(",");
		const collections = data.collection.join(",");
		let url = `${APIEndPoints.SHOP}?`;

		if (data && price) {
			if (data.color.length >= 1) {
				url += `color=${colors}&`;
			}
			if (data.category.length >= 1) {
				url += `category=${categories}&`;
			}
			if (data.collection.length >= 1) {
				url += `collection=${collections}&`;
			}
			if (price) {
				url += `price=${price}&`;
			}
			// Remove the last "&" character from the URL
			url = url.slice(0, -1);

			const res = await fetch(url);
			const resData = await res.json();
			setProducts(resData.data);
		}
	};

	// submit Filter Form Handler ============================================
	const submitFilterFormHandler = (e) => {
		e.preventDefault();
		fetchFilteredProducts();
	};

	// fetch searched products=================================================
	const fetchSearchedProducts = async () => {
		const searchValue = store.state.searchValue;
		const res = await fetch(`${APIEndPoints.SHOP}/${searchValue}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const resData = await res.json();
		// update UI of shop page
		setProducts(resData.data);
		// reset the search value to empty string
		store.dispatch({ type: StoreActions.UPDATE_SEARCHVALUE, payload: "" });
	};

	// submit Search Handler ================================================
	const submitSearchHandler = (e) => {
		e.preventDefault();
		fetchSearchedProducts();
	};

	// clear All Filters Handler================================================
	const clearAllFilterHandler = async () => {
		store.dispatch({
			type: StoreActions.UPDATE_FILTERDATA,
			payload: { collection: [], category: [], color: [] },
		});
		store.dispatch({ type: StoreActions.UPDATE_PRICEVALUE, payload: 1000 });
		await fetchProducts();
		store.dispatch({
			type: StoreActions.UPDATE_COLLECTIOMENU_OPEN,
			payload: false,
		});
		store.dispatch({
			type: StoreActions.UPDATE_COLORMENU_OPEN,
			payload: false,
		});
		store.dispatch({
			type: StoreActions.UPDATE_CATEGORYMENU_OPEN,
			payload: false,
		});
	};

	// fetch random products=====================================================
	const fetchProducts = async () => {
		try {
			const res = await fetch(`${APIEndPoints.SHOP}/`);
			const products = await res.json();
			setProducts(products.data);
		} catch (error) {
			console.error("error", error);
		}
	};

	// use effect for fetching products and displaying on screen==================
	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="shop-section">
			<SearchShop
				submitSearchHandler={submitSearchHandler}
				setProducts={setProducts}
				products={products}
			/>

			<section className="container">
				<div className="filter-container">
					<FilterProducts
						submitFilterFormHandler={submitFilterFormHandler}
						clearAllFilterHandler={clearAllFilterHandler}
					/>
				</div>

				<div className="product-container">
					{products &&
						products.map((item, index) => {
							return <Product key={index} item={item} />;
						})}
				</div>
			</section>
		</div>
	);
};

export default Shop;
