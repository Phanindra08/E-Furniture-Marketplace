import { useState, useEffect } from "react";

import FeatureSection from "../components/FeatureSection";
import HeroSection from "../components/HeroSection";

import "../styles/Home.css";

import { APIEndPoints } from "../utils/config";

const Home = () => {
	const [featuredItems, setFeaturedItems] = useState([]);

	// use effect for fetching featured item from server====================
	useEffect(() => {
		try {
			const fetchFeaturedItems = async () => {
				const res = await fetch(APIEndPoints.HOME);
				const featuredData = await res.json();
				setFeaturedItems(featuredData.data);
			};
			fetchFeaturedItems();
		} catch (error) {
			console.log("could not fetch featured items from the server!");
		}
	}, []);

	return (
		<div className="home-section">
			<HeroSection />
			<FeatureSection featuredItems={featuredItems} />
		</div>
	);
};

export default Home;
