const express = require("express");
const Buyer = require("../models/Buyer");
const Cart = require("../models/Cart");

const router = express.Router();

//add buyer and create cart
router.post("/buyer", async (req, res, next) => {
  try{
    const buyer = await Buyer.create({ name: req.body.name });
    const cart = await Cart.create({ buyerId: buyer.id });
    return res.status(201).json(buyer);
  }catch(e){
    return res.status(400).json(e);
  }

});

//delete buyer
router.delete("/buyer", async (req, res, next) => {
  try{
    const id = +req.body.buyerId;
    const buyer = await Buyer.findByPk(id);
    const result = await buyer.destroy();
    return res.status(200).json(result);
  } catch (e){
    return res.status(400).json(e);
  }
});

//get all buyers
router.get("/buyer", async (req, res, next) => {
  try{
    const buyers = await Buyer.findAll();
    return res.status(201).json(buyers);
  } catch(e){
    return res.status(400).json(e);
  }
});

//get specific buyer
router.get("/buyer/:buyerId", async (req, res, next) => {
  try{
    const buyer = await Buyer.findAll({where: {id: req.params.buyerId}});
    return res.status(200).json(buyer[0]);
  } catch (e) {
    return res.status(400).json(e);
  }
});
module.exports = router;
