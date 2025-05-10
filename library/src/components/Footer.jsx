import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-section">
          <h2>About Library</h2>
          <p>
            Our library management system provides access to thousands of books,
            journals, and digital resources for students and faculty.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#!">Browse Catalog</a></li>
            <li><a href="#!">My Account</a></li>
            <li><a href="#!">Contact Us</a></li>
            <li><a href="#!">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h2>Contact</h2>
          <p>123 Library St, Knowledge City</p>
          <p>Email: info@library.edu</p>
          <p>Phone: +1 234 567 890</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Library Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;