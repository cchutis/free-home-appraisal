# AccuPraisal - Frontend React Application

A modern React application for real estate property appraisals using multiple data sources including Zillow, Melissa Data, and RealtyMole.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```
REACT_APP_ZILLOW_TOKEN=your_zillow_token_here
REACT_APP_MELISSA_TOKEN=your_melissa_token_here
REACT_APP_REALTY_MOLE_TOKEN=your_realty_mole_token_here
```

4. Start the development server:
```bash
npm start
```

## Features

- Property value estimates from multiple sources
- Address validation and standardization
- Interactive property comparison
- PDF report generation
- Mobile-responsive design

## API Integration

The application integrates with the following APIs:
- Zillow API for property valuations
- Melissa Data API for address validation
- RealtyMole API for additional property data

## Building for Production

To create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

This is a standalone frontend application that can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront