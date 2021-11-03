const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const sellerRoutes = require("./controllers/sellerRoutes");
const buyerRoutes = require("./controllers/buyerRoutes");
const cartRoutes = require("./controllers/cartRoutes");
const productRoutes = require("./controllers/productRoutes");
const orderRoutes = require("./controllers/orderRoutes");
const Product = require("./models/product");
const Seller = require("./models/Seller");
const Buyer = require("./models/buyer");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", cartRoutes);
app.use("/", sellerRoutes);
app.use("/", buyerRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);

Product.belongsTo(Seller, { constraints: true, onDelete: "CASCADE" });
Seller.hasMany(Product);
Buyer.hasOne(Cart);
Cart.belongsTo(Buyer, {
  foreignKey: 'buyerId'
});
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(Buyer);
Buyer.hasMany(Order);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);


sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

