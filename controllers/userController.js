const User = require("../models/User");

exports.login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then((data) => {

      req.session.user = {
        user_id: data[0].user_id,
        user_email: data[0].user_email,
        user_role: "user",
      };
      req.session.save(function (err) {
        res.redirect("/");
      });
    })
    .catch((data) => {
      req.flash("errors", "Invalid username or password");
      req.flash("users_data", data);
     
      req.session.save(function () {
        res.redirect("/login-page");
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
  data.user_name = req.query.user_name;
  data.user_email = req.query.user_email;
  data.user_id = req.session.user.user_id;
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
  let data = {};
  data.saved_json = req.query.saved_json;
  data.user_id = req.session.user.user_id;
  data.template_id =  req.query.template_id;
  data.user_role =  req.session.user.user_role;

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

  let template = {}
  template.user_id = req.session.user.user_id;
  template.template_id = req.query.template_id;
  template.template_name = req.query.template_name;
  template.image = req.query.image;
  template.code = req.query.code;

  let user = new User(template);
  user.new_template().then(function (data)   {
   
    if(data[0] === 'SUCCESS'){
      let count_msg;
      if(data[1] === 0){
        count_msg = `You already activated ${data[2]} templates`
      }else{
        count_msg = `You have ${data[1]} template/s to add.`
      }
      req.flash("success_message", ` ${req.query.template_name}. <br> ${count_msg}`);
      res.send(data[0]);

    }else{
      res.send(data);
    }
  
 
   
  })
}
exports.resetCanvas = (req,res) => {
  let data = {}
  data.user_id = req.session.user.user_id;
  data.template_id = req.query.template_id;
 
  let user = new User(data);
  user.reset_canvas().then(()=>{
    res.json('success');
  })
}
exports.saveList = (req, res)=>{
  let data = {};
  data.list = req.query.list_data
  data.user_id = req.session.user.user_id;
  data.user_role = req.session.user.user_role;

  let user = new User(data);
user.update_list().then(()=>{
  res.json('ok');
})
}