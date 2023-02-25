const Admin = require("../models/Admin");
const User = require("../models/User");
const Page = require("../models/Page");
exports.dashboard = (req, res) => {
  res.render("admin/dashboard", {
    data: "you are logged as admin",
  });
};
exports.admin_login_post = (req, res) => {
  let user = new User(req.body);

  user
    .admin_login()
    .then((data) => {
      req.session.user = {
        user_id: data[0].id,
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
};
exports.login_page = (req, res) => {
  res.render("admin/admin-login", {
    errors: req.flash("errors"),
    users_data: req.flash("users_data"),
  });
};
exports.templates = (req, res) => {


  let templates = new Page()
templates.getAllTemplates().then((data)=>{
;
  res.render("admin/admin-templates", {
    data: data,
    user_type: req.session.user.user_role,
    session: req.session.user ? true : false,
  }); 
})
  
};
exports.background = (req, res) => {


  let templates = new Page()
// templates.getAllBackgrounds().then((data)=>{
;
  res.render("admin/admin-background", {
 
    user_type: req.session.user.user_role,
    session: req.session.user ? true : false,
  }); 
// })
  
};
exports.add_template = function (req, res) {

  req.body.file = req.file.filename
  let admin = new Admin(req.body);
  admin
    .add_template_into_database() //database
    .then(function () {
      // res.redirect("/admin-templates");
      res.redirect("/admin-templates");
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.remove = function (req, res){
  
  let admin = new Admin();
  admin
    .remove() //database
    .then(function () {
      // res.redirect("/admin-templates");
      res.send('Deleted')
      
    })
    .catch((err) => {
      res.send(err);
    });
}

exports.updateTemplate = function (req, res){


  // let data = {};
 
  //   data.template_json = req.query.template_json;
  
  // data.template_name = req.query.template_title;
  // data.template_description = req.query.template_description;
  // data.template_id = req.query.template_id;

  // console.log(data);
  req.body.file = req.file.filename
  let admin = new Admin(req.body);
 
  admin
    .update_template()
    .then(function () {
      res.redirect('/admin-templates')
    })
    .catch((err) => {
      // res.json(err);
    });
}