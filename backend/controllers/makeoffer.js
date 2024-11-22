import nodemailer from "nodemailer";
import "dotenv/config";
// Configure Nodemailer transporter (use environment variables for sensitive information)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service provider
    auth: {
        user: process.env.EMAIL_USER,  // your email address
        pass: process.env.EMAIL_PASS   // your email password (use environment variables for security)
    }
});

// Controller function to handle the make offer request
export const makeOffer = async (req, res) => {
    const { userEmail, productTitle, offerPrice, sellerEmail } = req.body;

    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

  // Validate input
  if (!userEmail || !productTitle || !offerPrice || !sellerEmail) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    console.log("try method")
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env file
        pass: process.env.EMAIL_PASSWORD, // Your email password from .env file
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: `New Offer for ${productTitle}`,
      text: `
        Hello,

        A new offer has been made for your product:

        Product: ${productTitle}
        Offered Price: ${offerPrice}
        Buyer Email: ${userEmail}

        Please respond to the buyer to finalize the deal.

        Best regards,
        Your Marketplace Team
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).json({ success: true, message: 'Offer email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
}