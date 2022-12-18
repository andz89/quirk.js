const User = require("../models/User");

exports.login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then((data) => {
      req.session.user = {
        user_email: data[0].user_email,
        user_name: data[0].user_name,
      };
      req.session.save(function (err) {
        res.redirect("/");
      });
    })
    .catch((user_data) => {
      req.flash("errors", "Invalid username or password");
      req.flash("data", user_data);

      req.session.save(function () {
        res.redirect("/login_page");
      });
    });
};
exports.login_page = (req, res) => {
  res.render("users/login_page", {
    errors: req.flash("errors"),
    user_data: req.flash("data"),
    user_name: req.session.user,
  });
};
exports.logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
exports.home = (req, res) => {
  if (req.session.user) {
    res.render("pages/home-dashboard", {
      user_name: req.session.user.user_name,
    });
  } else {
    res.render("pages/landing_page", { user_name: req.session.user });
  }
};

exports.register = (req, res) => {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      req.session.user = {
        user_name: user.data.user_name,
      };
      res.redirect("/");
    })
    .catch((data) => {
      // req.flash("errors", "Invalid username or password");
      req.flash("regErrors", data.error);

      req.flash("users_data", data.user);
      req.session.save(function (err) {
        res.redirect("/register_page");
      });
    });
};

exports.register_page = (req, res) => {
  res.render("users/register_page", {
    regErrors: req.flash("regErrors"),
    users_data: req.flash("users_data"),
    user_name: req.session.user, //for header fields
  });
};

exports.contact_page = (req, res) => {
  res.render("pages/contact_page", {
    user_name: req.session.user, //for header fields
  });
};
exports.account_page = (req, res) => {
  if (req.session.user) {
    res.render("pages/account_page", {
      user_name: req.session.user, //for header fields
    });
  } else {
    res.redirect("/");
  }
};
