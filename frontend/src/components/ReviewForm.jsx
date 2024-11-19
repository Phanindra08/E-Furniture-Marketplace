import { FaUser, FaPen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useContext } from "react";

import StarRating from "./StarRating";

import { starMaking } from "../utils/utils";
import { StoreActions, StoreContext } from "../store";

const ReviewForm = ({ setIsSubmitReviewForm }) => {
	const store = useContext(StoreContext);
	const reviewInfo = store.state.reviewInfo;

	// reviewer change handler =================================
	const changeHandler = (e) => {
		const { name, value } = e.target;

		store.dispatch({
			type: StoreActions.UPDATE_REVIEWINFO,
			payload: { ...reviewInfo, [name]: value },
		});
	};

	// submit review ==========================================
	const submitReviewFormHandler = (e) => {
		e.preventDefault();
		let today = new Date().toLocaleDateString();
		const rating = store.state.rating;

		if (today && rating) {
			const starArr = starMaking(rating);

			store.dispatch({
				type: StoreActions.UPDATE_REVIEWINFO,
				payload: { ...reviewInfo, date: today, stars: starArr },
			});
		}

		setIsSubmitReviewForm(true);
	};

	return (
		<form className="review-form" onSubmit={submitReviewFormHandler}>
			<div className="review-container">
				<p className="review-title">Your personal info.</p>
				<div className="user-name">
					<span>
						<FaUser />
					</span>
					<input
						type="text"
						className="user-input"
						placeholder="Enter your name"
						name="reviewerName"
						value={reviewInfo.reviewerName}
						onChange={changeHandler}
					/>
				</div>
				<div className="user-email">
					<span>
						<MdEmail />
					</span>
					<input
						type="email"
						className="user-input"
						name="reviewerEmail"
						placeholder="Enter your email"
						value={reviewInfo.reviewerEmail}
						onChange={changeHandler}
					/>
				</div>
				<div className="rating">
					<p>Rate our overall services.</p>
					<StarRating />
				</div>

				<div className="feedback">
					<p className="feedback-text">Write your feedback.</p>
					<div className="user-text-review">
						<span>
							<FaPen />
						</span>
						<textarea
							name="feedback"
							value={reviewInfo.feedback}
							onChange={changeHandler}
						></textarea>
					</div>
				</div>

				<button type="submit" className="review-btn">
					Submit
				</button>
			</div>
		</form>
	);
};

export default ReviewForm;
