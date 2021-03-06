const express = require("express");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");

const router = express.Router();

//create order and orderitem from cart
router.post("/buyer/:buyerId/order", async (req, res, next) => {
    try{
        const buyerId = +req.params.buyerId;
        const cartItems = req.body;
        const totalPrice = cartItems.reduce((a,b)=>a + (b.quantity * b.price), 0 )
        const order = await Order.create({buyerId:buyerId, totalPrice:totalPrice});
        Promise.all(
          cartItems.map((item) =>
            OrderItem.create({
              orderId: order.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })
          )
        );
        return res.status(201).json(order);
    } catch (e) {
        return res.status(400).json(e);
    }
});

//get all order
router.get("/buyer/:buyerId/order", async (req, res, next) => {
    try{
        const buyerId = +req.params.buyerId;
        const order = await Order.findAll({where:{buyerId:buyerId}});
        return res.status(200).json(e);
    } catch (e){
        return res.status(400).json(order);
    }
})

//get order detail
router.get("/order/:orderId", async (req, res, next) => {
    try{
        const orderId = +req.params.orderId;
        const orderItems = await OrderItem.findAll({where:{orderId:orderId}})
        return res.status(200).json(orderItems);
    } catch (e){
        return res.status(400).json(e);
    }
});

module.exports = router;
