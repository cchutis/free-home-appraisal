import React, { Component } from "react";
import places from "places.js";
import connect from "./connector";

class Places extends Component {
  createRef = c => (this.element = c);

  componentDidMount() {
    const { refine, defaultRefinement } = this.props;

    const autocomplete = places({
      container: this.element,
      // Algolia Places options
      countries: ['us'],
      type: 'address'
    });

    autocomplete.on("change", e => {
      this.handleSuggestion(e.suggestion.name, e.suggestion.city, e.suggestion.administrative, e.suggestion.postcode);
    });

    autocomplete.on("clear", () => {
      refine(defaultRefinement);
    });
  }

  handleSuggestion = (address, city, state, zip) => {
    const queryObj = {
      address: address,
      city: city,
      state: state,
      zip: zip
    }
    this.props.search(queryObj)
  }

  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <input
          ref={this.createRef}
          type="search"
          id="address-input"
          placeholder="Enter Address here!"
          style={{ width: 800, maxWidth: 700, height: 50}}
        />
      </div>
    );
  }
}

export default connect(Places);
