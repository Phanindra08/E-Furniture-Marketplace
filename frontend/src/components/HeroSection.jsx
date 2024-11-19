import { Link } from "react-router-dom";

import { PAGE_LINK } from "../utils/config";

import "../styles/Home.css";

const HeroSection = () => {
	return (
		<section className="hero-section">
			<div className="hero-section__text">
				<div className="hero-container">
					<h1 className="hero-section__text--title">
						The unique furniture for your special house
					</h1>

					<Link to={PAGE_LINK.SHOP} className="hero-section__text--btn">
						Shop Now
					</Link>
				</div>
			</div>
			<div className="hero-section__img">
				<img src="./assets/images/chair1.jpg" alt="chair" loading="lazy" />
			</div>
		</section>
	);
};

export default HeroSection;
