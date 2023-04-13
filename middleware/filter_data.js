exports.check_data = (req, res, next) => {
 
    if( req.session.user_role == 'admin'){
      console.log('ok');
      next()
    }else{
      if(req.session.user.user_id && req.query.purchased_id && req.query.template_id){
        console.log('ok');
        next()
      }else{
        console.log('error');
        res.json('error')
      
      }
    }
 
    };
