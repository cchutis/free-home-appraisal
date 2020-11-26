import React from 'react';
import { Link } from 'react-router-dom';
import UserLogin from "../components/UserLogin";



export default function NavMenu() {
    return (
        <ul className="main-menu">
            <li><Link to='/'>HOME</Link></li>
            {/* <li><Link to='/about'>ABOUT</Link></li> */}
            <li><Link to='/estimates'>ESTIMATE TOOL</Link></li>
            {/* <li><Link to='/sell-my-home'>SELL MY HOME</Link></li> */}
            <li><Link to='/contact'>CONTACT</Link></li>
            {/* <li><UserLogin /></li> */}
        </ul>
    )
}
