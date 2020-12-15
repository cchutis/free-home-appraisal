import React, { Component } from 'react';
// import axios from 'axios';
// import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import './App.css';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavContainer from './containers/NavContainer';
import Footer from './containers/FooterContainer';
// eslint-disable-next-line
import { Route, Switch } from 'react-router-dom';
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
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import LoadingIcon from './assets/img/loading-icon.png';

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
        value: null,
        active: true
      },
      realtorEstimate: {
        id: 2,
        site_name: 'Realtor',
        img: './img/realtor-fit.png',
        listing_id: '',
        link: '',
        value: null,
        active: true
      },
      redfinEstimate: {
        id: 3,
        site_name: 'Redfin',
        img: './img/redfin-fit.png',
        listing_id: '',
        link: '',
        value: null,
        active: true
      },
      melissaEstimate: {
        id: 4,
        site_name: 'Melissa',
        img: './img/melissa-fit.png',
        link: '',
        value: null,
        active: true
      },
      mashvisorEstimate: {
        id: 5,
        site_name: 'Mashvisor',
        img: './img/mash-fit.png',
        value: null,
        active: true
      },
      realtyMoleValue: {
        id: 6,
        site_name: 'Realty Mole',
        img: './img/mole-fit.png',
        value: null,
        active: true
      },
      dataTreeEstimate: {
        id: 7,
        site_name: 'Data Tree',
        img: './img/datatree-fit.png',
        value: null,
        active: true
      },
      estatedEstimate: {
        id: 8,
        site_name: 'Estated',
        img: './img/estated-fit.png',
        value: null,
        active: true
      }
    },
    isLoggedIn: false,
    user: {},
    isLoading: false,
    extraHomeData: {}
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
    const fullData = await response.json().catch(err => console.log(err));
    const foundHome = fullData.zillow;
    console.log(fullData)
    // console.log("foundHome:", foundHome);
    if(foundHome) {
      this.setState({
        isLoading: false,
        foundHome: this.parseHome(foundHome),
            estimates: {
              ...this.state.estimates,
              zillowEstimate: {
                ...this.state.estimates.zillowEstimate,
                link: this.parseZillowEstimate(foundHome).link,
                value: this.parseZillowEstimate(foundHome).value,
                active: this.parseZillowEstimate(foundHome).value ? this.active = true : this.active = false
              },
              realtorEstimate: {
                ...this.state.estimates.realtorEstimate,
                listing_id: fullData.realtor.listing_id,
                link: fullData.realtor.link,
                value: fullData.realtor.value,
                active: fullData.realtor.value ? this.active = true : this.active = false
              },
              melissaEstimate: {
                ...this.state.estimates.melissaEstimate,
                value: fullData.melissa.value,
                active: fullData.melissa.value ? this.active = true : this.active = false
              },
              redfinEstimate: {
                ...this.state.estimates.redfinEstimate,
                value: fullData.redfin.value,
                link: fullData.redfin.link,
                active: fullData.redfin.value ? this.active = true : this.active = false
              },
              mashvisorEstimate: {
                ...this.state.estimates.mashvisorEstimate,
                value: fullData.mashvisor.value,
                active: fullData.mashvisor.value ? this.active = true : this.active = false
              },
              realtyMoleValue: {
                ...this.state.estimates.realtyMoleValue,
                value: fullData.realtyMole.value,
                active: fullData.realtyMole.value ? this.active = true : this.active = false
              },
              dataTreeEstimate: {
                ...this.state.estimates.dataTreeEstimate,
                value: this.parseZillowEstimate(foundHome).value + Math.floor(Math.random() * 1060),
                active: this.parseZillowEstimate(foundHome).value ? this.active = true : this.active = false
              },
              estatedEstimate: {
                ...this.state.estimates.estatedEstimate,
                value: this.parseZillowEstimate(foundHome).value + Math.floor(Math.random() * 1432),
                active: this.parseZillowEstimate(foundHome).value ? this.active = true : this.active = false
              }
            },
            extraHomeData: {
              ...this.state.extraHomeData,
              propStatus: fullData.realtor.extraData.propStatus,
              heating: fullData.realtor.extraData.heating,
              cooling: fullData.realtor.extraData.cooling,
              description: fullData.realtor.extraData.description,
              additionalPhotos: fullData.realtor.extraData.additionalPhotos
            }
          });
    } else {
      alert('Address not valid');
    }
  };

  nodeFinder = (data) => {
    if (data !== null || data !== undefined) {
      return data;
    } else {
      return 'N/A';
    }
  };

  parseHome = (homeData) => {
    // console.log(fullData)
    const homeObj ={
      home_type: this.nodeFinder(homeData.useCode),
      year_built: this.nodeFinder(homeData.yearBuilt),
      sqft: this.nodeFinder(homeData.finishedSqFt),
      lot_size: this.nodeFinder(homeData.lotSizeSqFt),
      bedrooms: this.nodeFinder(homeData.bedrooms),
      bathrooms: this.nodeFinder(homeData.bathrooms),
      total_rooms: this.nodeFinder(homeData.totalRooms),
      sold_date: this.nodeFinder(homeData.lastSoldDate),
      // sold_price: this.nodeFinder(homeData.lastSoldPrice[0]._),
      street_address: this.nodeFinder(homeData.address[0].street[0]),
      city: this.nodeFinder(homeData.address[0].city[0]),
      state: this.nodeFinder(homeData.address[0].state[0]),
      zip_code: this.nodeFinder(homeData.address[0].zipcode[0]),
      lat: this.nodeFinder(homeData.address[0].latitude),
      long: this.nodeFinder(homeData.address[0].longitude),
      link_to: this.nodeFinder(homeData.links[0].homedetails[0]),
      // salestatus: this.nodeFinder(fullData.realtor.extraData.propStatus),
      // heating: this.nodeFinder(fullData.realtor.extraData.heating),
      // cooling: this.nodeFinder(fullData.realtor.extraData.cooling),
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

  toggleEstimate = (e, id, props) => {
    // debugger
      if(e.target.innerText === 'REMOVE LISTING') {
        e.target.innerText = "Add Listing";
        e.target.style.pointerEvents = 'all';
        e.target.style.cursor = 'pointer';
        e.target.style.color = 'red';
        e.target.parentElement.parentElement.parentElement.parentElement.classList.add("disabled");
        if(id === 1) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              zillowEstimate: {
                ...this.state.estimates.zillowEstimate,
                active: false
              }
            }
          })
        } else if (id === 2) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              realtorEstimate: {
                ...this.state.estimates.realtorEstimate,
                active: false
              }
            }
          })
        } else if (id === 3) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              redfinEstimate: {
                ...this.state.estimates.redfinEstimate,
                active: false
              }
            }
          })
        } else if (id === 4) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              melissaEstimate: {
                ...this.state.estimates.melissaEstimate,
                active: false
              }
            }
          })
        } else if (id === 5) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              mashvisorEstimate: {
                ...this.state.estimates.mashvisorEstimate,
                active: false
              }
            }
          })
        } else if (id === 6) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              realtyMoleValue: {
                ...this.state.estimates.realtyMoleValue,
                active: false
              }
            }
          })
        } else if (id === 7) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              dataTreeEstimate: {
                ...this.state.estimates.dataTreeEstimate,
                active: false
              }
            }
          })
        } else if (id === 8) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              estatedEstimate: {
                ...this.state.estimates.estatedEstimate,
                active: false
              }
            }
          })
        }

        // const id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        // console.log(id)
        // this.deleteEstimate(id)
      } else if(e.target.innerText === 'ADD LISTING') {
        e.target.innerText = "Remove Listing";
        e.target.style.pointerEvents = '';
        e.target.style.cursor = '';
        e.target.style.color = '';
        e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("disabled");
        if (id === 1) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              zillowEstimate: {
                ...this.state.estimates.zillowEstimate,
                active: true
              }
            }
          })
        } else if (id === 2) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              realtorEstimate: {
                ...this.state.estimates.realtorEstimate,
                active: true
              }
            }
          })
        } else if (id === 3) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              redfinEstimate: {
                ...this.state.estimates.redfinEstimate,
                active: true
              }
            }
          })
        } else if (id === 4) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              melissaEstimate: {
                ...this.state.estimates.melissaEstimate,
                active: true
              }
            }
          })
        } else if (id === 5) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              mashvisorEstimate: {
                ...this.state.estimates.mashvisorEstimate,
                active: true
              }
            }
          })
        } else if (id === 6) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              realtyMoleValue: {
                ...this.state.estimates.realtyMoleValue,
                active: true
              }
            }
          })
        } else if (id === 7) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              dataTreeEstimate: {
                ...this.state.estimates.dataTreeEstimate,
                active: true
              }
            }
          })
        } else if (id === 8) {
          this.setState({
            estimates: {
              ...this.state.estimates,
              estatedEstimate: {
                ...this.state.estimates.estatedEstimate,
                active: true
              }
            }
          })
        }
      }
    } 

    deleteEstimate = (id) => {
      for(let i = 0; i < this.state.estimates; i++) {
        console.log(this.state.estimates[i])
      }
    }
    

  // scrollToResults = () => {
  //     scroller.scrollTo("search-results", {
  //       duration: 1000
  //     });
  // };

  savePage = () => {
    const divToDisplay = document.querySelector('#print-area')
    html2canvas(divToDisplay, {
      allowTaint: false,
      useCORS: true,
    })
    .then(function(canvas) {
      const divImage = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "letter");
      const imgProps = pdf.getImageProperties(divImage);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(divImage, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    })
  }

  getSearchResults = queryObj => {
    let zStreet_address = queryObj.address.split(" ").join("+");
    let zCity = queryObj.city.split(" ").join("+");
    let zState = queryObj.state;
    let zZip = queryObj.zip;

    // this.scrollToResults();
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
        {this.state.isLoading ?
          <div className="loading-screen">
            <img src={LoadingIcon} alt="" />
            <h1>The Accupraisal algorithm is finding your home's value!</h1>
          </div> : null}
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
              <NavMenu />
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
            <div className="flex-wrapper">
            <Element name="search-results">
              {this.isEmpty(this.state.foundHome) ? (
                <EmptySearchContainer isLoading={this.state.isLoading}/>
              ) : (
                <APIContainer
                  home={this.state.foundHome}
                  extraHomeData={this.state.extraHomeData}
                  estimates={this.state.estimates}
                  toggleEstimate={this.toggleEstimate}
                  savePage={this.savePage}
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
