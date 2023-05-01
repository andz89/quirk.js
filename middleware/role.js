
const encrypt = require("../helper/encrypt");
 
//  let mode = 'development'
let mode = 'production'

exports.role_admin = (req, res, next) => {
  let role = "admin";
  if ( req.session.admin  &&   req.session.admin.user_role == "admin") {
 
    next();
  } else {
    res.redirect("/admin-login");
  }
};
exports.role_user = (req, res, next) => {
//   console.log(encrypt.encryptSessionData);
//  let b = encrypt.decryptSessionData(encrypt.encryptSessionData.encrypted,encrypt.encryptSessionData.key,encrypt.encryptSessionData.iv)
//  console.log(b)
  if (req.session.user  &&   req.session.user.user_id) {
     
    next();
  }else {
  
   if(req.session.admin){
    res.redirect("/dashboard");

   }else{
 
    res.redirect("/login-page");

   }
   
  }
};
exports.queryFromcanvas_role = (req, res,next) => {
  if(mode == 'development'){
    req.session.admin = {
      user_id: 'dsafe321',
      user_role:  'admin',
      
    };
  }
 
  if (req.session.user  &&   req.session.user.user_id ||  req.session.admin  &&   req.session.admin.user_role == "admin") {
  
    next();
  }else {
   
    res.redirect("/");
   
  }
};
exports.role_guest = (req, res, next) => {
  if (req.session.user) {//true
 
    res.redirect("/");
  }
 else if(req.session.admin){//true
  res.redirect("/dashboard");

 }
else{
 
  next();
}
 
};
 
exports.saveCanvas_role = (req, res, next) => {
  if(mode == 'development'){
    req.session.admin = {
      user_id: 'dsafe321',
      user_role:  'admin',
      
    };
  }
 
    if( req.session.admin && req.session.admin.user_role == 'admin'){
      console.log('admin user');
      next()
    }else{
      if(req.session.user && req.session.user.user_id && req.query.purchased_id && req.query.template_id){
        
        next()
      }else{
      
        res.json('no-user')
      
      }
    }
 
    };
 