const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  asin: String,
  title: String,
  price: Number,
  reviews: Number,
  rating: Number,
  firstListed: Date
});

module.exports = mongoose.model("Product", productSchema);
