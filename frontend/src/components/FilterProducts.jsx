import { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";

import "../styles/Shop.css";

// import FilterCollectionMenu from "./FilterCollectionMenu";
// import FilterColorMenu from "./FilterColorMenu";
import FilterCategoryMenu from "./FilterCategoryMenu";
import FilterLocationMenu from "./FilterLocationMenu";
import FilterPrice from "./FilterPrice";

import { StoreContext, StoreActions } from "../store";

const FilterProducts = ({ submitFilterFormHandler, clearAllFilterHandler }) => {
	const store = useContext(StoreContext);
	//const collectionMenuOpen = store.state.collectionMenuOpen;
	//const colorMenuOpen = store.state.colorMenuOpen;
	const categoryMenuOpen = store.state.categoryMenuOpen;
	const locationMenuOpen  = store.state?.locationMenuOpen ?? false;
	;

	return (
		<>
			<div className="clear-container">
				<h2>Filtered by</h2>
				<button className="clear-btn" onClick={clearAllFilterHandler}>
					Clear All
				</button>
			</div>

			<form className="filter__collection" onSubmit={submitFilterFormHandler}>
				

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
				{/* location section */}
				<div
					className={
						locationMenuOpen ? "location__menu removeBorder" : "location__menu"
					}
				>
					<span>Location</span>
					<span
						onClick={() =>
							store.dispatch({
								type: StoreActions.UPDATE_LOCATIONMENU_OPEN,
								payload: !locationMenuOpen,
							})
						}
					>
						<FaChevronDown />
					</span>
				</div>
				{locationMenuOpen && <FilterLocationMenu />}


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
