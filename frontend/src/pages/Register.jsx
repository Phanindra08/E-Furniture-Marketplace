import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import { PAGE_LINK, APIEndPoints } from "../utils/config.js";

import "../styles/Register.css";

const Register = () => {
	const [submit, setSubmit] = useState(false);
	const [registerError, setRegisterError] = useState("");
	const [emptyInfoErr, setEmptyInfoErr] = useState("");
	const [userInfo, setUserInfo] = useState({
		username: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	// register user info to DB=======================================
	useEffect(() => {
		const postUserInfoToDB = async () => {
			try {
				const userRes = await fetch(`${APIEndPoints.REGISTER}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(userInfo),
				});
				let userData;

				if (userRes.ok) {
					userData = await userRes.json();
					localStorage.setItem("token", userData.token);

					if (userData.data) {
						localStorage.setItem("userId", userData.data.id.toString());
						navigate(PAGE_LINK.LOGIN, { replace: true });
					}
				}
				if (userRes.status === 400) {
					userData = await userRes.json();
					setRegisterError(userData.email);
					setSubmit(false);
				}
			} catch (err) {
				console.log("An error occurred while registering in user: ", err);
			}
		};

		if (submit) {
			postUserInfoToDB();
		}
	}, [submit, navigate, userInfo]);

	// check user form validation
	const checkUserFormValidation = () => {
		const username = userInfo.username;
		const email = userInfo.email;
		const password = userInfo.password;
		if (username === "" || email === "" || password === "") {
			setEmptyInfoErr("Please complete the form before submitting.");
		} else {
			setSubmit(true);
		}
	};

	// submit register form handler
	const submitRegisterFormHandler = (e) => {
		e.preventDefault();
		checkUserFormValidation();
	};

	// change register form handler
	const changeHandler = (e) => {
		setEmptyInfoErr("");
		setRegisterError("");
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	return (
		<div className="register-section">
			<div className="register-images">
				<img src="./assets/images/register-img.png" alt="register-img" />
			</div>
			<div className="register-page">
				<h1>
					Create an account and take advantage of faster checkouts and other
					great benefits.
				</h1>
				<form className="register-form" onSubmit={submitRegisterFormHandler}>
					<div className="input-groups">
						<label htmlFor="username">
							<FaUser />
						</label>
						<input
							type="text"
							placeholder="Username"
							id="username"
							name="username"
							data-lpignore="true"
							value={userInfo.username}
							onChange={changeHandler}
						/>
					</div>
					<div className="input-groups">
						<label htmlFor="email">
							<MdEmail />
						</label>
						<input
							type="text"
							placeholder="Email"
							id="email"
							name="email"
							data-lpignore="true"
							className={registerError.length > 0 ? "red-border" : ""}
							value={userInfo.email}
							onChange={changeHandler}
						/>
					</div>
					{registerError.length > 0 && (
						<span className="register-error">{registerError}</span>
					)}
					<div className="input-groups">
						<label htmlFor="password">
							<RiLockPasswordFill />
						</label>
						<input
							type="password"
							placeholder="Password"
							name="password"
							id="password"
							data-lpignore="true"
							value={userInfo.password}
							onChange={changeHandler}
						/>
					</div>
					<div className="checkbox-group">
						<input type="checkbox" name="terms" required data-lpignore="true" />
						<span className="terms">
							I agree to the terms and privacy policy.
						</span>
					</div>
					<button type="submit" className="register-button">
						REGISTER
					</button>
					{emptyInfoErr.length > 0 && (
						<span className="red-text">{emptyInfoErr}</span>
					)}
					<div className="login-container">
						<p className="signin-text">Already have an account?</p>
						<Link to={PAGE_LINK.LOGIN} className="signin-btn">
							SIGN IN
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
