import React, { Component } from 'react';
// import axios from 'axios';
// import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import './App.css';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavContainer from './containers/NavContainer';
import Footer from './containers/FooterContainer';
// eslint-disable-next-line
import { Route, Switch, Router } from 'react-router-dom';
import APIContainer from './containers/APIContainer';
import EmptySearchContainer from './containers/EmptySearchContainer';
import LandingPageContainer from './containers/LandingPageContainer';
import NavMenu from './components/NavMenu';
import ProfilePage from './containers/ProfilePage';
import SignUp from './components/SignUp';
// eslint-disable-next-line
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import AboutContent from './content/AboutContent';
import ContactContent from './content/ContactContent';
import SellMyHomeContent from './content/SellMyHomeContent';
import LandingPageContent from './content/LandingPageContent';

const estimatesAPI = '/estimates';


export default class App extends Component {
  state = {
    allHomes: [],
    foundHome: {},
    estimates: {
      zillowEstimate: {
        id: 1,
        site_name: 'Zillow',
        img: './img/zillow-fit.png',
        link: '',
        value: 0,
      },
      realtorEstimate: {
        id: 2,
        site_name: 'Realtor',
        img: './img/realtor-fit.png',
        listing_id: '',
        link: '',
        value: 0,
      },
      redfinEstimate: {
        id: 3,
        site_name: 'Redfin',
        img: './img/redfin-fit.png',
        listing_id: '',
        link: '',
        value: 0,
      },
      melissaEstimate: {
        id: 4,
        site_name: 'Melissa',
        img: './img/melissa-fit.png',
        link: '',
        value: 0,
      },
      mashvisorEstimate: {
        id: 5,
        site_name: 'Mashvisor',
        img: './img/mash-fit.png',
        value: 0,
      },
    },
    isLoggedIn: false,
    user: {},
    isLoading: false
  };

 

  fetchEstimates = id => {
    fetch(estimatesAPI)
      .then(r => r.json())
      .then(estData => {
        this.filterEstimates(estData, id);
      });
  };

  filterEstimates = (estData, id) => {
    const filter = estData.filter(est => {
      if (est.home_id === id && est.value !== 0) {
        return est;
      } else {
        return null;
      }
    });
    this.setState({
      estimates: filter
    });
  };

  //  Hitting XML Zillow
  fetchHomeData = async (street_address, city, state, zip) => {
    this.setState({
      isLoading: true
    })
    const api_url = estimatesAPI + `/${street_address}/${city}/${state}/${zip}`;
    const response = await fetch(api_url);
    const fullData = await response.json();
    const foundHome = fullData.zillow;

    console.log("foundHome:", foundHome);
    if(foundHome) {
      this.setState({
        isLoading: false,
        foundHome: this.parseHome(foundHome),
            estimates: {
              ...this.state.estimates,
              zillowEstimate: {
                ...this.state.estimates.zillowEstimate,
                link: this.parseZillowEstimate(foundHome).link,
                value: this.parseZillowEstimate(foundHome).value
              },
              realtorEstimate: {
                ...this.state.estimates.realtorEstimate,
                listing_id: fullData.realtor.listing_id,
                link: fullData.realtor.link,
                value: fullData.realtor.value
              },
              melissaEstimate: {
                ...this.state.estimates.melissaEstimate,
                value: fullData.melissa.value
              },
              redfinEstimate: {
                ...this.state.estimates.redfinEstimate,
                value: fullData.redfin.value,
                link: fullData.redfin.link
              },
              mashvisorEstimate: {
                ...this.state.estimates.mashvisorEstimate,
                value: fullData.mashvisor.value
              }
            }
          });
    } else {
      alert('Address not valid');
    }
  };

  nodeFinder = (data) => {
    if (data !== null) {
      return data;
    } else {
      return 'N/A';
    }
  };

  parseHome = homeData => {
    const homeObj ={
      home_type: this.nodeFinder(homeData.useCode),
      year_built: this.nodeFinder(homeData.yearBuilt),
      sqft: this.nodeFinder(homeData.finishedSqFt),
      lot_size: this.nodeFinder(homeData.lotSizeSqFt),
      bedrooms: this.nodeFinder(homeData.bedrooms),
      bathrooms: this.nodeFinder(homeData.bathrooms),
      total_rooms: this.nodeFinder(homeData.totalRooms),
      sold_date: this.nodeFinder(homeData.lastSoldDate),
      sold_price: this.nodeFinder(homeData.lastSoldPrice),
      street_address: this.nodeFinder(homeData.address[0].street[0]),
      city: this.nodeFinder(homeData.address[0].city[0]),
      state: this.nodeFinder(homeData.address[0].state[0]),
      zip_code: this.nodeFinder(homeData.address[0].zipcode[0]),
      lat: this.nodeFinder(homeData.address[0].latitude),
      long: this.nodeFinder(homeData.address[0].longitude),
      link_to: this.nodeFinder(homeData.links[0].homedetails[0]),
    }
    return homeObj;
  }
  
  parseZillowEstimate = homeData => {
    const zData = {
      value: Number(homeData.zestimate[0].amount[0]._),
      link: homeData.links[0].homedetails[0]
    }
    return zData
  }

  errorCatch = (data) => {
    if(data.querySelector('code').innerHTML !== '0') {
      return true
    } else {
      return false
    }
  }

  deleteEstimate = id => {
    console.log(id);
    const updatedEstimates = this.state.estimates.filter(
      estimate => {
        if (estimate.id === id) {
          return estimate.value = 0;
        } else {
          return estimate;
        }
      }
    );
    this.setState({
      estimates: updatedEstimates
    });
  };

  scrollToResults = () => {
    if (window.location.pathname === "/estimates") {
      scroller.scrollTo("search-results", {
        duration: 1000
      });
    } else if (window.location.pathname === "/") {
      window.location.pathname = "/estimates";
    }
  };

  getSearchResults = queryObj => {
    let zStreet_address = queryObj.address.split(" ").join("+");
    let zCity = queryObj.city.split(" ").join("+");
    let zState = queryObj.state;
    let zZip = queryObj.zip;

    this.scrollToResults();
    this.fetchHomeData(zStreet_address, zCity, zState, zZip);
  };

  handleChange = e => {
    console.log(e.target.value);
  };

  isEmpty = obj => {
    return !obj || Object.keys(obj).length === 0;
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Switch>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/about">
            <div className="header">
              <NavMenu />
            </div>
            <div class="flex-wrapper">
            <AboutContent />
            <Footer />
            </div>
          </Route>
          <Route exact path="/contact">
            <div className="header">
              <NavMenu />
            </div>
            <div class="flex-wrapper">
            <ContactContent />
            <Footer />
            </div>
          </Route>
          <Route exact path="/sell-my-home">
            <div className="header">
              <NavMenu />
            </div>
            <div class="flex-wrapper">
            <SellMyHomeContent />
            <Footer />
            </div>
          </Route>
          <Route exact path="/estimates">
            <NavContainer
              loggedin={this.state.isLoggedIn}
              search={this.getSearchResults}
            />
            <div class="flex-wrapper">
            <Element name="search-results">
              {this.isEmpty(this.state.foundHome) ? (
                <EmptySearchContainer isLoading={this.state.isLoading}/>
              ) : (
                <APIContainer
                  home={this.state.foundHome}
                  estimates={this.state.estimates}
                  deleteEstimate={this.deleteEstimate}
                />
              )}
            </Element>
            <Footer />
            </div>
          </Route>
          <Route path="/">
            <LandingPageContainer
              search={this.getSearchResults}
            />
            <LandingPageContent />
            <Footer />
          </Route>
        </Switch>
      </div>
    );
  }
};
