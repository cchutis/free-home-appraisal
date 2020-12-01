import React from 'react';
import NavMenu from '../components/NavMenu';
import Logo from '../components/Logo';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const CTAButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #3f51b5b5 30%, #5db1b5 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    width: 200,
    padding: '0 30px',
    margin: '10px 50px 40px 50px',
  },
  label: {
    textTransform: 'capitalize',
  }
})(Button);


export default function LandingPageContainer(props) {
    return (
      <div className="main">
        <div className="hero-header">
          <div className="hero-overlay">
          <div className="fade">
            <div className="logo">
              <Logo />
            </div>
            <NavMenu />
            <div className="left-window">
              <h1 style={{ fontSize: 40, marginBottom: 0 }}>Get the most accurate estimates.</h1>
              <p style={{ fontSize: 15, marginTop: 0 }}>Find your home's value fast. Click below to get started.</p>
                <div><CTAButton variant="contained" color="primary" href="/estimates">GET ESTIMATE NOW</CTAButton><CTAButton variant="contained" color="primary" href="#about">LEARN MORE</CTAButton></div>
            </div>
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
