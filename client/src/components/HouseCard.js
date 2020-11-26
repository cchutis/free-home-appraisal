import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from "@material-ui/icons/StarBorder";
// import StarIcon from '@material-ui/icons/Star';
import Map from './Map';

const useStyles = makeStyles({
  card: {
    maxWidth: 1000
  },
  media: {
    width: 1000,
    height: 540
  }
});

function numberWithCommas(x) {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

const token = "AIzaSyBiQTjyuueWdiMNAI08m1rxAD5F2v5PBw4";

export default function HouseCard(props) {
    const classes = useStyles();
    const { home_type, year_built, sqft, lot_size, total_rooms, bedrooms, bathrooms, street_address, city, state, zip_code, sold_price, sold_date, link_to, lat, long } = props.home
    //  console.log(`https://maps.googleapis.com/maps/api/streetview?size=1200x1200&fov=60&location=${street_address.split(' ').join('+')},${city.split(' ').join('+')},${state.split(' ').join('+')}&key=${token}`)
    return (
      <div className="house-card">
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={classes.media}
              image={`https://maps.googleapis.com/maps/api/streetview?size=1200x1200&fov=60&location=${street_address.split(' ').join('+')},${city.split(' ').join('+')},${state.split(' ').join('+')}&key=${token}`}
              title="House Info"
            />
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              <StarBorderIcon
                className="star-home-overlay"
                style={{ fontSize: 50 }}
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {street_address}, {city}, {state} {zip_code}
              </Typography>
              <div className="main">
                <Map
                  lat={lat}
                  long={long}
                />
                <div className="home-info">
                  <div className="left">
                    <h1>Home Info</h1>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="span"
                    >
                      <p>
                        <strong>Home Type:</strong> {home_type || "N/A"}
                      </p>
                      <p>
                        <strong>Year Built:</strong> {year_built || "N/A"}
                      </p>
                      <p>
                        <strong>Size:</strong> {sqft ? numberWithCommas(sqft) + " /sqft" : "N/A"}
                      </p>
                      <p>
                        <strong>Lot Size:</strong>{" "}
                        {lot_size ? numberWithCommas(lot_size) + " /sqft" : "N/A"}
                      </p>
                      <p>
                        <strong>Total Rooms:</strong> {total_rooms || "N/A"}
                      </p>
                      <p>
                        <strong>Bedrooms:</strong> {bedrooms || "N/A"}
                      </p>
                      <p>
                        <strong>Bathrooms:</strong> {bathrooms || "N/A"}
                      </p>
                    </Typography>
                  </div>
                  <div className="right">
                    <h1>Status</h1>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="span"
                    >
                      <p>
                        <strong>Last Sold Date:</strong> {sold_date || "N/A"}
                      </p>
                      <p>
                        <strong>Last Sold Price:</strong>{" "}
                        {sold_price ? "$" + numberWithCommas(sold_price) : "N/A"}
                      </p>
                    </Typography>
                    <h1>Amenities</h1>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="span"
                    >
                      <p>
                        <strong>Garage:</strong> N/A
                      </p>
                      <p>
                        <strong>Parking:</strong> N/A
                      </p>
                      <p>
                        <strong>Heating:</strong> N/A
                      </p>
                      <p>
                        <strong>Air Conditioning:</strong> N/A
                      </p>
                      <p>
                        <strong>Pool:</strong> N/A
                      </p>
                      <p>
                        <strong>Fireplace:</strong> N/A
                      </p>
                      <p>
                        <strong>Washer/Dryer:</strong> N/A
                      </p>
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions className="house-actions">
            <Button size="small" color="primary" href={link_to}>
              View on Zillow
            </Button>
            <Button size="small" color="primary">
              Remove this Estimate
            </Button>
            <Button size="small" color="primary">
              <StarBorderIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    );
}
