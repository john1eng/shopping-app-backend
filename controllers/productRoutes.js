const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/product", async (req, res, next) => {
  try{
    const result = await Product.findAll();
    console.log(result);
    return res.status(200).json(result);
  } catch (e){
    return res.status(400).json(e);
  }
});

router.get("/product/:productId", async (req, res, next) => {
  try{
    const prodId = +req.params.productId;
    const result = await Product.findAll({
      where: {
        id: prodId,
      },
    });
    return res.status(200).json(result);
  } catch (e){
    return res.status(400).json(e);
  }
});

router.delete("/product", async (req, res, next) => {
  try{
    const prodId = +req.body.productId;
    const result = await Product.destroy({
      where: {
        id: prodId,
      },
    });
    return res.status(200).json(result);
  } catch (e) {
    return res.status(200).json(e);
  }
});

module.exports = router;