import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext } from "react";

import { PAGE_LINK } from "../utils/config";
import { capitaliseFirstLetter } from "../utils/utils.js";
import { StoreContext, StoreActions } from "../store";

import "../styles/Header.css";

const Header = () => {
	const store = useContext(StoreContext);

	// format username================================
	const formatUserName = (user) => {
		let username = user.toLowerCase();
		return capitaliseFirstLetter(username);
	};

	// handle click===================================
	const handleClick = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		store.dispatch({ type: StoreActions.UPDATE_ISLOGGEDIN, payload: false });
		store.dispatch({ type: StoreActions.UPDATE_USER, payload: null });
	};

	return (
		<header>
			<nav className="navbar-container">
				<div className="navbar">
					<div className="navbar__logo">
						{/* <Link to={PAGE_LINK.HOME}> */}
							<strong>FurniTrade</strong>
						{/* </Link> */}
					</div>

					<ul className="navbar__lists">
						<li className="navbar__lists--item">
							<Link to={PAGE_LINK.HOME}>Home</Link>
						</li>
						<li className="navbar__lists--item">
							<Link to={PAGE_LINK.SHOP}>Shop</Link>
						</li>
						
						{store.state.isLoggedIn &&  <li className="navbar__lists--item">
							<Link to={PAGE_LINK.ADDPRODUCT}>Add Product</Link>
						</li>}
						{store.state.isLoggedIn && <li className="navbar__lists--item">
							<Link to={PAGE_LINK.USERPRODUCTS}>My Products</Link>
						</li>}
					</ul>

					{!store.state.isLoggedIn && (
						<div className="navbar__icon">
							<Link to={PAGE_LINK.LOGIN}>
								<span className="login-icon">
									<BsFillPersonFill />
								</span>
							</Link>
						</div>
					)}
					{/* If user exist and user is logged in */}
					{store.state.isLoggedIn && store.state.user && (
						<div className="navbar__icon">
							<span className="navbar-name">
								Hi {formatUserName(store.state.user)}
							</span>

							<span onClick={handleClick}>
								<Link to={PAGE_LINK.HOME}>Sign Out</Link>
							</span>

							<Link to={PAGE_LINK.BASKET}>
								{(store.state.basketItems.length > 0 ||
									store.state.numOfItems !== null) && (
									<div className="basket-num">
										{store.state.basketItems.length || store.state.numOfItems}
									</div>
								)}
								<span className="basket">
									<FaShoppingCart />
								</span>
							</Link>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
