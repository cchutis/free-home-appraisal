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
              <h1 style={{ fontSize: 40, marginBottom: 0 }}>Get the most accurate estimates.</h1>
              <p style={{ fontSize: 15, marginTop: 0 }}>Find your home's value fast. Type in an address below to begin.</p>
              <NewSearch search={props.search} />
            </div>
          </div>
        </div>
        <div className="shapes-container">
          <div className="wave-animation">
            {/* Wave Animation */}
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(255,255,255,0.7" />
                <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    ); 
}
