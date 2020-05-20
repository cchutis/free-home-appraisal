User = require('../models/userModel');

exports.index = function(req, res) {
  User.get(function(err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users
    });
  });
};

exports.new = function(req, res) {
  var user = new User();
  user.user_prefix = req.body.user_prefix ? req.body.user_prefix : user.user_prefix;
  user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
  user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
  user.phone_number = req.body.phone_number;
  user.city = req.body.city;
  user.state = req.body.state;
  user.professional = req.body.professional;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(function(err) {
    if (err) {
      res.json(err);
    }
    res.json({
      message: "New user created!",
      data: user
    });
  });
};

exports.view = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: "User details loading...",
      data: user
    });
  });
};

exports.update = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    }
    user.user_prefix = req.body.user_prefix ? req.body.user_prefix : user.user_prefix;
    user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
    user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
    user.phone_number = req.body.phone_number;
    user.city = req.body.city;
    user.state = req.body.state;
    user.professional = req.body.professional;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err) {
        res.json(err);
      }
      res.json({
        message: "User info updated",
        data: user
      });
    });
  });
};

exports.delete = function(req, res) {
  User.remove({
    _id: req.params.user_id,
    function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json({
        status: "success",
        message: "User deleted"
      });
    }
  });
};