const Page = require("../models/Page");

exports.home = (req, res) => {
  if (req.session.user) {
    res.render("pages/home-dashboard", {
      user_name: req.session.user.user_name,
    });
  } else {
    res.render("pages/landing_page", { user_name: req.session.user });
  }
};
exports.contact_page = (req, res) => {
  res.render("pages/contact_page", {
    user_name: req.session.user, //for header fields
  });
};
exports.account_page = (req, res) => {
  if (req.session.user) {
    let page = new Page(req.session.user);
    page.getAccount().then((data) => {
      res.render("pages/account_page", {
        user_name: req.session.user, //for header fields
        account_data: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.register_page = (req, res) => {
  res.render("users/register_page", {
    regErrors: req.flash("regErrors"),
    users_data: req.flash("users_data"),
    user_name: req.session.user, //for header fields
  });
};
exports.login_page = (req, res) => {
  res.render("users/login_page", {
    errors: req.flash("errors"),
    user_data: req.flash("data"),
    user_name: req.session.user,
  });
};
