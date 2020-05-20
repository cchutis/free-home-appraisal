import { createConnector } from "react-instantsearch-dom";

export default createConnector({
  displayName: "AlgoliaPlaces",

  getProvidedProps() {
    return {};
  },

  refine(props, searchState, nextValue) {
    return {
      ...searchState,
      aroundLatLng: nextValue,
      boundingBox: {}
    };
  },

  getSearchParameters(searchParameters, props, searchState) {
    // const currentRefinement = searchState.aroundLatLng || props.defaultRefinement;
    return searchParameters.setQueryParameter("insideBoundingBox")
  }
});
