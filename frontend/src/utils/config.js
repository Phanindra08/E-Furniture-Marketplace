export const APIEndPoints = {
	BASKET: "http://localhost:5000/basket/",
	MAKEOFFER: "http://localhost:5000/makeOffer",
	LOGIN: "http://localhost:5000/user/login",
	REGISTER: "http://localhost:5000/user/register",
	SHOP: "http://localhost:5000/products",
	HOME: "http://localhost:5000/featuredItems",
	GETPRODUCT: "http://localhost:5000/products/getProduct",
	ADDPRODUCT: "http://localhost:5000/products/addProduct",
	UPDATEPRODUCT: "http://localhost:5000/products/updateProduct",
	MYPRODUCTS: "http://localhost:5000/products/myProducts",
	DELETEPRODUCT: "http://localhost:5000/products/deleteProduct",
	USERDETAILS: "http://localhost:5000/user/details",
  UPDATEUSERDETAILS: "http://localhost:5000/user/updateProfile",
  MARKASSOLD: "http://localhost:5000/products/markAsSold"
};

export const PAGE_LINK = {
	HOME: "/",
	LOGIN: "/login",
	REGISTER: "/register",
	SHOP: "/shop",
	CONTACT: "/userDetails",
	BASKET: "/basket",
	ADDPRODUCT: "/addProduct",
	UPDATEPRODUCT: "/updateProduct",
	USERPRODUCTS: "/myProducts"
};

export const LOCAL_STORAGE = {
	TOKEN: "token",
	USER_ID: "userId",
};
