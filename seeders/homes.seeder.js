import { Seeder } from 'mongoose-data-seed';
import { Home } from '../models/homeModels';

const data = [
  {
    img: "./img/swezeytown.png",
    home_type: "Single Family",
    year_built: 1984,
    sqft: 3000,
    lot_size: 0.75,
    stories: 2,
    bedrooms: 4,
    bathrooms: 3,
    kitchens: 2,
    garage: 1,
    parking: "Driveway",
    pool: "Above Ground",
    fireplace: "None",
    ac: "None",
    heating: "Oil",
    washer_dryer: "Hookups",
    sold_date: "2014-12-01",
    forclosure: false,
    short_sale: false,
    street_number: "10",
    street_address: "North Swezeytown Road",
    city: "Middle Island",
    state: "NY",
    zip_code: "11953"
  }
];

class HomesSeeder extends Seeder {

  async shouldRun() {
    return Home.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Home.create(data);
  }
}

export default HomesSeeder;
