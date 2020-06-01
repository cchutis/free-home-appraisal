import React from 'react';
import LeftWidget from '../components/LeftWidget';
import CenterWidget from '../components/CenterWidget';
import RightWidget from '../components/RightWidget';

export default function FooterContainer() {
    return (
      <div>
        <div className="footer">
          <LeftWidget />
          <CenterWidget />
          {/* <RightWidget /> */}
        </div>
        <div className="footer-bar">
          <div>
        <img
            className="logo-bottom"
            src="img/fha-logo-temp.png"
            alt="FHA Logo"
            style={{ width: 200 }}
          />
          {/* <p style={{ color: "white", fontSize: 12 }}>
            ©2020 FreeHomeAppraisal.com - All Rights Reserved.
          </p> */}
          </div>
          <div className="footer-nav">
            <p>HOME</p>
            <p>ABOUT</p>
            <p>ESTIMATES</p>
            <p>SELL YOUR HOME</p>
            <p>CONTACT</p>
          </div>
        </div>
      </div>
    );
}
