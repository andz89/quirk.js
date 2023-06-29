const encrypt = require("../helper/encrypt");
const dotenv = require("dotenv");

dotenv.config();
// let mode = "development";
let mode = "production";

exports.role_admin = (req, res, next) => {
  if (
    req.session.admin &&
    encrypt.decryptSessionData(req.session.admin.user_role) ==
      process.env.ADMIN_ROLE
  ) {
    next();
  } else {
    res.redirect("/admin-login");
  }
};
exports.role_user = (req, res, next) => {
  if (
    req.session.user &&
    req.session.user.user_id &&
    encrypt.decryptSessionData(req.session.user.user_role) ==
      process.env.USER_ROLE
  ) {
    next();
  } else {
    if (req.session.admin) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/login-page");
    }
  }
};
exports.queryFromcanvas_role = (req, res, next) => {
  if (mode == "development") {
    req.session.admin = {
      user_id: encrypt.encryptSessionData("dsafe321"),
      user_role: encrypt.encryptSessionData(process.env.ADMIN_ROLE),
    };

    req.query.template_id = "232e065e-5f06-47be-bec4-606e15eae65d";
  }

  if (
    req.session.user &&
    req.session.user.user_id &&
    encrypt.decryptSessionData(req.session.user.user_role) ==
      process.env.USER_ROLE
  ) {
    next();
  } else if (
    req.session.admin &&
    encrypt.decryptSessionData(req.session.admin.user_role) ==
      process.env.ADMIN_ROLE
  ) {
    next();
  } else {
    res.redirect("/");
  }
};
exports.role_guest = (req, res, next) => {
  if (req.session.user) {
    //true

    res.redirect("/");
  } else if (req.session.admin) {
    //true
    res.redirect("/dashboard");
  } else {
    next();
  }
};

exports.saveCanvas_role = (req, res, next) => {
  if (mode == "development") {
    req.session.admin = {
      user_id: "dsafe321",
      user_role: encrypt.encryptSessionData(process.env.ADMIN_ROLE),
    };
  }

  if (
    req.session.admin &&
    encrypt.decryptSessionData(req.session.admin.user_role) ==
      process.env.ADMIN_ROLE
  ) {
    next();
  } else {
    if (
      req.session.user &&
      req.session.user.user_id &&
      req.query.purchased_id &&
      req.query.template_id &&
      encrypt.decryptSessionData(req.session.user.user_role) ==
        process.env.USER_ROLE
    ) {
      next();
    } else {
      res.json("no-user");
    }
  }
};
