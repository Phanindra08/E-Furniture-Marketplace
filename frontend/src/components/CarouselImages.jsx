import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import "../styles/ProductInfos.css";

const CarouselImages = () => {
	return (
		<div className="small-images">
			<span className="arrow-left">
				<FaChevronLeft className="carouselStyle" />
			</span>
			<img src="../assets/images/sofa2.jpg" alt="sofa" />
			<img src="../assets/images/table3.jpg" alt="table" />
			<img src="../assets/images/sofa1.jpg" alt="sofa" />
			<img src="../assets/images/table5.jpg" alt="table" />
			<span className="arrow-right">
				<FaChevronRight className="carouselStyle" />
			</span>
		</div>
	);
};

export default CarouselImages;
