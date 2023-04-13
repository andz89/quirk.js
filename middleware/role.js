exports.role_admin = (req, res, next) => {
  let role = "admin";
  if ( req.session.user && role ==   req.session.user.user_role) {
 
    next();
  } else {
    res.redirect("/admin-login");
  }
};
exports.role_user = (req, res, next) => {
 
  if(!req.session.passport.user.id){
   
    res.redirect("/login-page");
    return false;
  }
  if (req.session.passport.user.id &&    req.session.user_role == "user") {
   
    next();
  }else {
   
    res.redirect("/dashboard");
   
  }
};
exports.canvas_role = (req, res,next) => {

  if ( req.session.passport.user.id &&    req.session.user_role == "user" ||  req.session.passport.user.id &&   req.session.passport.user.id_role == "admin") {

    next();
  }else {
   
    res.redirect("/login-page");
   
  }
};
exports.role_guest = (req, res, next) => {
  if ( req.session.passport  &&   req.session.user_role == "user") {
    next();
  }
 
  else {
    next();
  }
};
exports.home_role = (req, res, next) => {
  if(!req.session.passport){
    
    res.render("pages/landing-page");
    return false;
  }
  if (req.session.passport.user.id &&   req.session.user_role == "user") {
    next();
  }else{
    res.redirect('/dashboard');
  }
  
 
};
