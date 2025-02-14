// Mock API service
const PropertyService = {
  getEstimates: async (street, city, state, zip) => {
    // Return mock data
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
        lastUpdated: new Date().toISOString(),
        homeDetails: 'https://www.zillow.com/homedetails/'
      },
      realtyMole: {
        price: 510000,
        listingUrl: 'https://www.realtymole.com/'
      }
    };
  }
};

export default PropertyService;
