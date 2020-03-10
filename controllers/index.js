const Product = require("../models/Product");

exports.getProducts = (req, res) => {
  Product.find({}).then(results => {
    res.json(results);
  });
};
