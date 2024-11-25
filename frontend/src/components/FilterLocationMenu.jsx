import { useContext } from "react";

import "../styles/Shop.css";

import { locationNames } from "../utils/utils";
import { StoreContext, StoreActions } from "../store";

const FilterLocationMenu = () => {
	const store = useContext(StoreContext);

	// handle filter changes ====================================================
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

	// check Checkbox Handler ==============================
	const checkCheckboxHandler = (locationName) => {
		return store.state.filterData.location.includes(locationName)
			? true
			: false;
	};

	return (
		<div className="location__list">
			{locationNames.map((locationName, index) => {
				return (
					<div key={index}>
						<input
							className="filter-input"
							type="checkbox"
							id={locationName}
							name={locationName}
							onChange={(e) => handleFilterChange(e, "location")}
							checked={checkCheckboxHandler(locationName)}
						/>
						<label htmlFor={locationName}>{locationName}</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterLocationMenu;
