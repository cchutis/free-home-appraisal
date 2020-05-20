import React from 'react';
import HouseCard from '../components/HouseCard';
import Grid from '@material-ui/core/Grid';
import FHAEstimate from "../components/FHAEstimate";
import EstimateContainer from "../containers/EstimateContainer";
import Container from '@material-ui/core/Container';



export default function APIContainer(props) {
    return (
        <Container maxWidth="lg">
            <Grid container direction="row" justify="center" alignItems="center">
                <HouseCard home={props.home} />
                <EstimateContainer estimates={props.estimates} deleteEstimate={props.deleteEstimate} />
                <FHAEstimate estimates={props.estimates} />
            </Grid>
        </Container>
    )
}
