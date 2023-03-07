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


  let templates = new Admin()
templates.getAllBackgrounds().then((data)=>{

  res.render("admin/admin-background", {
    data:data,
    user_type: req.session.user.user_role,
    session: req.session.user ? true : false,
  }); 
})
  
};

exports.addBackground = (req, res) => {
let thumbnail_image
let background_image

 req.files.thumbnail_image.forEach((e)=>{
  thumbnail_image = e.filename ;
 })

 req.files.background_image.forEach((e)=>{
  background_image = e.filename;
 })
 
 
  req.body.background_image =  background_image 
  req.body.thumbnail_image =  thumbnail_image 

  let bg = new Admin(req.body)

bg.add_background().then((data)=>{
  res.redirect("/admin-background");
 
})
  
};

exports.updateBackground = (req, res) => {
  // console.log(req.files);
// console.log(req.files);
  // if(req.files){
  
  //   // console.log(req.file.fieldname);
 
  //    }
  //    console.log(req.files);
  if(req.files){//if no photos updloaded
   
    let thumbnail_image
    let background_image
    
    if(req.files.thumbnail_image){
      req.files.thumbnail_image.forEach((e)=>{
        thumbnail_image = e.filename ;
       })
    }else{
      thumbnail_image = false;
    }


    if(req.files.background_image){
      req.files.background_image.forEach((e)=>{
        background_image = e.filename ;
       })
    }else{
      background_image = false;
    }
    

 
     
      req.body.background_image =  background_image 
      req.body.thumbnail_image =  thumbnail_image 
  }
  
 
    let bg = new Admin(req.body)
  
  bg.update_background().then((data)=>{
    res.redirect("/admin-background");
   
  })
    
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


 
 
  if(req.file ){//if no photos updloaded
   
    req.body.file = req.file.filename
  }
 
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