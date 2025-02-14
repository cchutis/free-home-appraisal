import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { CircularProgress } from "@mui/material";


const useStyles = styled({
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
          <Button size="small" color="primary" onClick={(e) => props.toggleEstimate(e, id)}>
            <small>Remove Listing</small>
          </Button>
          <Button className="link-btn" size="small" color="primary" href={link} target="_blank">
            <ExitToAppIcon />
          </Button>
        </CardActions>
      </Card>
    );
}
