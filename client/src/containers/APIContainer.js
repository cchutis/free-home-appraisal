import React from 'react';
import HouseCard from '../components/HouseCard';
import Grid from '@mui/material/Grid';
import FHAEstimate from "../components/FHAEstimate";
import EstimateContainer from "../containers/EstimateContainer";
import Container from '@mui/material/Container';
import PDFButton from '../components/PDFButton';

export default function APIContainer(props) {
    

    return (
        <Container maxWidth="lg">
            <Grid container direction="row" justifyContent="center" alignItems="center" id="print-area">
                <HouseCard home={props.home} extraHomeData={props.extraHomeData} />
                <EstimateContainer estimates={props.estimates} toggleEstimate={props.toggleEstimate} />
                <FHAEstimate estimates={props.estimates} />
                <PDFButton savePage={props.savePage}/>
            </Grid>
        </Container>
    )
}
