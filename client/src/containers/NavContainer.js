import React from 'react';
import Title from '../components/Title';
// import SearchBar from '../components/SearchBar';
import { Grid } from '@material-ui/core';
import Logo from '../components/Logo';
import NavMenu from '../components/NavMenu';
import NewSearch from '../components/NewSearch';


export default function NavContainer(props) {
    return (
        <div className="nav">
            <div className="fade">
                <div className="logo-container">
                    <Logo />
                </div>
                <NavMenu />
                <Title />
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <div className="search-bar-container">
                            <h1>You're one search away from the most accurate appraisal!</h1>
                            {/* <SearchBar search={props.search} /> */}
                            <NewSearch search={props.search}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
