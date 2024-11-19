import { useContext } from "react";

import "../styles/Shop.css";

import { collectionNames } from "../utils/utils";
import { StoreContext, StoreActions } from "../store";

const FilterCollectionMenu = () => {
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

	// check Checkbox Handler ================================
	const checkCheckboxHandler = (collectionName) => {
		return store.state.filterData.collection.includes(collectionName)
			? true
			: false;
	};

	return (
		<div className="collection__list">
			{collectionNames.map((collectionName, index) => {
				return (
					<div key={index}>
						<input
							className="filter-input"
							type="checkbox"
							id={collectionName}
							name={collectionName}
							onChange={(e) => handleFilterChange(e, "collection")}
							checked={checkCheckboxHandler(collectionName)}
						/>
						<label htmlFor={collectionName}>{collectionName}</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterCollectionMenu;
