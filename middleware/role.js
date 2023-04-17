exports.role_admin = (req, res, next) => {
  let role = "admin";
  if ( req.session.admin  &&   req.session.admin.user_role == "admin") {
 
    next();
  } else {
    res.redirect("/admin-login");
  }
};
exports.role_user = (req, res, next) => {
 
  if (req.session.passport  &&   req.session.passport.user.id) {
     
    next();
  }else {
  
   if(req.session.admin){
    res.redirect("/dashboard");

   }else{
    res.redirect("/");

   }
   
  }
};
exports.canvas_role = (req, res,next) => {
 
  if (req.session.passport  &&   req.session.passport.user.id ||  req.session.admin  &&   req.session.admin.user_role == "admin") {

    next();
  }else {
   
    res.redirect("/");
   
  }
};
exports.role_guest = (req, res, next) => {
  if (req.session.passport) {//true
 
    res.redirect("/");
  }
 else if(req.session.admin){//true
  res.redirect("/dashboard");

 }
else{
  next();
}
 
};
 
