import React from 'react';
import NavMenu from '../components/NavMenu';
import Logo from '../components/Logo';
// import SearchBar from '../components/SearchBar';
import NewSearch from '../components/NewSearch';

export default function LandingPageContainer(props) {
    return (
      <div className="main">
        <div className="hero-header">
          <div className="fade">
            <div className="logo">
              <Logo />
            </div>
            <NavMenu />
            <div className="left-window">
              <h1 style={{ fontSize: 60 }}>Get the most accurate estimates.</h1>
              <NewSearch search={props.search} />
            </div>
          </div>
        </div>
      </div>
    ); 
}
