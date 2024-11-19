import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import "../styles/Login.css";

import { PAGE_LINK, APIEndPoints } from "../utils/config";
import { StoreContext, StoreActions } from "../store";

const Login = () => {
	const store = useContext(StoreContext);
	const [submit, setSubmit] = useState(false);
	const [loginError, setLoginError] = useState("");
	const [userLogin, setUserLogin] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	// post user info to DB================================
	useEffect(() => {
		const postUserLoginToDB = async () => {
			try {
				const userRes = await fetch(`${APIEndPoints.LOGIN}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(userLogin),
				});
				let userData;

				if (userRes.ok) {
					userData = await userRes.json();
					localStorage.setItem("token", userData.token);

					if (userData.data) {
						localStorage.setItem("userId", userData.data.id.toString());
						store.dispatch({
							type: StoreActions.UPDATE_USER,
							payload: userData.data.username,
						});
						navigate(PAGE_LINK.HOME, { replace: true });
					}
				}

				if (userRes.status === 500 || userRes.status === 401 || userRes.status === 404) {
					userData = await userRes.json();
					setLoginError(userData.error);
					setSubmit(false);
				}
			} catch (err) {
				console.log("An error occurred while logging in user: ", err);
			}
		};

		if (submit) {
			postUserLoginToDB();
			store.dispatch({ type: StoreActions.UPDATE_ISLOGGEDIN, payload: true });
		}

		// eslint-disable-next-line
	}, [navigate, userLogin, submit]);

	// submit login form handler =========================
	const submitLoginFormHandler = (e) => {
		e.preventDefault();
		setSubmit(true);
	};

	// change login form =================================
	const changeHandler = (e) => {
		setLoginError("");
		const { name, value } = e.target;
		setUserLogin({ ...userLogin, [name]: value });
	};

	return (
		<div className="login-section">
			<p>
				Please sign in to <strong>your FurniTrade</strong> account.
			</p>
			<form className="login-form" onSubmit={submitLoginFormHandler}>
				<div className="email-group">
					<label htmlFor="email">Enter your email address</label>
					<input
						type="email"
						id="email"
						name="email"
						value={userLogin.email}
						onChange={changeHandler}
						className={loginError.length > 0 ? "red-border" : "email-input"}
					/>
				</div>
				<div className="password-group">
					<label htmlFor="password">Enter your password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={userLogin.password}
						onChange={changeHandler}
						className={loginError.length > 0 ? "red-border" : "password-input"}
					/>
				</div>
				{loginError.length > 0 && (
					<span className="login-error">{loginError}</span>
				)}
				<button type="submit" className="login-btn">
					SIGN IN
				</button>
				<span style={{ display: "block" }}>Or</span>
				<Link to={PAGE_LINK.REGISTER} className="register-btn">
					CREATE AN ACCOUNT
				</Link>
			</form>
		</div>
	);
};

export default Login;
