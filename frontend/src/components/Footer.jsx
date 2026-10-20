import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import {API_BASE_URL} from '../apiConfig'

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-container">
      <div className="footer-social-bar">
        <a href="https://facebook.com/itszaidsidd" target="_blank" rel="noopener noreferrer" className="social-link">
          <FaFacebook style={{ marginRight: '6px' }} /> Facebook
        </a>
        <a href="https://twitter.com/itszaidsidd" target="_blank" rel="noopener noreferrer" className="social-link">
          <FaTwitter style={{ marginRight: '6px' }} /> Twitter
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-link">
          <FaWhatsapp style={{ marginRight: '6px' }} /> WhatsApp
        </a>
        <a href="https://instagram.com/itszaidsidd" target="_blank" rel="noopener noreferrer" className="social-link">
          <FaInstagram style={{ marginRight: '6px' }} /> Instagram
        </a>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Knowledge Zone provides universal access to the world's best education partnering with top universities and organizations to offer courses online.
          </p>
        </div>

        <div className="footer-section">
          <h3>Category</h3>
          <ul>
            <li>Web Development</li>
            <li>Web Designing</li>
            <li>Android App Dev</li>
            <li>IOS Development</li>
            <li>Data Analysis</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>K.Z. Institute</p>
          <p>Near Meenakshi Chowk</p>
          <p>Muzaffarnagar, UP</p>
          <p>Ph. 8126648616</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright &copy; 2025 || Designed By Zaid Siddiqui || <span onClick={() => { navigate('/admin'); }} className="admin-login-link">Admin Login</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;