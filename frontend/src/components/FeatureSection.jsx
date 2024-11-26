import "../styles/Home.css";

import FeaturedItem from "./FeaturedItem";
import Product from "./Product";

const FeatureSection = ({ featuredItems }) => {
    return (
        <section className="features-section">
            <h2>Recently featured furniture</h2>
            <div className="features-container">
                {featuredItems?.map((item, index) => {
                    return <Product key={index} item={item} />;
                })}
            </div>
        </section>
    );
};

export default FeatureSection;


