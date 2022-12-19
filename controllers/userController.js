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

exports.logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
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
      req.flash("regErrors", data.error);

      req.flash("users_data", data.user);
      req.session.save(function (err) {
        res.redirect("/register_page");
      });
    });
};
exports.update_account = function (req, res) {
  const user_name = req.query.user_name;
  const user_email = req.query.user_email;
  let user = new User(user_name);
  user.update_account().then(function () {
    console.log("successfully");
  });
  // if (user_name === req.session.user.user_name) {
  //   console.log("matching user");
  // }
};
