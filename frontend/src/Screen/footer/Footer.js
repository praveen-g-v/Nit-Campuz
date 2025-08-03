import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-primary text-white pt-4 pb-2">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3">About NIT Campuz</h5>
            <p className="small">
              NIT Campuz is a premier educational platform providing
              comprehensive academic management solutions for students, faculty,
              and administration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/home" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaEnvelope className="me-2" />
                <a
                  href="mailto:info@nitcampuz.edu"
                  className="text-white text-decoration-none"
                >
                  info@nitcampuz.edu
                </a>
              </li>
              <li className="mb-2">123 Education Street, Campus City</li>
              <li className="mb-2">Phone: +1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-3">Connect With Us</h5>
            <div className="d-flex justify-content-start">
              <a
                href="https://facebook.com"
                className="text-white me-3"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-white me-3"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-white me-3"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 pt-3 border-top border-light">
          <p className="mb-0 small">
            &copy; {currentYear} NIT Campuz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
