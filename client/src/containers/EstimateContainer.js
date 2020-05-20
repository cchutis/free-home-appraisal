import React from 'react';
import EstimateCard from '../components//EstimateCard';
import Grid from "@material-ui/core/Grid";

// function renderEstimateCards(props) {
//     return props.estimates.map(estimate => {
//         return <EstimateCard key={estimate.id} data={estimate} deleteEstimate={props.deleteEstimate} />
//     })
// }

export default function EstimateContainer(props) {
    return (
        <div>
        <h1>ESTIMATES</h1>
        <Grid container direction="row" justify="center" alignItems="center">
            {/* {renderEstimateCards(props)} */}
            {/* TEMP CONDITIONAL RENDERING BASED ON VALUE */}
            {/* {props.estimates.zillowEstimate.value === 0 ? null : <EstimateCard data={props.estimates.zillowEstimate} deleteEstimate={props.deleteEstimate} />}
            {props.estimates.realtorEstimate.value === 0 ? null : <EstimateCard data={props.estimates.realtorEstimate} deleteEstimate={props.deleteEstimate} />}
            {props.estimates.redfinEstimate.value === 0 ? null : <EstimateCard data={props.estimates.redfinEstimate} deleteEstimate={props.deleteEstimate} />}
            {props.estimates.homesComEstimate.value === 0 ? null : <EstimateCard data={props.estimates.homesComEstimate} deleteEstimate={props.deleteEstimate} />}
            {props.estimates.truliaEstimate.value === 0 ? null : <EstimateCard data={props.estimates.truliaEstimate} deleteEstimate={props.deleteEstimate} />} */}
            <EstimateCard data={props.estimates.zillowEstimate} deleteEstimate={props.deleteEstimate} />
            <EstimateCard data={props.estimates.realtorEstimate} deleteEstimate={props.deleteEstimate} />
            <EstimateCard data={props.estimates.redfinEstimate} deleteEstimate={props.deleteEstimate} />
            <EstimateCard data={props.estimates.melissaEstimate} deleteEstimate={props.deleteEstimate} />
            <EstimateCard data={props.estimates.mashvisorEstimate} deleteEstimate={props.deleteEstimate} />
          </Grid>
        </div>
    )
}
