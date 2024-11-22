import { useState } from "react";
import "../styles/Modal.css";
import Snackbar from '@mui/material/Snackbar';
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
        setShowSuccessMessage(true);
        onCloseModal();
      } else {
        alert('Failed to send offer');
      }
    } catch (error) {
      console.error('Error sending offer:', error);
      alert('An error occurred while submitting your offer.');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return; // Prevent close when clicking outside
    setShowSuccessMessage(false); // Close the Snackbar
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

        {showSuccessMessage && 
          <Snackbar
            open={showSuccessMessage}
            autoHideDuration={3000} // Auto-close after 3 seconds
            // onClose={}
            onClose={handleSnackbarClose}
            message="Your offer has been sent to the seller!"
            ContentProps={{
              style: {
                position: 'fixed',
                top: '50%', // Center vertically
                left: '50%', // Center horizontally
                transform: 'translate(-50%, -50%)', // Adjust for alignment
              },
            }}
          />
        }
      </div>
    </div>
  );
};

export default MakeOfferModal;
