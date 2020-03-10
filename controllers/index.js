const Product = require("../models/Product");

const limit = parseInt(process.env.PER_PAGE, 10) || 25;

exports.getProducts = (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;

  Product.find({})
    .sort("title")
    .skip((page - 1) * limit)
    .limit(limit)
    .then(results => {
      res.json(results);
    });
};
