import { FaStar } from "react-icons/fa";
import { useContext } from "react";

import { StoreActions, StoreContext } from "../store";

import "../styles/ProductInfos.css";

const StarRating = () => {
	const store = useContext(StoreContext);
	const hover = store.state.hover;
	const rating = store.state.rating;

	return (
		<div className="stars review-stars">
			{/* create an array with 5 places */}
			{[...Array(5)].map((star, index) => {
				const ratingValue = index + 1;
				return (
					<label key={index}>
						<input
							className="radio-stars"
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={() =>
								store.dispatch({
									type: StoreActions.ADD_RATING,
									payload: ratingValue,
								})
							}
						/>
						<FaStar
							className="star-icons"
							color={ratingValue <= (hover || rating) ? "#FF9529" : "#bbb6b2"}
							onMouseEnter={() =>
								store.dispatch({
									type: StoreActions.ADD_HOVER,
									payload: ratingValue,
								})
							}
							onMouseLeave={() =>
								store.dispatch({ type: StoreActions.ADD_HOVER, payload: null })
							}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRating;
