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
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("errors", "Invalid username or password");
      res.redirect("/");
    });
};
exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};
exports.home = (req, res) => {
  if (req.session.user) {
    res.render("home-dashboard", { user_name: req.session.user.user_name });
  } else {
    res.render("home-guest", {
      errors: req.flash("errors"),
      regErrors: req.flash("regErrors"),
    });
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
    .catch((regErrors) => {
      //   regErrors.forEach((error) => {
      //     req.flash("regErrors", error);
      //   });

      req.flash("regErrors", regErrors);
      res.redirect("/");
    });
};
