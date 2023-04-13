const Admin = require("../models/Admin");
const User = require("../models/User");
const Page = require("../models/Page");
const { v4: uuidv4 } = require("uuid");

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

  let data = {}
  data.user_role =  req.session.user_role;
  let templates = new Page(data)
templates.getAllTemplates().then((data)=>{
;
  res.render("admin/admin-templates", {
    data: data,
    user_type:  req.session.user_role,
    session: req.session.user ? true : false,
  }); 
})
  
};
exports.background = (req, res) => {


  let templates = new Admin()
templates.getAllBackgrounds().then((data)=>{

  res.render("admin/admin-background", {
    data:data,
    user_type:  req.session.user_role,
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
  console.log(bg);
  bg.update_background().then((data)=>{
    res.redirect("/admin-background");
   
  })
    
  };
exports.add_template = function (req, res) {
let thumbnail_image
let modal_image
 
console.log(modal_image);
if(req.files.thumbnail_image){
  req.files.thumbnail_image.forEach((e)=>{
    thumbnail_image = e.filename ;
   })
}else{
  thumbnail_image = false;
}

if(req.files.modal_image){
  req.files.modal_image.forEach((e)=>{
    modal_image = e.filename;
   })
   
}else{
  modal_image = false;

}
 
 
  req.body.thumbnail_image = thumbnail_image
  req.body.modal_image = modal_image
console.log(thumbnail_image);
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
let thumbnail_image
let modal_image

if(req.files.thumbnail_image){
  req.files.thumbnail_image.forEach((e)=>{
    thumbnail_image = e.filename ;
   })
}else{
  thumbnail_image = false
}

if(req.files.modal_image){
  req.files.modal_image.forEach((e)=>{
    modal_image = e.filename;
   })
   
}else{
  modal_image = false
}


 
  req.body.thumbnail_image = thumbnail_image
  req.body.modal_image = modal_image
  console.log(req.body);
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
exports.publish_update= function (req, res){
   
  let data = {

    template_id :req.query.template_id,
    published_status :req.query.published_status
  };
 
 

    let admin = new Admin(data);
    admin
      .publish_update()
      .then(function () {
        res.json('true')
      })
 
  }
exports.users = function (req, res){
  let users = new Admin()
 users.get_codes().then((data)=>{
  
  res.render("admin/admin-users", {
     data: data
  });
  })
    
 
}
exports.createCode = function (req, res){
  let code = uuidv4()
  req.body.duration = req.query.duration;
  req.body.note = req.query.note;
  req.body.limit = req.query.limit;
  req.body.code = code;
 
  let users = new Admin(req.body)
 users.create_code().then(()=>{
 res.send(code);
  
  })
    
 
}

exports.deleteCode = function (req, res){
 
 
  req.body.code = req.query.code;
 
 
  let users = new Admin(req.body)
 users.delete_code().then(()=>{
 res.send('true');
  
  })
    
 
}

exports.adminDeleteTemplate = (req, res) => {
 
  req.body.template_id = req.query.template_id;
 req.body.modal_image_path = req.query.modal_image_path;
 req.body.thumbnail_image_path = req.query.thumbnail_image_path;
 
  let admin = new Admin(req.body);
  admin.delete_template().then(function (data) {
  
    if(data == 'true'){
     
    
      res.send('true');

    }else{
      res.send('false');
    }
  
 
   
  })
}

exports.deleteBackground = (req, res) => {
 
  req.body.background_id = req.query.background_id;
  req.body.thumbnail_image_path = req.query.thumbnail_image_path;
  req.body.background_image_path = req.query.background_image_path;

  let admin = new Admin(req.body);
  admin.delete_background().then(function (data) {
  
    if(data == 'true'){
     
      res.send('true');

    }else{
      res.send('false');
    }
  
 
   
  })

}
