import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function EmptySearchContainer(props) {
    return (
        <div className="search-results">
            {props.isLoading ? 
            <div>
                <CircularProgress />
                <h1>The Free Home Apprasial Algorithm is finding your home's value!</h1>
            </div>  :
            <img src="./img/howitworks-FHA.png" alt="" />
            }
        </div>
    )
}
