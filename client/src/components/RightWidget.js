import React from 'react';

const RightWidget = () => {
    return (
        <div className="widget right-widget">
            <h2>Navigate</h2>
            <div className="right-body">
                <div className="left-side">
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Sell your Home</li>
                        <li>Estimates</li>
                    </ul>
                </div>
                <div className="right-side">
                    <ul>
                        <li>Profile</li>
                        <li>Create Account</li>
                        <li>Dashboard</li>
                        <li>Favorites</li>
                        <li>Report Errors</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RightWidget;
