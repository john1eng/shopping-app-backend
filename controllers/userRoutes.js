const express = require("express");
const User = require("../models/user");
const isAuth = require("../middlewares/is-auth");
const isBuyer = require("../middlewares/is-buyer");
const isSeller = require("../middlewares/is-seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const router = express.Router();

//create a user
router.post("/user/signup", async (req, res, next) => {
  let newUser;
  try {
    await bcrypt
      .hash(req.body.password, 12)
      .then((hashpwd) => {
        const user = User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashpwd,
          role: req.body.role,
        });
        return user;
      })
      .then((user) => {
        if (req.body.role === "buyer") {
          user.createBuyer({ name: user.name });
          console.log(user);
        }
        if (req.body.role === "seller") {
          user.createSeller({ name: user.name });
        }
        res.status(201).json(user);
      });
  } catch (e) {
    console.log(e);
    e.message = "Unable to create user";
    e.statusCode = 400;
    next(e);
  }
});

router.post("/user/signin", async (req, res, next) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    const user = await User.findAll({ where: { email: email } });
    
    await bcrypt.compare(password, user[0].password).then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
          {
              email: user[0].email,
              userId: user[0].id.toString(),
              userRole: user[0].role
          },
          'secret',
          {expiresIn: '1h'}
      )
      res.status(200).json({token: token, userId: user[0].id, userRole: user[0].role});
    });
  } catch (e) {
    next(e);
  }
});

//get all user
router.get("/user", isAuth, isSeller, async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (e) {
    e.statusCode = 400;
    e.message = "Unable to get user";
    next(e);
  }
});

module.exports = router;
