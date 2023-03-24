exports.check_data = (req, res, next) => {
  console.log(req.session.user.user_id);
  console.log(req.query.purchased_id);
  console.log(req.query.template_id);

    if(req.session.user.user_role == 'admin'){
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
