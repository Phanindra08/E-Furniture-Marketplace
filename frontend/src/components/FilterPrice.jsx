import { useContext } from "react";

import { StoreContext, StoreActions } from "../store";

import "../styles/Shop.css";

const FilterPrice = () => {
	const store = useContext(StoreContext);

	// handle Filter Price ==================================================
	const handleFilterPrice = (e) => {
		const value = e.target.value;
		store.dispatch({ type: StoreActions.UPDATE_PRICEVALUE, payload: value });
	};

	return (
		<div className="price__list">
			<div className="range-container">
				<input
					type="range"
					id="min-price"
					name="min-price"
					min={0}
					max="8"
					step="10"
				/>
				<input
					className="filter-input"
					type="range"
					id="max-price"
					name="max-price"
					value={store.state.priceValue}
					min="0"
					max={1000}
					step="10"
					onChange={handleFilterPrice}
				/>
			</div>
			<div className="price-text">
				<div className="min-text">
					<span>£</span>
					<input
						type="number"
						defaultValue="0"
						min={0}
						max={1000}
						id="min-num"
					/>
				</div>
				<div className="max-text">
					<span>£</span>
					<input
						type="number"
						value={store.state.priceValue}
						min={0}
						max={1000}
						id="max-num"
						onChange={handleFilterPrice}
					/>
				</div>
			</div>
		</div>
	);
};

export default FilterPrice;
