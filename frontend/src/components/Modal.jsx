import { Link } from "react-router-dom";

import "../styles/Modal.css";

import { PAGE_LINK } from "../utils/config";

const Modal = ({ onCloseModal }) => {
	return (
		<div className="modal-overlay">
			<div className="modal">
				<button className="close-button" onClick={onCloseModal}>
					X
				</button>
				<h1 className="modal-title">
					Please login before adding items to the basket!
				</h1>
				<div className="modal-btn">
					<Link to={PAGE_LINK.LOGIN}>Returning Customer</Link>
					<Link to={PAGE_LINK.REGISTER}>New Customer</Link>
				</div>
			</div>
		</div>
	);
};

export default Modal;
