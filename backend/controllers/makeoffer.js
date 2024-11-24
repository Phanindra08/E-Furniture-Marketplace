import nodemailer from "nodemailer";
import "dotenv/config";

// Configure Nodemailer transporter (use environment variables for sensitive information)
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS  
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

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
          user: process.env.EMAIL_USER, 
          pass:  process.env.EMAIL_PASS, 
        },
      });
      

    // Email content
    const mailOptions = {
        from: `"Furni Trade" <${process.env.EMAIL_USER}>`,
        to: "furnituremarketplace123@gmail.com",
        // to: sellerEmail,
        subject: `Exciting Offer Received for Your Product ${productTitle} !`,
        text: `

            Hello,

            We’re thrilled to inform you that a potential buyer has expressed interest in your product and has made an offer. Here are the details:

            Product Name: ${productTitle}
            Offered Price: ${offerPrice}
            Buyer's Contact: ${userEmail}

            The buyer is eager to connect with you to finalize the deal. Please review the offer and respond at your earliest convenience to discuss the next steps.

            If you have any questions or need assistance, feel free to reach out to our support team. We’re here to ensure a seamless transaction experience for you.

            Thank you for being a valued member of our marketplace!

            Warm regards,
            Your Marketplace Team
        `,
    };

    // // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).json({ success: true, message: 'Offer email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
}