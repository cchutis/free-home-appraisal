const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require("node-fetch");
const Zillow = require('node-zillow');
const app = express();

require('dotenv').config();

const zillow = new Zillow(process.env.ZILLOW_TOKEN);
const melissa_token = process.env.MELISSA_TOKEN;


let apiRoutes = require('./routes/api-routes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });
var db = mongoose.connection;
if(!db) {
    console.log("Error connecting to DB");
} else {
    console.log("DB connected successfully");
};

var port = process.env.PORT || 4000;
// Serve Static files from react
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/client/build/index.html')));

app.get('/estimates/:street_address/:city/:state/:zip', async (req, res) => {
    const parameters = {
        address: req.params.street_address,
        citystatezip: `${req.params.city}, ${req.params.state}`,
        rentzestimate: false
    }

    
    const street_address = req.params.street_address;
    const city = req.params.city;
    const state = convertRegion(req.params.state);
    const zip = req.params.zip;
    zillow.get('GetDeepSearchResults', parameters)
    .then(data => {
        zillow_data = data.response.results.result[0];
        return zillow_data;
    })
    .catch(err => console.log(err));

    const realtor_id_url = `https://realtor.p.rapidapi.com/locations/auto-complete?input=${street_address}%20${city}%20${state}`;
    const realtor_id_res = await fetch(realtor_id_url, {
        method: 'GET',
        headers: {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": process.env.X_RAPID_API_KEY
        }
    });
    const realtor_id_data = await realtor_id_res.json();
    const realtor_id = realtor_id_data.autocomplete[0].mpr_id;

    const realtor_data_url = `https://realtor.p.rapidapi.com/properties/detail?listing_id=${realtor_id}&prop_status=for_sale&property_id=${realtor_id}`;
    const realtor_data_res = await fetch(realtor_data_url, {
        method: 'GET',
        headers: {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": process.env.X_RAPID_API_KEY
        }
    });
    const realtor_home_data = await realtor_data_res.json();

    const melissa_url = `https://property.melissadata.net/v4/WEB/LookupProperty/?id=${melissa_token}&format=json&a1=${street_address}&city=${city}&state=${state}&cols=GrpEstimatedValue`;
    const melissa_res = await fetch(melissa_url);
    const melissa_data = await melissa_res.json();

    const mash_redfin_id_url = `https://mashvisor-api.p.rapidapi.com/property?zip_code=${zip}&address=${street_address}&city=${city}&state=${state}`;
    const mash_redfin_id_res = await fetch(mash_redfin_id_url, {
        method: 'GET',
        headers: {
            "x-rapidapi-host": "mashvisor-api.p.rapidapi.com",
            "x-rapidapi-key": process.env.X_RAPID_API_KEY
        }
    })
    const mash_redfin_id_data = await mash_redfin_id_res.json();
    const mash_redfin_id = mash_redfin_id_data.content.id;
    const redfin_link = mash_redfin_id_data.content.url; 

    const mash_redfin_data_url = `https://mashvisor-api.p.rapidapi.com/property/estimates/${mash_redfin_id}?state=${state}`;
    const mash_redfin_data_res = await fetch(mash_redfin_data_url, {
        method: 'GET',
        headers: {
            "x-rapidapi-host": "mashvisor-api.p.rapidapi.com",
            "x-rapidapi-key": process.env.X_RAPID_API_KEY
        }
    })
    const mash_redfin_data = await mash_redfin_data_res.json();
 

    const data = {
        zillow: zillow_data,
        realtor: {
            value: realtor_home_data.listing.price,
            link: realtor_home_data.listing.web_url,
            listing_id: realtor_id
        },
        melissa: {
            value: melissa_data.Records
        },
        redfin: {
            listing_id: mash_redfin_id,
            link: redfin_link,
            value: mash_redfin_data.content.redfin_estimate
        },
        mashvisor: {
            value: mash_redfin_data.content.mashvisor_estimate
        }
    }
    res.send(data);
    console.log(data)

})




function convertRegion(input) {
    var states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Marshall Islands', 'MH'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    for (state of states) {
        if (state[0] == input) {
            return (state[1]);
        }
    }
}



app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log("Running on Port " + port);
});
