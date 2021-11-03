const express = require("express");
const Product = require("../models/product");
const Seller = require("../models/Seller");

const router = express.Router();

//add seller
router.post("/seller", async (req, res, next) => {
  const result = await Seller.create(req.body);
  return res.status(201).json(result);
});

//get all seller
router.get("/seller", async (req, res, next) => {
  const sellers = await Seller.findAll();
  return res.status(200).json(sellers);
});

//get all products of specific seller
router.get("/seller/:sellerId/product", async (req, res, next) => {
  const products = await Product.findAll({
    where: { sellerId: +req.params.sellerId }
  });
  return res.status(200).json(products);
});

//add seller product base on seller id and product info
router.post("/seller/:sellerId/product", async (req, res, next) => {
  const seller = await Seller.findAll({ where: { id: +req.params.sellerId } });
  const result = await seller[0].createProduct({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  });
  return res.status(201).json(result);
});

//edit a seller's product
router.patch("/seller/:sellerId/product", async (req, res, next) => {
  const sellerId = +req.params.sellerId;
  const prodId = +req.body.productId;
  const seller = await Seller.findAll({ where: { id: sellerId } });
  const product = await seller[0].getProducts({ where: { id: prodId } });
  product[0].name = req.body.name;
  product[0].price = req.body.price;
  product[0].imageUrl = req.body.imageUrl;
  product[0].description = req.body.description;
  const result = await product[0].save();

  return res.status(201).json(result);
});

//delete a seller's product
router.delete("/seller/:sellerId/product", async (req, res, next) => {
  try {
    const sellerId = +req.params.sellerId;
    const prodId = +req.body.productId;
    const seller = await Seller.findAll({ where: { id: sellerId } });
    const product = await seller[0].getProducts({ where: { id: prodId } });
    const result = await product[0].destroy();
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json(e);
  }
});


//delete seller
router.delete("/seller", async (req, res, next) => {
  const id = +req.body.sellerId;
  const seller = await Seller.findByPk(id);
  const result = await seller.destroy();
  return res.status(201).json(result);
});

module.exports = router;
