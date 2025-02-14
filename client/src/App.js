import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import CssBaseline from '@mui/material/CssBaseline';
import NavContainer from './containers/NavContainer';
import Footer from './containers/FooterContainer';
import { Route, Routes } from 'react-router-dom';
import APIContainer from './containers/APIContainer';
import EmptySearchContainer from './containers/EmptySearchContainer';
import LandingPageContainer from './containers/LandingPageContainer';
import NavMenu from './components/NavMenu';
import ProfilePage from './containers/ProfilePage';
import SignUp from './components/SignUp';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import AboutContent from './content/AboutContent';
import ContactContent from './content/ContactContent';
import SellMyHomeContent from './content/SellMyHomeContent';
import LandingPageContent from './content/LandingPageContent';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import LoadingIcon from './assets/img/loading-icon.png';
import PropertyService from './services/api';

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
    extraHomeData: {},
    loading: false,
    error: null,
    searchPerformed: false
  };

  handleSearch = async (searchData) => {
    this.setState({ loading: true });
    try {
      const [street, city, state, zip] = this.parseAddress(searchData.address);
      const estimates = await PropertyService.getEstimates(street, city, state, zip);
      
      this.setState(prevState => ({
        estimates: {
          ...prevState.estimates,
          zillowEstimate: {
            ...prevState.estimates.zillowEstimate,
            value: estimates.zillow?.zestimate || null,
            link: estimates.zillow?.homeDetails || ''
          },
          realtorEstimate: {
            ...prevState.estimates.realtorEstimate,
            value: estimates.realtyMole?.price || null,
            link: estimates.realtyMole?.listingUrl || ''
          },
          melissaEstimate: {
            ...prevState.estimates.melissaEstimate,
            value: estimates.melissa?.Records?.[0]?.CurrentDeed?.SalePrice || null
          },
          realtyMoleValue: {
            ...prevState.estimates.realtyMoleValue,
            value: estimates.realtyMole?.price || null
          }
        },
        foundHome: {
          street_address: street,
          city: city,
          state: state,
          zip_code: zip,
          bedrooms: estimates.melissa?.Records?.[0]?.BuildingInfo?.TotalBedrooms || '3',
          bathrooms: estimates.melissa?.Records?.[0]?.BuildingInfo?.TotalBathrooms || '2',
          sqft: estimates.melissa?.Records?.[0]?.BuildingInfo?.TotalSquareFeet || '2,000',
          year_built: estimates.melissa?.Records?.[0]?.BuildingInfo?.YearBuilt || '2000',
          lat: searchData.lat,
          long: searchData.long
        },
        loading: false,
        searchPerformed: true,
        error: null
      }));
    } catch (error) {
      console.error('Error fetching estimates:', error);
      this.setState({ 
        loading: false,
        error: 'Failed to fetch property estimates. Please try again.'
      });
    }
  }

  parseAddress = (address) => {
    // Simple address parser - you might want to use a more robust solution
    const parts = address.split(',').map(part => part.trim());
    const street = parts[0];
    const city = parts[1];
    const stateZip = parts[2].split(' ');
    const state = stateZip[0];
    const zip = stateZip[1];
    return [street, city, state, zip];
  }

  nodeFinder = (data) => {
    if (data !== null || data !== undefined) {
      return data;
    } else {
      return 'N/A';
    }
  };

  parseHome = (homeData) => {
    const homeObj ={
      home_type: this.nodeFinder(homeData.useCode),
      year_built: this.nodeFinder(homeData.yearBuilt),
      sqft: this.nodeFinder(homeData.finishedSqFt),
      lot_size: this.nodeFinder(homeData.lotSizeSqFt),
      bedrooms: this.nodeFinder(homeData.bedrooms),
      bathrooms: this.nodeFinder(homeData.bathrooms),
      total_rooms: this.nodeFinder(homeData.totalRooms),
      sold_date: this.nodeFinder(homeData.lastSoldDate),
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

  toggleEstimate = (e, id, props) => {
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
    

  savePage = () => {
    const address = this.state.foundHome.street_address
    const divToDisplay = document.querySelector('#print-area')
    html2canvas(divToDisplay, {
      allowTaint: false,
      useCORS: true,
    })
    .then(function(canvas) {
      const divImage = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "legal");
      // const imgProps = pdf.getImageProperties(divImage);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(divImage, 'PNG', 0, 0, 600, 1080);
      pdf.save(`${address}.pdf`);
    })
  }

  getSearchResults = queryObj => {
    this.handleSearch(queryObj);
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
        {this.state.isLoading || this.state.loading ?
          <div className="loading-screen">
            <img src={LoadingIcon} alt="" />
            <h1>The Accupraisal algorithm is finding your home's value!</h1>
          </div> : null}
        <CssBaseline />
        <Routes>
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/about" element={
            <>
              <div className="header">
                <NavMenu />
              </div>
              <div className="flex-wrapper">
                <AboutContent />
                <Footer />
              </div>
            </>
          } />
          <Route exact path="/contact" element={
            <>
              <NavMenu />
              <div className="flex-wrapper">
                <ContactContent />
                <Footer />
              </div>
            </>
          } />
          <Route exact path="/sell-my-home" element={
            <>
              <div className="header">
                <NavMenu />
              </div>
              <div className="flex-wrapper">
                <SellMyHomeContent />
                <Footer />
              </div>
            </>
          } />
          <Route exact path="/estimates" element={
            <>
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
            </>
          } />
          <Route path="/" element={
            <>
              <LandingPageContainer
                search={this.getSearchResults}
              />
              <LandingPageContent />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    );
  }
};
