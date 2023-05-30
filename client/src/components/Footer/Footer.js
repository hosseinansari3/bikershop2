import React from "react";

import "./Footer.css";

import { LocationOn, Email, LocalPhone } from "@mui/icons-material";

function Footer() {
  return (
    <div className="Footer p-5">
      <div>
        <h4>BIKERSHOP</h4>
      </div>
      <div className=" grid grid-cols-4">
        <div className="p-5 col-span-4 md:col-span-2">
          <p>
            Outstock is a premium Templates theme with advanced admin module.
            It’s extremely customizable, easy to use and fully responsive and
            retina ready.
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

        <div className="p-5 col-span-2 md:col-span-1 ">
          <h5>Information</h5>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Delivery Inforamtion</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </ul>
        </div>

        <div className="p-5 col-span-2 md:col-span-1">
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
    </div>
  );
}

export default Footer;
