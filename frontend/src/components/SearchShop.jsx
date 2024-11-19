import { useState, useContext } from "react";
import { FaAngleDown } from "react-icons/fa";

import "../styles/Shop.css";

import SortProducts from "./SortProducts";

import { StoreContext, StoreActions } from "../store";

const SearchShop = ({ submitSearchHandler, setProducts, products }) => {
	const store = useContext(StoreContext);
	const searchValue = store.state.searchValue;

	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

	// search Filter Handler===================================================
	const searchFilterHandler = (e) => {
		const value = e.target.value;
		const capitalize = value.charAt(0).toUpperCase();
		const inputValue = capitalize + value.slice(1);
		store.dispatch({
			type: StoreActions.UPDATE_SEARCHVALUE,
			payload: inputValue,
		});
	};

	return (
		<section className="search-container">
			<div className="search">
				<form className="search__form" onSubmit={submitSearchHandler}>
					<input
						className="search__input"
						type="text"
						placeholder="Search by a Category / Title..."
						value={searchValue}
						onChange={searchFilterHandler}
					/>
				</form>

				<div className="search__sort">
					<button className="search__sort--btn">
						<div className="sort-btn-container">
							<span>Sort By</span>
							<span
								className="dropdown-icon"
								onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
							>
								<FaAngleDown />
							</span>
						</div>
						{isSortMenuOpen && (
							<SortProducts setProducts={setProducts} products={products} />
						)}
					</button>
				</div>
			</div>
		</section>
	);
};

export default SearchShop;
