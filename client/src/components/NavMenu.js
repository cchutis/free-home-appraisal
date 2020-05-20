import React from 'react';
import { Link } from 'react-router-dom';
import UserLogin from "../components/UserLogin";



export default function NavMenu() {
    return (
        <ul className="main-menu">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/estimates'>Estimates</Link></li>
            <li><Link to='/sell-my-home'>Sell my Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><UserLogin /></li>
        </ul>
    )
}
