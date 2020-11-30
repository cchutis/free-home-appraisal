import React from 'react';
import HouseCard from '../components/HouseCard';
import Grid from '@material-ui/core/Grid';
import FHAEstimate from "../components/FHAEstimate";
import EstimateContainer from "../containers/EstimateContainer";
import Container from '@material-ui/core/Container';
import PDFButton from '../components/PDFButton';




export default function APIContainer(props) {
    

    return (
        <Container maxWidth="lg">
            <Grid container direction="row" justify="center" alignItems="center" id="print-area">
                <HouseCard home={props.home} />
                <EstimateContainer estimates={props.estimates} toggleEstimate={props.toggleEstimate} />
                <FHAEstimate estimates={props.estimates} />
                <PDFButton savePage={props.savePage}/>
            </Grid>
        </Container>
    )
}
