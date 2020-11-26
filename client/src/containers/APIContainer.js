import React from 'react';
import HouseCard from '../components/HouseCard';
import Grid from '@material-ui/core/Grid';
import FHAEstimate from "../components/FHAEstimate";
import EstimateContainer from "../containers/EstimateContainer";
import Container from '@material-ui/core/Container';
import PDFButton from '../components/PDFButton';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



export default function APIContainer(props) {

    function savePage() {
        const input = document.querySelector('#print-area');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("estimate.pdf");
        })
    }

    return (
        <Container maxWidth="lg" id="print-area">
            <Grid container direction="row" justify="center" alignItems="center">
                <HouseCard home={props.home} />
                <EstimateContainer estimates={props.estimates} toggleEstimate={props.toggleEstimate} />
                <FHAEstimate estimates={props.estimates} />
                <PDFButton savePage={savePage}/>
            </Grid>
        </Container>
    )
}
