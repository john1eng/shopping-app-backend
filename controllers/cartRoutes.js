const express = require("express");
const Buyer = require("../models/Buyer");
const Cart = require("../models/Cart");
const CartItem = require("../models/cart-item");
const Order = require("../models/order");
const Product = require("../models/product");

const router = express.Router();

//add product to cart; if new product then quantity is 1, otherwise quanitity + oldQuanity
router.post("/buyer/:buyerId/cart", (req, res, next) => {
  const buyerId = +req.params.buyerId;
  const productId = +req.body.productId;
  let cartItem;
  let newQuantity = 1;

  CartItem.findAll({ where: { cartId: buyerId, productId: productId } }).then(
    (product) => {
      const productExist = product.length > 0;
      if (!productExist) {
        CartItem.create({
          quantity: newQuantity,
          productId: productId,
          cartId: buyerId,
        }).then((cartI) => (cartItem = cartI));
      } else {
        newQuantity += product[0].quantity++;
        CartItem.update(
          { quantity: newQuantity },
          {
            where: {
              cartId: buyerId,
              productId: productId,
            },
          }
        ).then((cartI) => (cartItem = cartI));
      }
    }
  );
  return res.status(201).json(cartItem);
});

//edit specific product quantity in cart
router.patch("/buyer/:buyerId/cart", async (req, res, next) => {
  const buyerId = +req.params.buyerId;
  const productId = +req.body.productId;
  const quantity = +req.body.quantity;
  let cartItem;
  if (quantity === 0) {
    cartItem = await CartItem.destroy({
      where: { cartId: buyerId, productId: productId },
    });
  }
  cartItem = await CartItem.update(
    { quantity: quantity },
    {
      where: {
        cartId: buyerId,
        productId: productId,
      },
    }
  );

  console.log(cartItem)
  return res.status(201).json(cartItem);
});

//delete a product in cart
router.delete("/buyer/:buyerId/cart", async (req, res, next) => {
  const buyerId = +req.params.buyerId;
  const prodId = +req.body.productId;
  const destroyCartItem = await CartItem.destroy({
    where: { cartId: buyerId, productId: prodId },
  });
  return res.status(201).json(destroyCartItem);
});

//get all products in cart
router.get("/buyer/:buyerId/cart", async (req, res, next) => {
  const cartId = +req.params.buyerId;
  const cartItems = await CartItem.findAll({ where: { cartId: cartId } });
  let products = await Promise.all(
    cartItems.map(
      async (item) =>
        await Product.findByPk(item.productId).then((i) => {
          return { ...i.dataValues, quantity: item.quantity };
        })
    )
  );
  return res.status(201).json(products);
});

//get all cart
router.get("/cart", async (req, res, next) => {
  const cart = await Cart.findAll();
  return res.status(201).json(cart);
});

module.exports = router;