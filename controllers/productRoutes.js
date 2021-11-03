const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/product", async (req, res, next) => {
  const result = await Product.findAll();
  console.log(result);
  return res.status(201).json(result);
});

router.get("/product/:productId", async (req, res, next) => {
  const prodId = +req.params.productId;
  const result = await Product.findAll({
    where: {
      id: prodId,
    },
  });
  return res.status(201).json(result);
});

router.delete("/product", async (req, res, next) => {
  const prodId = +req.body.productId;
  const result = await Product.destroy({
    where: {
      id: prodId,
    },
  });
  return res.status(201).json(result);
});

module.exports = router;