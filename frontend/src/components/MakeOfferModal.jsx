import { useState } from "react";
import "../styles/Modal.css";
import Snackbar from '@mui/material/Snackbar';
import { APIEndPoints } from "../utils/config.js";

const MakeOfferModal = (props) => {
	const {onCloseModal, handleSubmitOffer } = props;
  const [offerPrice, setOfferPrice] = useState('');

  return (
    <div className="modal-overlay">
			<div className="modal">
				<button className="close-button" onClick={onCloseModal}>
					X
				</button>
        <input
          type="number"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          placeholder="Enter your offer price"
        />
        <button onClick={() => handleSubmitOffer(offerPrice)}>Submit Offer</button>

      </div>
    </div>
  );
};

export default MakeOfferModal;
