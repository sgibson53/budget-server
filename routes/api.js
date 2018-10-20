var express = require("express");
var router = express.Router();
var passport = require("passport");
var config = require("../config/database");
require("../config/passport")(passport);
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/Account");

router.get("/", function(req, res, next) {
  res.send("Express RESTful API");
});

router.post("/signup", (req, res) => {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  newUser.save(err => {
    if (err) {
      return res.json({ success: false, msg: "Username already exists." });
    }
    res.json({ success: true, msg: "Successful user creation." });
  });
});

router.post("/new-account", (req, res) => {
  const newAccount = new Account({
    name: req.body.name,
    amount: req.body.amount,
    user_id: req.body.user_id
  });

  newAccount.save(err => {
    if (err)
      return res.json({ success: false, msg: "Could not save account." });
    res.json({ success: true, msg: "Account successfully saved." });
  });
});

router.put("/edit-account/:id", (req, res) => {
  Account.findById(req.params.id, (err, account) => {
    if (err) res.json({ success: false, msg: "Account does not exist!" });

    const p = req.body;
    if (p.amount) account.amount = p.amount;
    if (p.name) account.name = p.name;

    account.save((err, updatedAccount) => {
      if (err) res.json({ success: false, msg: "Could not update account" });
      res.json({ success: true, account: updatedAccount });
    });
  });
});

router.delete("/delete-account/:id", (req, res) => {
  Account.findByIdAndDelete(req.params.id, () => {
    res.json({ success: true, msg: "Account deleted" });
  });
});

router.get("/accounts", (req, res) => {
  Account.find({}, (_, docs) => {
    res.send(docs);
  });
});

router.post("/signin", (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.sign(user.toJSON(), config.secret);
            res.json({ success: true, token: token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

module.exports = router;
