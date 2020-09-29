import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { CircularProgress } from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    margin: 20
  },
  media: {
    width: 200,
    objectFit: 'fill'
  }
});

function numberWithCommas(x) {
  if(x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default function EstimateCard(props) {
  const {id, site_name, value, img, link} = props.data;
  const classes = useStyles();

    return (
      <Card className={value ? classes.root : classes.root + ' disabled'} data-id={id}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={img}
            title={`${site_name} Estimate`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {site_name} Estimate
          </Typography>
            <Typography gutterBottom variant="h4" component="h2">
              {value ? '$' + numberWithCommas(value) : 'Not Found'}

            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={(e) => props.toggleEstimate(e)}>
            <small>Remove Listing</small>
          </Button>
          <Button className="link-btn" size="small" color="primary" href={link} target="_blank">
            <ExitToAppIcon />
          </Button>
        </CardActions>
      </Card>
    );
}
