
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { PAGE_LINK } from "../utils/config";

import "../styles/Footer.css";

const Footer = () => {
	return (
		<footer className="footer-container">
			<div className="footer">
				<div className="footer__logo">
					<strong>FurniTrade</strong>
				</div>

				<ul className="footer__lists">
					<li className="footer__lists--item">
						<Link to={PAGE_LINK.HOME} className="disabled-link">
							Information
						</Link>
					</li>
					<li className="footer__lists--item">
						<Link to={PAGE_LINK.HOME} className="disabled-link">
							Customer service
						</Link>
					</li>
					<li className="footer__lists--item">
						<Link to={PAGE_LINK.CONTACT}>Contact</Link>
					</li>
				</ul>

				<div className="footer__icon">
					<p>
						<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
							<FaFacebook />
						</a>
					</p>
					<p>
						<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
							<FaInstagram />
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
