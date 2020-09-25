import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';


export default class FHAEstimate extends Component {

    getEstimates = (props) => {
      // let final = [];
      // console.log(this.props.estimates)
      const zillow = this.props.estimates.zillowEstimate.value;
      const redfin = this.props.estimates.redfinEstimate.value;
      const realtor = this.props.estimates.realtorEstimate.value;
      const melissa = this.props.estimates.melissaEstimate.value;
      const mashvisor = this.props.estimates.mashvisorEstimate.value;
      const realtyMole = this.props.estimates.realtyMoleValue.value;
      let arr = [zillow, redfin, realtor, melissa, mashvisor, realtyMole];
      // console.log(arr)
      let final = arr.filter(estimate => estimate !== 0 && typeof estimate == 'number');

      // console.log(final)
      return Math.round(final.reduce((a, b) => a + b, 0) / final.length);
    }

    numberWithCommas = (x) => {
       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    render() {
        return (
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <h1>FHA ESTIMATE</h1>
        <h1 style={{fontSize: 80}}>{'$' + this.numberWithCommas(this.getEstimates())}</h1>
            </Grid>
          </Grid>
        );
    }
}