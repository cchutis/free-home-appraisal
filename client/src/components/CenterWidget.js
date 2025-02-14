import React from 'react';
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
// import MailchimpSubscribe from "react-mailchimp-subscribe";

const CenterWidget = () => {
    return (
        <div className="widget newsletter-widget">
        <h2>Stay Connected</h2>
        <p style={{textAlign: 'left'}}>Stay connected by subscribing to our monthly newsletter with news, updates and more!</p>
        <form id="newsletter">
            <input type="email" name="email" id="email-field" />
            <input type="submit" value="Sign Up" />
        </form>
        <div className="social-icons">
            <span className="social-icon"><TwitterIcon style={{fontSize: 30 }}/></span>
            <span className="social-icon"><FacebookIcon style={{ fontSize: 30 }}/></span>
            <span className="social-icon"><LinkedInIcon style={{ fontSize: 30 }}/></span>
            <span className="social-icon"><EmailIcon style={{ fontSize: 30 }}/></span>
        </div>
    </div>
    );
}

export default CenterWidget;
