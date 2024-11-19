import { useContext } from "react";

import "../styles/Shop.css";

import { StoreContext, StoreActions } from "../store";
import { colorNames } from "../utils/utils";

const FilterColorMenu = () => {
	const store = useContext(StoreContext);

	// check Checkbox Handler ===============================
	const checkCheckboxHandler = (colorName) => {
		return store.state.filterData.color.includes(colorName) ? true : false;
	};

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

	return (
		<div className="color__list">
			{colorNames.map((colorName, index) => {
				return (
					<div key={index}>
						<input
							className="filter-input"
							type="checkbox"
							id={colorName}
							name={colorName}
							onChange={(e) => handleFilterChange(e, "color")}
							checked={checkCheckboxHandler(colorName)}
						/>
						<label htmlFor={colorName}>{colorName}</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterColorMenu;
