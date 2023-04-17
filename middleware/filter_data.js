exports.check_data = (req, res, next) => {
 
    if( req.session.admin && req.session.admin.user_role == 'admin'){
 
      next()
    }else{
      if(req.session.passport && req.session.passport.user.id && req.query.purchased_id && req.query.template_id){
        
        next()
      }else{
      
        res.json('no-user')
      
      }
    }
 
    };
