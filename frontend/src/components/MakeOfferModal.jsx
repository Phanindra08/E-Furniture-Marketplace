import { useState } from "react";
import "../styles/Modal.css";
import { APIEndPoints } from "../utils/config.js";

const MakeOfferModal = (props) => {
	const {onCloseModal, sellerEmail, userEmail, productTitle } = props;
  const [offerPrice, setOfferPrice] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle submitting the offer
  const handleSubmitOffer = async () => {
    if (offerPrice <= 0 || isNaN(offerPrice)) {
      alert('Please enter a valid offer price.');
      return;
    }

    

    try {
      // Send the offer to the backend API to trigger the email
      const response = await fetch(`${APIEndPoints.MAKEOFFER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          productTitle,
          offerPrice,
          sellerEmail,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setShowSuccessMessage(true);  // Show success message to the user
      } else {
        alert('Failed to send offer');
      }
    } catch (error) {
      console.error('Error sending offer:', error);
      alert('An error occurred while submitting your offer.');
    }
  };

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
        <button onClick={handleSubmitOffer}>Submit Offer</button>

        {showSuccessMessage && <p>Your offer has been sent to the seller!</p>}
      </div>
    </div>
  );
};

export default MakeOfferModal;
