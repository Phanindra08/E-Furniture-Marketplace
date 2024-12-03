import { Route, Routes } from "react-router";
import { useReducer, useMemo } from "react";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AddProduct from "./pages/AddProduct"
import UserProducts from "./pages/UserProducts";
import ProductInfos from "./pages/ProductInfos";
import Basket from "./pages/Basket";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { PAGE_LINK } from "./utils/config";
import { initialState, StoreContext, rootReducer } from "./store";

const App = () => {
	const [state, dispatch] = useReducer(rootReducer, initialState);

	const store = useMemo(() => {
		return { state: state, dispatch: dispatch };
	}, [state, dispatch]);

	return (
		<StoreContext.Provider value={store}>
			<Header />
			<main>
				<Routes>
					<Route path={PAGE_LINK.HOME} element={<Home />} />
					<Route path={PAGE_LINK.ADDPRODUCT} element={<AddProduct mode="add" />} />
					<Route path={`${PAGE_LINK.UPDATEPRODUCT}/:id`} element={<AddProduct mode="edit" />} />
					<Route path={PAGE_LINK.SHOP} element={<Shop />} />
					<Route path={PAGE_LINK.LOGIN} element={<Login />} />
					<Route path={PAGE_LINK.REGISTER} element={<Register />} />
					<Route path={`${PAGE_LINK.SHOP}/:id`} element={<ProductInfos />} />
					<Route path={PAGE_LINK.USERPRODUCTS} element={<UserProducts />} />
					{/* <Route path={`${PAGE_LINK.USERPRODUCTS}/:id`} element={<ProductInfos nav={"MYPRODUCTS"} />} /> */}
					<Route path={PAGE_LINK.BASKET} element={<Basket />} />
					<Route path={`${PAGE_LINK.USERDETAILS}`} element={<UserProfile />} />

				</Routes>
			</main>
			<Footer />
		</StoreContext.Provider>
	);
};

export default App;
