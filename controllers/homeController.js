Home = require("../models/homeModel");

exports.index = function(req, res) {
  Home.get(function(err, homes) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Homes retrieved successfully",
      data: homes
    });
  });
};

exports.new = function(req, res) {
  var home = new Home();
  home.home_prefix = req.body.home_prefix
    ? req.body.home_prefix
    : home.home_prefix;
  home.first_name = req.body.first_name ? req.body.first_name : home.first_name;
  home.last_name = req.body.last_name ? req.body.last_name : home.last_name;
  home.phone_number = req.body.phone_number;
  home.city = req.body.city;
  home.state = req.body.state;
  home.professional = req.body.professional;
  home.email = req.body.email;
  home.password = req.body.password;

  home.save(function(err) {
    if (err) {
      res.json(err);
    }
    res.json({
      message: "New home created!",
      data: home
    });
  });
};

exports.view = function(req, res) {
  Home.findById(req.params.home_id, function(err, home) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: "home details loading...",
      data: home
    });
  });
};

exports.update = function(req, res) {
  Home.findById(req.params.home_id, function(err, home) {
    if (err) {
      res.send(err);
    }
    home.home_prefix = req.body.home_prefix
      ? req.body.home_prefix
      : home.home_prefix;
    home.first_name = req.body.first_name
      ? req.body.first_name
      : home.first_name;
    home.last_name = req.body.last_name ? req.body.last_name : home.last_name;
    home.phone_number = req.body.phone_number;
    home.city = req.body.city;
    home.state = req.body.state;
    home.professional = req.body.professional;
    home.email = req.body.email;
    home.password = req.body.password;

    home.save(function(err) {
      if (err) {
        res.json(err);
      }
      res.json({
        message: "Home info updated",
        data: home
      });
    });
  });
};

exports.delete = function(req, res) {
  Home.remove({
    _id: req.params.home_id,
    function(err, home) {
      if (err) {
        res.send(err);
      }
      res.json({
        status: "success",
        message: "Home deleted"
      });
    }
  });
};
