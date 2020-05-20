import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import Places from './Places';


export default function NewSearch(props) {

    const searchClient = algoliasearch(
     `${process.env.REACT_APP_ALGOLIA_APP_ID}`,
      `${process.env.REACT_APP_ALGOLIA_API_KEY}`
    );
    return (
      <div>
        <InstantSearch indexName="homes" searchClient={searchClient}>
          <Places search={props.search}/>
        </InstantSearch>
      </div>
    );
}
