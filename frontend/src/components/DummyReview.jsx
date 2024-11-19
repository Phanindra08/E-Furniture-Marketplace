import { AiOutlineLike } from "react-icons/ai";
import { useContext } from "react";

import { StoreContext } from "../store";
import { dummyReview } from "../utils/utils";

import Review from "./Review";

import "../styles/ProductInfos.css";

const DummyReview = ({ isSubmitReviewForm }) => {
	const store = useContext(StoreContext);
	const product = store.state.product;

	return (
		<div className="review-section">
			{dummyReview.map((review, index) => {
				return (
					<div className="review" key={index}>
						<div className="review-header">
							<p className="review-header-name">{review.name}</p>
							<p className="review-header-star">
								{review.star.map((star, index) => (
									<span key={index}>{star}</span>
								))}
							</p>
							<p className="review-header-date">{review.date}</p>
						</div>
						<div className="review-body">
							<img
								src={product.img}
								alt="furniture"
								className="review-body-img"
							/>
							<p className="review-body-text">{review.feedback}</p>
							<button className="review-body-btn">
								<span>
									<AiOutlineLike className="likeStyle" />
								</span>
								helpful
							</button>
						</div>
					</div>
				);
			})}

			{isSubmitReviewForm && <Review />}
		</div>
	);
};

export default DummyReview;
