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
exports.canvas = (req, res) => {
 
  let data_0 = {}
  data_0.user_id = req.session.user.user_id;
  data_0.template_id = 'd7c17c2b-7198-48a2-85ab-4b360b70bd5b';

  let page = new Page(data_0);
  page.getTemplate().then((data) => {

    if(data.user_data){
      console.log(data.user_data);
      var copy_json = JSON.parse(data.user_data[0].user_saved_template_onload);
      var user_json = data.user_data[0].saved_json == '' ? '' : JSON.parse(data.user_data[0].saved_json);
  
  
   
      let data1 ={}
      if(data.user_data[0].saved_json != ''){//if naay luon
        user_json.forEach(element => {
              
          let a = copy_json.json.objects.filter((e)=>{
            return e.id == element.id
          })
          a[0].top = element.top;
          a[0].left = element.left;
        });
        //send to user_saved_template
      }
   
      data1.user_id = req.session.user.user_id;
      data1.template_id = 'd7c17c2b-7198-48a2-85ab-4b360b70bd5b';
      data1.json = data.user_data[0].saved_json == '' ? data.user_data[0].user_saved_template_onload : JSON.stringify(copy_json) ;
      //dri ang problema kay ang orginal maoy na save sa user save template na row
  
  let page_onload = new Page(data1);
  page_onload.save_modify_data().then(()=>{
    console.log('sdfsdfdsfs');
    let data_2 = {}
    data_2.user_id = req.session.user.user_id;
    data_2.template_id = 'd7c17c2b-7198-48a2-85ab-4b360b70bd5b';
  
    let get_saved_json_load = new Page(data_2);
  
    get_saved_json_load.get_saved_modified_data().then((data)=>{
        res.render("pages/canvas", {
          template_json:data[0].user_saved_template_onload,
          template_id:'d7c17c2b-7198-48a2-85ab-4b360b70bd5b',
        });
    
    })
    
  })
    }else{
      //create a copy of original template
        data_0.user_saved_template_onload = data.admin_data[0].json_file
      
      let create_page = new Page(data_0)
      create_page.create_template_copy().then(()=>{
        res.render("pages/canvas", {
          template_json:data.admin_data[0].json_file,
          template_id:data.template_id,
        });
      })
 
  
    }
    
    

 
   
  });
};
