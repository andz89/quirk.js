const Page = require("../models/Page");

exports.home = (req, res) => {
  //session as user
  res.render("pages/home-dashboard", {
    user_data: req.session.user,
    session: req.session.user ? true : false,
    user_type: req.session.user.user_role,
  });
};
exports.contact_page = (req, res) => {
  res.render("pages/contact_page", {
    session: req.session.user ? true : false,
    user_type: req.session.user.user_role,
  });
};
exports.account_page = (req, res) => {
  let page = new Page(req.session.user);
  page.getAccount().then((data) => {
    res.render("pages/account_page", {
      user_data: data,
      session: req.session.user ? true : false,
      user_type: req.session.user.user_role,
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

let templates = new Page()
templates.getAllTemplates().then((data)=>{
;
  res.render("pages/templates", {
    data: data,

    user_type: req.session.user.user_role,
    session: req.session.user ? true : false,
  }); 
})
  
}

exports.purchased_templates = function(req,res){
  let data = {}
  data.user_id = req.session.user.user_id;
 
  let purchased_templates = new Page(data)
  purchased_templates.getUserTemplates().then((data)=>{
  
 
    res.render("pages/purchased-templates", {
      success_message: req.flash("success_message"),
      data: data,
      user_type: req.session.user.user_role,
      session: req.session.user ? true : false,
    }); 
  })
}
 

exports.canvas =(req, res) =>{
   
  let data = {}
  data.user_role = req.session.user.user_role
  data.user_id = req.session.user.user_id;
  data.template_id = req.query.template_id;

  let page = new Page(data);
  page.getCanvas().then((data) => {
       

    res.render("pages/canvas", {
                template_json:data.template_json,
                template_id:data.template_id,
                template_name:data.template_name,
                thumbnail:'http://localhost:5000/images/ci/'+ data.thumbnail,
                canvas_image:'http://localhost:5000/images/ci/'+ data.canvas_image,
                list: data.list,
                user_role: req.session.user.user_role,
              });
          
          })
}