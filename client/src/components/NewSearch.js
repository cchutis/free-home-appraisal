import React from 'react';
import Places from './Places';

export default function NewSearch(props) {
  return (
    <div>
      <Places search={props.search}/>
    </div>
  );
}
