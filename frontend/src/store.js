import { createContext } from "react";

export const initialState = {
	basketItems: [],
	product: {},
	numOfItems: null,
	searchValue: "",
	priceValue: 1000,
	filterData: {
		collection: [],
		category: [],
		color: [],
	},
	rating: null,
	ratingHover: null,
	reviewInfo: {
		reviewerName: "",
		reviewerEmail: "",
		stars: [],
		feedback: "",
		date: "",
	},
	isLoggedIn: false,
	user: null,
	quantity: 0,
	collectionMenuOpen: false,
	colorMenuOpen: false,
	categoryMenuOpen: false,
};

export const StoreContext = createContext();

export class StoreActions {
	static UPDATE_BASKETITEMS = "updateBaketItems";
	static UPDATE_PRODUCT = "updateProduct";
	static UPDATE_NUMOFITEMS = "updateNumOfItems";
	static UPDATE_SEARCHVALUE = "updateSerachValue";
	static UPDATE_FILTERDATA = "updateFilterData";
	static ISEXISTED_FILTERNAME = "isExistedFilterName";
	static NEW_FILTERNAME = "newFilterName";
	static UPDATE_PRICEVALUE = "updatePriceValue";
	static ADD_RATING = "addRating";
	static ADD_HOVER = "addHover";
	static UPDATE_REVIEWINFO = "updateReviewInfo";
	static UPDATE_ISLOGGEDIN = "isLoggedIn";
	static UPDATE_USER = "updateUser";
	static UPDATE_QUANTITY = "updateQuantity";
	static UPDATE_COLLECTIOMENU_OPEN = "updateCollectionMenuOpen";
	static UPDATE_COLORMENU_OPEN = "updateColorMenuOpen";
	static UPDATE_CATEGORYMENU_OPEN = "updateCategoryMenuOpen";
}

// basket items reducer======================================
export const basketItemsReducer = (basketItems, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_BASKETITEMS:
			return action.payload;
		default:
			return basketItems;
	}
};

// product reducer========================================
export const productReducer = (product, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_PRODUCT:
			return action.payload;

		default:
			return product;
	}
};

// number of items reducer======================================
export const numOfItemsReducer = (numOfItems, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_NUMOFITEMS:
			return action.payload;
		default:
			return numOfItems;
	}
};

// search value reducer====================================
export const searchValueReducer = (searchValue, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_SEARCHVALUE:
			return action.payload;
		default:
			return searchValue;
	}
};

// filter data reducer ===================================
export const filterDataReducer = (filterData, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_FILTERDATA:
			return action.payload;

		case StoreActions.ISEXISTED_FILTERNAME:
			let previousfilterNameArr = [...filterData[action.payload.filterName]];
			const updatedfilterNameArr = previousfilterNameArr.filter(
				(el) => el !== action.payload.name
			);
			return {
				...filterData,
				[action.payload.filterName]: updatedfilterNameArr,
			};

		case StoreActions.NEW_FILTERNAME:
			return {
				...filterData,
				[action.payload.filterName]: [
					...filterData[action.payload.filterName],
					action.payload.name,
				],
			};
		default:
			return filterData;
	}
};

// price value reducer ====================================
export const priceValueReducer = (priceValue, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_PRICEVALUE:
			return action.payload;
		default:
			return priceValue;
	}
};

// is Logged In reducer====================================
export const isLoggedInReducer = (isLoggedIn, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_ISLOGGEDIN:
			return action.payload;
		default:
			return isLoggedIn;
	}
};

// user reducer ====================================
export const userReducer = (user, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_USER:
			return action.payload;
		default:
			return user;
	}
};

// quantity reducer ====================================
export const quantityReducer = (quantity, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_QUANTITY:
			return action.payload;
		default:
			return quantity;
	}
};

// collectionMenuOpen reducer ====================================
export const collectionMenuOpenReducer = (collectionMenuOpen, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_COLLECTIOMENU_OPEN:
			return action.payload;
		default:
			return collectionMenuOpen;
	}
};

// colorMenuOpen reducer ====================================
export const colorMenuOpenReducer = (colorMenuOpen, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_COLORMENU_OPEN:
			return action.payload;
		default:
			return colorMenuOpen;
	}
};

// categoryMenuOpen reducer ====================================
export const categoryMenuOpenReducer = (categoryMenuOpen, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_CATEGORYMENU_OPEN:
			return action.payload;
		default:
			return categoryMenuOpen;
	}
};

// rating reducer==========================================
export const ratingReducer = (rating, action) => {
	switch (action.type) {
		case StoreActions.ADD_RATING:
			return action.payload;
		default:
			return rating;
	}
};

// rating hover reducer==========================================
export const ratingHoverReducer = (ratingHover, action) => {
	switch (action.type) {
		case StoreActions.ADD_HOVER:
			return action.payload;

		default:
			return ratingHover;
	}
};

// rating hover reducer==========================================
export const reviewInfoReducer = (reviewInfo, action) => {
	switch (action.type) {
		case StoreActions.UPDATE_REVIEWINFO:
			return action.payload;
		default:
			return reviewInfo;
	}
};

//  combine reducers======================================
const combineReducers = (reducers) => {
	return (state = {}, action) => {
		const newState = {};
		for (let key in reducers) {
			newState[key] = reducers[key](state[key], action);
		}
		return newState;
	};
};

// export all reducers ===================================
export const rootReducer = combineReducers({
	basketItems: basketItemsReducer,
	product: productReducer,
	numOfItems: numOfItemsReducer,
	searchValue: searchValueReducer,
	filterData: filterDataReducer,
	priceValue: priceValueReducer,
	rating: ratingReducer,
	ratingHover: ratingHoverReducer,
	reviewInfo: reviewInfoReducer,
	isLoggedIn: isLoggedInReducer,
	user: userReducer,
	quantity: quantityReducer,
	collectionMenuOpen: collectionMenuOpenReducer,
	colorMenuOpen: colorMenuOpenReducer,
	categoryMenuOpen: categoryMenuOpenReducer,
});
