const express = require("express");
 
const router = express.Router();
const userController = require("../controllers/userController");
const random = require("../helper/random");
 
const check = require("../middleware/role");
 

const { v4: uuidv4 } = require("uuid");
 
const fs = require('fs')
let formidable = require('formidable');
const path = require('path')

//facebook
const passport = require('passport');
router.get('/home-dashboard',check.role_user,isLoggedIn, userController.login);
function isLoggedIn(req,res,next){
 
  if(req.isAuthenticated())
    return next();

    res.redirect('/')


}
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home-dashboard',
    failureRedirect: '/register-page',

  }),
 
);

 
  
//user action
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/update_account", userController.update_account);
 
router.post("/activateCertificate", check.role_user, userController.activateCertificate);
router.post("/activateInvitation", check.role_user, userController.activateInvitation);
router.post("/saveList", check.queryFromcanvas_role, userController.saveList);
router.post("/resetCanvas", check.role_user, userController.resetCanvas)
router.post("/get-all-background-image", check.queryFromcanvas_role, userController.getAllBackgroundImage);
router.post("/submit_code_certificate", check.role_user, userController.submit_code_certificate);
router.post("/delete_template", check.role_user, userController.deleteTemplate);
router.post("/get_user_image", check.queryFromcanvas_role, userController.getUserImage);
router.post("/get_user_image_toCanvas", check.queryFromcanvas_role, userController.getUserImageToCanvas);
router.post("/delete_user_image", check.queryFromcanvas_role, userController.deleteUserImage);

 
router.post("/saved-template",check.saveCanvas_role, function (req, res,next ){

 
 var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return;
    }


    // const fileInputValue = files.file_input.originalFilename ;

    // console.log(`Text Input Value: ${textInputValue}`);
    
    res.text_input = fields['text-input'];
    next()
  });
 


}, userController.saved_template );





router.post("/user_upload_img",check.saveCanvas_role, userController.checkUploadedImages,
//Process the file upload in Node
function (req, res,next){
 
  var form = new formidable.IncomingForm();
  form.parse(req, function (error, fields, file) {

    let filepath = file.input_img.filepath;
    let newpath = 'public/images/users/';
    
 
    let b = random.getString() + uuidv4() + path.extname(file.input_img.originalFilename)
    newpath += b

  
    try {
       //Copy the uploaded file to a custom folder
    fs.rename(filepath, newpath, function () {
   
      res.new_path = b
      res.json(b)
      res.end();
      next()
    //Send a NodeJS file upload confirmation message
 
  });
    
    } catch (error) {
      res.send('error')
    }
  
  });

}, userController.userUploadImg);



 

 
 

module.exports = router;
