exports.dashboard = (req, res) => {
  res.render("admin/dashboard", {
    data: "you are logged as admin",
  });
};
const User = require("../models/User");

exports.admin_login = (req, res) => {
  let user = new User(req.body);
  setTimeout(() => {
    user
      .admin_login()
      .then((data) => {
        req.session.user = {
          user_name: data[0].admin_user_name,
          user_email: data[0].admin_user_email,
          user_role: data[0].admin_user_role,
        };
        req.session.save(function (err) {
          res.redirect("/dashboard");
        });
      })
      .catch((data) => {
        req.flash("errors", "Invalid username or password");
        req.flash("users_data", data);

        req.session.save(function () {
          res.redirect("/admin-login");
        });
      });
  }, 1000);
};
exports.login_page = (req, res) => {
  if (req.session.use && req.session.user.user_role == "admin") {
    // naay session tapos ang role is admin
    res.redirect("/dashboard");
  } else if (req.session.user && !req.session.user.user_role) {
    // naay session pero walay role na admin
    res.redirect("/");
  } else if (req.session.user) {
    res.redirect("/");
  } else {
    // walay session
    res.render("admin/admin-login", {
      errors: req.flash("errors"),
      users_data: req.flash("users_data"),
    });
  }
};
