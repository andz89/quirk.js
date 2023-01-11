exports.role_admin = (req, res, next) => {
  let role = "admin";
  if (req.session.user && role == req.session.user.user_role) {
    next();
  } else {
    res.redirect("/admin-login");
  }
};
exports.role_user = (req, res, next) => {
  if (
    (req.session.user && "user" == req.session.user.user_role) ||
    (req.session.user && "admin" == req.session.user.user_role)
  ) {
    next();
  } else {
    res.redirect("/login-page");
  }
};
exports.role_guest = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};
exports.home_role = (req, res, next) => {
  if (
    (req.session.user && "user" == req.session.user.user_role) ||
    (req.session.user && "admin" == req.session.user.user_role)
  ) {
    next();
  } else {
    res.render("pages/landing-page");
  }
};
