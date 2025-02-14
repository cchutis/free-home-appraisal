import axios from 'axios';

const ZILLOW_API_KEY = process.env.REACT_APP_ZILLOW_TOKEN;
const MELISSA_API_KEY = process.env.REACT_APP_MELISSA_TOKEN;
const REALTY_MOLE_API_KEY = process.env.REACT_APP_REALTY_MOLE_TOKEN;
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

// Helper function for direction correction
const directionCorrection = (input) => {
  const directions = {
    'N': 'North',
    'S': 'South',
    'E': 'East',
    'W': 'West',
    'NE': 'Northeast',
    'NW': 'Northwest',
    'SE': 'Southeast',
    'SW': 'Southwest'
  };
  
  for (let dir in directions) {
    if (input.includes(dir)) {
      return input.replace(dir, directions[dir]);
    }
  }
  return input;
};

// Property Estimate API Service
const PropertyService = {
  getEstimates: async (streetAddress, city, state, zip) => {
    try {
      // Return mock data for demonstration
      return {
        melissa: {
          Records: [{
            BuildingInfo: {
              YearBuilt: "2000",
              TotalBedrooms: "4",
              TotalBathrooms: "2.5",
              TotalSquareFeet: "2,500"
            },
            CurrentDeed: {
              SalePrice: "450000",
              SaleDate: "2022-01-15"
            }
          }]
        },
        zillow: {
          zestimate: 525000,
          rentZestimate: 2800,
          lastUpdated: new Date().toISOString()
        },
        realtyMole: {
          price: 510000,
          rentEstimate: 2750,
          confidence: "high",
          lastUpdated: new Date().toISOString()
        },
        realtor: null,
        redfin: null
      };
    } catch (error) {
      console.error('Error fetching property estimates:', error);
      throw error;
    }
  }
};

export default PropertyService;
