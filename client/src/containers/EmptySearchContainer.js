import React from 'react';
// import { CircularProgress } from '@material-ui/core';
import LoadingIcon from '../assets/img/loading-icon.png';

export default function EmptySearchContainer(props) {
    return (
        <div className="search-results">
            {props.isLoading ? 
            <div className="loading-screen">
                {/* <CircularProgress /> */}
                <img src={LoadingIcon} />
                <h1>The Accupraisal algorithm is finding your home's value!</h1>
            </div>  :
            <img src="./img/howitworks-FHA.png" alt="" />
            }
        </div>
    )
}
