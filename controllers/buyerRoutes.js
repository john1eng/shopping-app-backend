const express = require("express");
const Buyer = require("../models/Buyer");
const Cart = require("../models/Cart");

const router = express.Router();

//add buyer and create cart
router.post("/buyer", async (req, res, next) => {
  const buyer = await Buyer.create({ name: req.body.name });
  const cart = await Cart.create({ buyerId: buyer.id });
  return res.status(201).json(buyer);
});

//delete buyer
router.delete("/buyer", async (req, res, next) => {
  const id = +req.body.buyerId;
  const buyer = await Buyer.findByPk(id);
  const result = await buyer.destroy();
  return res.status(201).json(result);
});

//get all buyers
router.get("/buyer", async (req, res, next) => {
  const buyers = await Buyer.findAll();
  return res.status(201).json(buyers);
});

//get specific buyer
router.get("/buyer/:buyerId", async (req, res, next) => {
  const buyer = await Buyer.findAll({where: {id: req.params.buyerId}});
  return res.status(201).json(buyer[0]);
});
module.exports = router;
