import React from 'react';

export default function EmptySearchContainer(props) {
    return (
        <div className="search-results">
            {props.isLoading ? 
            null  :
            <img src="./img/howitworks-FHA.png" alt="" />
            }
        </div>
    )
}
