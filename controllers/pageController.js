const Page = require("../models/Page");

exports.home = (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user.user_id);
    let page = new Page(req.session.user);
    page.getAccount().then((data) => {
      res.render("pages/home-dashboard", {
        user_data: data,
        session: req.session.user ? true : false,
      });
    });
  } else {
    res.render("pages/landing_page", {
      success_message: req.flash("success_message"),
    });
  }
};
exports.contact_page = (req, res) => {
  res.render("pages/contact_page", {
    session: req.session.user ? true : false,
  });
};
exports.account_page = (req, res) => {
  if (req.session.user) {
    let page = new Page(req.session.user);
    page.getAccount().then((data) => {
      res.render("pages/account_page", {
        user_data: data,
        session: req.session.user ? true : false,
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
  });
};
exports.login_page = (req, res) => {
  res.render("users/login_page", {
    errors: req.flash("errors"),
    users_data: req.flash("users_data"),
  });
};

exports.success_registration_page = function (req, res) {
  if (req.session.success == true) {
    req.session.success = null;

    function success_registration() {
      return new Promise((resolve, reject) => {
        res.render("pages/success_registration_page", {
          success_message: req.flash("success_message"),
          temp_data: req.session.temp,
        });

        resolve();
      });
    }

    success_registration().then(() => {
      req.session.destroy();
    });
  } else {
    res.redirect("/");
  }
};
