import React from "react";

import "./Footer.css";

import { LocationOn, Email, LocalPhone } from "@mui/icons-material";

function Footer() {
  return (
    <div className="Footer grid grid-cols-4">
      <div className="footer-col col-span-2">
        <div>
          <h4>BIKERSHOP</h4>
        </div>
        <p>
          Outstock is a premium Templates theme with advanced admin module. It’s
          extremely customizable, easy to use and fully responsive and retina
          ready.
        </p>
        <div>
          <ul>
            <li>
              <LocationOn /> Add: 1234 Heaven Stress, Beverly Hill, Melbourne,
              USA.
            </li>
            <li>
              <Email /> Email: Contact@basictheme.com
            </li>
            <li>
              <LocalPhone /> Phone Number: (800) 123 456 789
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-col">
        <h5>Information</h5>
        <ul>
          <li>About Us</li>
          <li>Careers</li>
          <li>Delivery Inforamtion</li>
          <li>Privacy Policy</li>
          <li>Terms & Condition</li>
        </ul>
      </div>

      <div className="footer-col">
        <h5>Customer Service</h5>
        <ul>
          <li>Shipping Policy</li>
          <li>Help & Contact Us</li>
          <li>Returns & Refunds</li>
          <li>Online Stores</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
