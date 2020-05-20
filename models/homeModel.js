var mongoose = require("mongoose");

var homeSchema = mongoose.Schema({
  img: String,
  home_type: String,
  year_built: Number,
  sqft: Number,
  lot_size: Number,
  stories: Number,
  bedrooms: Number,
  bathrooms: Number,
  kitchens: Number,
  garage: Number,
  parking: String,
  pool: String,
  fireplace: String,
  ac: String,
  heating: String,
  washer_dryer: String,
  sold_date: String,
  forclosure: Boolean,
  short_sale: Boolean,
  street_number: String,
  street_address: String,
  city: String,
  state: String,
  zip_code: String
});

var Home = (module.exports = mongoose.model("home", homeSchema));

module.exports.get = function(cb, limit) {
  Home.find(cb).limit(limit);
};
