import { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";

import "../styles/Shop.css";

import FilterCollectionMenu from "./FilterCollectionMenu";
import FilterColorMenu from "./FilterColorMenu";
import FilterCategoryMenu from "./FilterCategoryMenu";
import FilterPrice from "./FilterPrice";

import { StoreContext, StoreActions } from "../store";

const FilterProducts = ({ submitFilterFormHandler, clearAllFilterHandler }) => {
	const store = useContext(StoreContext);
	const collectionMenuOpen = store.state.collectionMenuOpen;
	const colorMenuOpen = store.state.colorMenuOpen;
	const categoryMenuOpen = store.state.categoryMenuOpen;

	return (
		<>
			<div className="clear-container">
				<h2>Filtered by</h2>
				<button className="clear-btn" onClick={clearAllFilterHandler}>
					Clear All
				</button>
			</div>

			<form className="filter__collection" onSubmit={submitFilterFormHandler}>
				{/* collection section */}
				<div
					className={
						collectionMenuOpen
							? "collection__menu removeBorder"
							: "collection__menu"
					}
				>
					<span>Collection</span>
					<span
						onClick={() =>
							store.dispatch({
								type: StoreActions.UPDATE_COLLECTIOMENU_OPEN,
								payload: !collectionMenuOpen,
							})
						}
					>
						<FaChevronDown />
					</span>
				</div>
				{collectionMenuOpen && <FilterCollectionMenu />}

				{/* color section */}
				<div
					className={colorMenuOpen ? "color__menu removeBorder" : "color__menu"}
				>
					<span>Color</span>
					<span
						onClick={() =>
							store.dispatch({
								type: StoreActions.UPDATE_COLORMENU_OPEN,
								payload: !colorMenuOpen,
							})
						}
					>
						<FaChevronDown />
					</span>
				</div>
				{colorMenuOpen && <FilterColorMenu />}

				{/* category section */}
				<div
					className={
						categoryMenuOpen ? "category__menu removeBorder" : "category__menu"
					}
				>
					<span>Category</span>
					<span
						onClick={() =>
							store.dispatch({
								type: StoreActions.UPDATE_CATEGORYMENU_OPEN,
								payload: !categoryMenuOpen,
							})
						}
					>
						<FaChevronDown />
					</span>
				</div>
				{categoryMenuOpen && <FilterCategoryMenu />}

				{/* price section */}
				<div className="price__menu">
					<span className="price-name">Price Range</span>
				</div>
				<FilterPrice />

				<button type="submit" className="search-btn">
					Search
				</button>
			</form>
		</>
	);
};

export default FilterProducts;
