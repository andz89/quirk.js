const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();


exports.profile = (req,res)=>{
  console.log(req.session);
  // 6520108334688305
  res.render("users/profile", {
    user:req.session.passport.user.displayName
  });
}
exports.login = (req, res) => {
let data = {}
  data.user_name = req.session.passport.user.displayName;
  data.user_id = req.session.passport.user.id;
 req.session.passport.user_role = 'user'
     let user = new User(data);
  user.login().then(()=>{
      req.session.save(function (err) {
      res.redirect("pages/home-dashboard" );
      });
  })
  
};

exports.logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
 
};

exports.register = (req, res) => {
  let user = new User(req.body);
  setTimeout(() => {
    user
      .register()
      .then(() => {
        req.flash("success_message", "You have successfully registered");
        req.session.success = true;
        req.session.temp = {
          user_name: req.body.user_name,
          user_email: req.body.user_email,
        };
        req.session.save(function (err) {
          res.redirect("/success_registration_page");
        });
      })
      .catch((data) => {
    
        req.flash("regErrors", data.error);

        req.flash("users_data", data.user);
        req.session.save(function (err) {
          res.redirect("/register-page");
        });
      });
  }, 1000);
};

exports.update_account = function (req, res) {
  let data = {};
 
  data.user_email = req.query.user_email;
  data.user_id = req.session.passport.user.id;
  let user = new User(data);
  user
    .update_account()
    .then(function () {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.saved_template = function (req, res) {
  console.log(req.session.admin.user_id);
  let data = {};
  data.saved_json =  res.text_input;
  data.user_id = req.session.passport  ? req.session.passport.user.id : req.session.admin.user_id;
  data.template_id =  req.query.template_id;
  data.purchased_id =  req.query.purchased_id;
  data.user_role =   req.session.passport ? req.session.passport.user_role : req.session.admin.user_role;

  let user = new User(data);
  user
    .saved_template_database()
    .then(function () {
      res.json('ok');
    })
    .catch((err) => {
      res.json('error');
    });
};
exports.activateCanvas = (req,res) => {
   
  if(!req.session.passport || !req.session.passport.user.id){
    
    res.redirect('/');
    return false;
  }
  let template = {}
  template.user_id = req.session.passport.user.id;
  template.template_id = req.query.template_id;
  template.category = req.query.category;

  template.template_name = req.query.template_name;

  
  let user = new User(template);
  user.duplicate_template().then(function ()   {

      req.flash("success_message", ` ${req.query.template_name}. `);
      res.send('true');


    
   
  }).catch((data)=>{
      console.log(data);
    res.send(data);
  })
}
exports.submit_code = (req,res) => {
 
    let code = {}
    code.user_id = req.session.passport.user.id;
 
    code.user_name = req.session.passport.user.displayName;

    code.code = req.query.code;

  let user = new User(code);
  user.check_code().then(function () {
      req.flash("success_message_subscriber", 'true');
      res.send('true');
  }).catch((data)=>{
    res.send(data);
  })
}
exports.resetCanvas = (req,res) => {
  let data = {}
  data.user_id = req.session.passport.user.id;
  data.template_id = req.query.template_id;
 
  let user = new User(data);
  user.reset_canvas().then(()=>{
    res.json('success');
  })
}
exports.saveList = (req, res)=>{
  let data = {};
  data.list = req.query.list_data
  data.user_id = req.session.passport.user.id;
  data.user_role =  req.session.passport.user_role;

  let user = new User(data);
user.update_list().then(()=>{
  res.json('ok');
})
}

//query to get the link of an image
exports.getAllBackgroundImage = (req, res)=>{
  let user = new User();
user.get_all_backgrounds_image().then((data)=>{
  res.json(data);
})
}

exports.deleteTemplate = (req, res) => {
  let data = {}
  data.template_id = req.query.template_id;
  data.purchased_id = req.query.purchased_id;
  data.user_id = req.session.passport.user.id;
  
  let user = new User(data);
  user.delete_template().then(function (data) {
  
    if(data == 'true'){
     
    
      res.send('true');

    }else{
      res.send('false');
    }
  
 
   
  })
}

exports.userUploadImg = (req, res)=>{
  let data = {}
  data.user_id = req.session.passport.user.id;
  data.user_role =   req.session.passport.user_role;

  data.new_path = res.new_path;
  data.purchased_id = req.query.purchased_id;
  data.template_id = req.query.template_id;
  data.template_id = req.query.template_id;
 
 
 
  let user_img = new User(data)
  user_img.upload_user_img() 
 
  
}
exports.checkUploadedImages = (req, res,next) =>{
  console.log( req.session.passport.user_role);
  if( req.session.passport.user_role == 'admin'){
    next();
   
  }else{
    let data = {}
    data.user_id = req.session.passport.user.id;
  
    let user = new User(data);
    user.checkUploadedImages().then((data)=>{
      
      if(data == 'true'){
       
        next();
      }else{
        res.send(data);
      }
    })
  }
 
}
exports.getUserImage = (req, res)=>{
  let data = {}
  data.user_id =req.session.admin ? req.session.admin.user_id: req.session.passport.user.id;
 

  let user_img = new User(data)
  user_img.get_user_image().then((data) => {
    res.send(data)
  })
}
exports.getUserImageToCanvas = (req, res)=>{
  let data = {}
  data.image_path = req.query.id;
 

  let user_img = new User(data)
  user_img.get_user_image_toCanvas().then((data) => {
    res.send(data)
  })
}
exports.deleteUserImage = (req, res)=>{
  let data = {}
  data.image_path = req.query.id;
 

  let user_img = new User(data)
  user_img.delete_user_image().then((data) => {
    res.json('ok')
  })
}

