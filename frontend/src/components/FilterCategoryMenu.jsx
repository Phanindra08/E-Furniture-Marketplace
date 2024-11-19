import { useContext } from "react";

import "../styles/Shop.css";

import { categoryNames } from "../utils/utils";
import { StoreContext, StoreActions } from "../store";

const FilterCategoryMenu = () => {
	const store = useContext(StoreContext);

	// handle filter changes================================================
	const handleFilterChange = (e, filterName) => {
		const data = store.state.filterData;
		const name = e.target.name;

		if (data[filterName].includes(name)) {
			store.dispatch({
				type: StoreActions.ISEXISTED_FILTERNAME,
				payload: { name, filterName },
			});
		} else {
			store.dispatch({
				type: StoreActions.NEW_FILTERNAME,
				payload: { name, filterName },
			});
		}
	};

	// check Checkbox Handler ===============================
	const checkCheckboxHandler = (categoryName) => {
		return store.state.filterData.category.includes(categoryName)
			? true
			: false;
	};

	return (
		<div className="category__list">
			{categoryNames.map((categoryName, index) => {
				return (
					<div key={index}>
						<input
							className="filter-input"
							type="checkbox"
							id={categoryName}
							name={categoryName}
							onChange={(e) => handleFilterChange(e, "category")}
							checked={checkCheckboxHandler(categoryName)}
						/>
						<label htmlFor={categoryName}>{categoryName}</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterCategoryMenu;
