const Page = require("../models/Page");

exports.home = (req, res) => {
  //session as user
 
  if(req.session.passport){
    res.render("pages/home-dashboard", {
      user:  req.session.passport.user.displayName,
      session:  req.session.passport ? true : false,
      user_type: req.session.passport.user_role,
    });
  }else{
    if(req.session.admin){
      res.redirect('/dashboard')
    }else{
      res.render("pages/landing-page");
    }
  
  }

};
exports.contact_page = (req, res) => {
  res.render("pages/contact_page", {
    session:  req.session.passport ? true : false,
    user_type: req.session.passport?    req.session.passport.user_role:null,
  });
};
exports.account_page = (req, res) => {
  let data = {}
  data.user_id = req.session.passport.user.id
  let page = new Page(data);
  page.getAccount().then((data) => {
    res.render("pages/account_page", {
      user_data: data,
      session:  req.session.passport ? true : false,
      user_type:    req.session.passport.user_role,
    });
  });
};
exports.register_page = (req, res) => {
  res.render("users/register-page", {
    regErrors: req.flash("regErrors"),
    users_data: req.flash("users_data"),
  });
};
exports.login_page = (req, res) => {

    res.render("users/login-page", {
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

exports.templates_page = (req, res) => {
  let data = {}
  data.user_role =req.session.admin ? req.session.admin.user_role :  'user';
  
let templates = new Page(data)
templates.getAllTemplates().then((data)=>{

  res.render("pages/templates", {

    data: data,
    success_message_subscriber: req.flash('success_message_subscriber'),
    session:  req.session.passport ? true : false,
    user_type: req.session.passport?    req.session.passport.user_role:null,
  }); 
})
  
}
exports.invitation = (req, res) => {
  let data = {}
  data.user_role =  req.session.passport.user_role;
 

  let page = new Page(data);
  page.getAllInviations().then(function (data) {
    res.render("pages/invitation", {
    success_message_subscriber: req.flash('success_message_subscriber'),

      data: data,
      user_type: req.session.passport.user_role,
      session:  req.session.passport ? true : false,
    }); 
 
   
  })
  
}
exports.purchased_templates = function(req,res){
  let data = {}
  data.user_id =  req.session.passport.user.id;
 
  let purchased_templates = new Page(data)
  purchased_templates.getUserTemplates().then((data)=>{
 
  
     
      res.render("pages/my-templates", {
      success_message: req.flash("success_message"),
 
        data: data.result,
        certificate_expired:data.certificate_expired,
        user_type:req.session.passport.user_role,
        session:  req.session.passport.user.id ? true : false,
      });
      
    
    
  })
}
exports.canvas =(req, res) =>{
  
  let data = {}
  data.user_role =   req.session.passport.user_role
  data.user_id =  req.session.passport.user.id;
  data.template_id = req.query.template_id;
  data.purchased_id = req.query.id;

  let page = new Page(data);
  page.getCanvas().then((data) => {
      
          
    if(data === 'expired'){
      res.redirect("/my-templates"); 
    }else{
      let image_name
      if(data.canvas_image){
        image_name = 'http://localhost:5000/images/ci/' + data.canvas_image
      }else{
        image_name = null

      }
      res.render("pages/canvas", {
        purchased_id:data.purchased_id,
      
        template_json:data.template_json,
        template_id:data.template_id,
        template_name:data.template_name,
        
        canvas_image:image_name,
        list: data.list,
        user_role:    req.session.passport.user_role,
      });
    }

          
          })
}
exports.canvasTest = (req, res) => {
  let data = {}
  data.user_role = req.session.admin? req.session.admin.user_role : 'user'
  data.user_id =req.session.passport ? req.session.passport.user.id: req.session.admin.user_id;
  data.template_id = req.query.template_id;
  data.category = req.query.category;

  data.purchased_id = req.query.id;

  let page = new Page(data);
  page.getCanvas().then((data) => {
      
    if(data === 'expired'){
      res.redirect("/my-templates"); 
    }else{
   
      res.render("pages/canvas-test", {
        purchased_id:data.purchased_id,
      
        template_json:data.template_json,
        template_id:data.template_id,
        template_name:data.template_name,
        table:data.table,
       
        list: data.list,
        user_role: req.session.passport ?  req.session.passport.user_role : req.session.admin.user_role,
      });
    }

          
          })
}