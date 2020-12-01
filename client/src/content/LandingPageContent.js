import React from 'react';

const LandingPageContent = () => {
    return (
      <div className="landing-content-body">
        <div id="about" className="landing-info section-1">
          <div className="home-text-left">
            <h2 style={{fontSize: 40}}>Estimating Solutions: Simplified.</h2>
            <p style={{ fontSize: 16 }}>Are you thinking about selling your current house? Do you want to
            purchase a new home? Or, maybe you just want to refinance while
            interest rates are low? Whatever the case, you will need a property
            appraisal to determine the value of the home or property in
            question. At Accupraisal.com, we understand that estimating
            the price of a house or property can be a painful process and so we
            opted to make home appraisals free and easy to use. We calculate
            property prices using a highly-efficient proprietary algorithm that
            takes recent comparable sales, specific property information and
            neighborhood data into account when creating a broad property
            valuation estimate.</p>
          </div>
        </div>
        <div className="landing-info section-2">
          <div className="home-text-center">
          <h2 style={{ fontSize: 40, color: 'white' }}>We are Accupraisal.</h2>
          <p style={{ fontSize: 16, color: 'white' }}>Founded in 2019, Accupraisal is engineered and run by a small team looking to shake
            up the real estate estimation industry. We're passionate about providing our users with data to assist them in
            the sale or purchase of a home. This tool and future updates will be helpful to home buyers and real estate professionals 
            alike.</p>
          </div>
        </div>
        <div className="landing-info section-3">
          <div className="home-text-right">
          <h2 style={{fontSize: 40}}>The future of Accupraisal.</h2>
            <p style={{ fontSize: 16 }}>This tool is in early phases of development. Please feel free to test out current features, and
            if you encounter any bugs or issues, contact us via the 'Contact' page with a description of what was encountered. Future plans
            for Accupraisal include more estimation API's, user accounts with saved address/properties, and the ability to correct home data/upload new data
            and photos.</p>
          </div>
        </div>
      </div>
    );
}

export default LandingPageContent;
