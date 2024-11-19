import "../styles/Home.css";

import FeaturedItem from "./FeaturedItem";

const FeatureSection = ({ featuredItems }) => {
	return (
		<section className="features-section">
			<h2>Best selling furniture</h2>
			<div className="features-container">
				{featuredItems?.map((item, index) => {
					return <FeaturedItem key={index} item={item} />;
				})}
			</div>
		</section>
	);
};

export default FeatureSection;
