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
 
  let data_openTemplate = {}
  data_openTemplate.user_id = req.session.user.user_id;
  data_openTemplate.template_id = 'd7c17c2b-7198-48a2-85ab-4b360b70bd5b';

  let page = new Page(data_openTemplate);
  page.getTemplate().then((data_from_query_after_loadPage) => {

    if(data_from_query_after_loadPage.user_data){
      console.log(data_from_query_after_loadPage.user_data);
      var json_from_created_json_for_user = JSON.parse(data_from_query_after_loadPage.user_data[0].user_saved_template_onload);
      var user_json = data_from_query_after_loadPage.user_data[0].saved_json == '' ? '' : JSON.parse(data_from_query_after_loadPage.user_data[0].saved_json);
  
  
   
      let data_saveModifiedJson ={}
     
      //if walay luon ang saved_json mag error cja mag process so need jud na naay luon maong naay if statement
       //if naay luon ang saved_template na table sa user na save_json mo process sija
      if(data_from_query_after_loadPage.user_data[0].saved_json != ''){
        user_json.forEach(element => {
          let a = json_from_created_json_for_user.json.objects.filter((e)=>{
            return e.id == element.id
          })
          a[0].top = element.top;
          a[0].left = element.left;
        });
        //send to user_saved_template
      }
   
      data_saveModifiedJson.user_id = req.session.user.user_id;
      data_saveModifiedJson.template_id = 'd7c17c2b-7198-48a2-85ab-4b360b70bd5b';
      data_saveModifiedJson.json = data_from_query_after_loadPage.user_data[0].saved_json == '' ? data_from_query_after_loadPage.user_data[0].user_saved_template_onload :
      JSON.stringify(json_from_created_json_for_user) ;

  
  let page_onload = new Page(data_saveModifiedJson);
  page_onload.save_modify_data().then(()=>{

    let data_to_get_saved_data = {}
    data_to_get_saved_data.user_id = req.session.user.user_id;
    data_to_get_saved_data.template_id = 'd7c17c2b-7198-48a2-85ab-4b360b70bd5b';
  
    let get_saved_json_load = new Page(data_to_get_saved_data);
  
    get_saved_json_load.get_saved_modified_data().then((data)=>{
        res.render("pages/canvas", {
          template_json:data[0].user_saved_template_onload,
          template_id:'d7c17c2b-7198-48a2-85ab-4b360b70bd5b',
        });
    
    })
    
  })
    }else{
            //create a copy of original template
        data_openTemplate.user_saved_template_onload = data_from_query_after_loadPage.admin_data[0].json_file 
 
      let create_page = new Page(data_openTemplate)
      create_page.create_template_copy().then(()=>{
        res.render("pages/canvas", {
          template_json:data_from_query_after_loadPage.admin_data[0].json_file,
          template_id:data_from_query_after_loadPage.template_id,
        });
      })
 
  
    }
    
    

 
   
  });
};
