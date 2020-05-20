import React from 'react';
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";


const LeftWidget = () => {
    return (
        <div className="widget">
            <h2>Stay Connected</h2>
            <p style={{textAlign: 'left'}}>Stay connected by subscribing to our monthly newsletter with news, updates and more!</p>
            <form id="newsletter">
                <input type="email" name="email" id="email-field" />
                <input type="submit" value="Sign Up" />
            </form>
            <div className="social-icons">
                <span className="social-icon"><TwitterIcon style={{fontSize: 50 }}/></span>
                <span className="social-icon"><FacebookIcon style={{ fontSize: 50 }}/></span>
                <span className="social-icon"><LinkedInIcon style={{ fontSize: 50 }}/></span>
                <span className="social-icon"><EmailIcon style={{ fontSize: 50 }}/></span>
            </div>
        </div>
    );
}

export default LeftWidget;
