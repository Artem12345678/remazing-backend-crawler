const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  asin: String,
  title: String,
  price: String,
  reviews: String,
  rating: String,
  firstListed: String
});

module.exports = mongoose.model("Product", productSchema);
