const User = require("../models/User");

exports.login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then((data) => {
      req.session.user = {
        email: data[0].email,
      };
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("errors", "wrong password or email");
      res.redirect("/");
    });
};
exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};
exports.home = (req, res) => {
  if (req.session.user) {
    res.render("home-dashboard", { email: req.session.user.email });
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
        email: user.data.email,
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
