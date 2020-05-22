import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function EmptySearchContainer(props) {
    return (
        <div>
            {props.isLoading ? 
            <div>
                <CircularProgress />
                <h2>The Free Home Apprasial Algorithm is finding your home's value</h2>
            </div>  :
            <h2>Enter an Address above to get results!</h2>
            }
        </div>
    )
}
