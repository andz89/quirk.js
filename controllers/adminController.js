exports.dashboard = (req, res) => {
  res.render("admin/dashboard", {
    data: "you are logged as admin",
  });
};
const User = require("../models/User");

exports.admin_login_post = (req, res) => {
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
  res.render("admin/admin-login", {
    errors: req.flash("errors"),
    users_data: req.flash("users_data"),
  });
};
exports.templates = (req, res) => {
  res.render("admin/admin-templates", {});
};
