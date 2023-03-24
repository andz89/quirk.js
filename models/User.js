const bcrypt = require("bcryptjs");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");

const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)


let User = function (data) {
  this.data = data;
  this.errors_data = {};
};

User.prototype.cleanUp = function () {

  if (typeof this.data.user_name != "string") {
    this.data.user_name = "";
  }
  if (typeof this.data.user_email != "string") {
    this.data.user_email = "";
  }
  if (typeof this.data.user_password != "string") {
    this.data.user_password = "";
  }

  this.data = {
    user_name: this.data.user_name.trim().toLowerCase(),
    user_email: this.data.user_email.trim().toLowerCase(),
    user_password: this.data.user_password,
  };
};
User.prototype.validate = function () {
  return new Promise((resolve, reject) => {
    // if inputs are empty

    if (this.data.user_name === "") {
      //   this.errors.push("You must provide username.");
      this.errors_data.username = " *You must provide username. ";
    }
    if (
      this.data.user_name != "" &&
      !validator.isAlphanumeric(this.data.user_name)
    ) {
      //   this.errors.push("username can only contain numbers and letters.");
      this.errors_data.username =
        " *username can only contain numbers and letters. ";
    }
    if (!validator.isEmail(this.data.user_email)) {
      //   this.errors.push("You must provide a valid email address.");
      this.errors_data.email = " *You must provide a valid email address. ";
    }
    if (this.data.user_password === "") {
      //   this.errors.push("You must provide a password.");
      this.errors_data.password = " *You must provide a password. ";
    }

    //execute only if the id is true // user for registration only
    if (this.data.user_id === undefined) {
      // length of input password
      if (
        this.data.user_password.length > 0 &&
        this.data.user_password.length < 5
      ) {
        //   this.errors.push(
        //     "you must povide atleast 12 characters in your password"
        //   );
        this.errors_data.password = " *you must povide atleast 6 characters. ";
      }

      if (this.data.user_password.length > 30) {
        //   this.errors.push("Password cannot exceed 30 characters");
        this.errors_data.password = " *Password cannot exceed 30 characters ";
      }
    }
    // end ------------ execute only if the id is true // user for registration only

    // length of input username
    if (this.data.user_name.length > 0 && this.data.user_name.length < 3) {
      //   this.errors.push("you must povide atleast 3 characters in your username");
      this.errors_data.username = " *you must povide atleast 3 characters.";
    }
    if (this.data.user_name.length > 30) {
      //   this.errors.push("username cannot exceed 30 characters");
      this.errors_data.username = " *username cannot exceed 30 characters ";
    }

    const checkExistUsername = () => {
      if (this.data.user_id === true) {
        return new Promise((resolve, reject) => {
          let sql = `SELECT * FROM users WHERE user_name = "${this.data.user_name}"
           OR user_email = "${this.data.user_email}"`;
          db.query(sql, (err, result) => {
            if (err) {
              reject(err);
              return false;
            }
            resolve(result);
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          let sql = `SELECT * FROM users WHERE user_name = "${this.data.user_name}"
           OR user_email = "${this.data.user_email}"`;
          db.query(sql, (err, result) => {
            if (err) {
              reject(err);
              return false;
            }
            resolve(result);
          });
        });
      }
    };

    // Only if username and email is valid then check to see if it's already taken
    if (
      this.data.user_name.length > 2 &&
      this.data.user_name.length < 31 &&
      validator.isAlphanumeric(this.data.user_name)
    ) {
      checkExistUsername().then((result) => {
        if (result.length) {
          result.forEach((element) => {
            if (element.user_email === this.data.user_email) {
              if (element.user_id === this.data.user_id) {
              } else {
                this.errors_data.email = " *That email is already taken. ";
              }
            }
            if (element.user_name === this.data.user_name) {
              if (element.user_id === this.data.user_id) {
              } else {
                this.errors_data.username = "*That username is already taken.";
              }
            }

            resolve();
          });
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

User.prototype.login = function () {
  this.cleanUp();

  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM users WHERE user_email = "${this.data.user_email}"`;

    db.query(sql, (err, result) => {

      if (err) {
        reject(err);
        return false;
      }

      if (
        result.length &&
        bcrypt.compareSync(this.data.user_password, result[0].user_password)
      ) {
        resolve(result);
        
      } else {
        reject(this.data);
      }
    });
  });
};
User.prototype.admin_login = function () {
  this.cleanUp();

  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM admin_user WHERE admin_user_email = "${this.data.user_email}"`;

    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      if (
        result.length &&
        bcrypt.compareSync(this.data.user_password, result[0].password)
      ) {
        resolve(result);
      } else {
        reject(this.data);
      }
    });
  });
};

User.prototype.register = function () {

  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate();
    // uuidv4()


    if (Object.keys(this.errors_data).length === 0) {
      let salt = bcrypt.genSaltSync(10);
      this.data.user_password = bcrypt.hashSync(this.data.user_password, salt);
      let data = {
        user_id: uuidv4(),
        user_name: this.data.user_name,
        user_email: this.data.user_email,
        user_password: this.data.user_password,
      };
      let sql = "INSERT INTO users SET ?";
      db.query(sql, data, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }

        resolve();
      });
    } else {
      let data = {};
      data.error = this.errors_data;
      data.user = this.data;

      reject(data);
    }
  });
};
 
User.prototype.update_account = function () {
  return new Promise(async (resolve, reject) => {
    await this.validate();
    if (Object.keys(this.errors_data).length === 0) {
      var sql = `UPDATE users SET user_email = '${this.data.user_email}',user_name = '${this.data.user_name}' WHERE user_id = '${this.data.user_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result);
      });
    } else {
      reject(this.errors_data);
    }
  });
};


User.prototype.saved_template_database  =function() {

  return new Promise( async(resolve, reject) => {

    if(this.data.user_role === 'user'){
      var sql = `UPDATE purchased_template SET template_json = '${this.data.saved_json}' WHERE user_id = '${this.data.user_id}' && template_id = '${this.data.template_id}'&& purchased_id = '${this.data.purchased_id}'`;
      db.query(sql, (err, result) => {
  
      if (err) {
      reject(err);
      return false;
      }
      resolve(result);
      });
    }

    if(this.data.user_role === 'admin'){
      var sql = `UPDATE  templates SET template_json = '${this.data.saved_json}'  WHERE template_id = '${this.data.template_id}'`;
      db.query(sql, (err, result) => {
  
      if (err) {
      reject(err);
      return false;
      }
      resolve(result);
      });
    }

            
  });
};



//--------------------checking code, updating code and updating use start------------------------//
User.prototype.getUserTemplates = function() {
  return new Promise(async (resolve, reject) => {
   
          let sql = `SELECT * FROM purchased_template WHERE user_id = '${this.data.user_id}'` ;
        db.query(sql, (err, result) => {
        
          if (err) {
            reject(err);
            return false;
          }
          if(result.length > 0){
            this.data.current_template = result.length
          }else{
            this.data.current_template = 0
          }
        
          
          resolve();
        });

});
}

//update activation code details
User.prototype.update_user = function (count){
  
  return new Promise( (resolve, reject)=> {
    var sql = `UPDATE users SET  certificate_subscription = 'true' WHERE user_id = '${this.data.user_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
       
      resolve()
    });
  })

}
//update activation code details
User.prototype.update_code = function ( ){
 

  this.data.code_date = new Date().toLocaleString();//date code created

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + this.data.days_duration);
  let date_expired = tomorrow.toLocaleString()//date expiration

  return new Promise( (resolve, reject)=> {
    var sql = `UPDATE activation_code SET user_id = '${this.data.user_id}',user_email = '${this.data.user_email}', user_name = '${this.data.user_name}',date_purchased = '${this.data.code_date}',template_used=${this.data.current_template},date_expired= '${date_expired}',certificate_subscription = 'true' WHERE code = '${this.data.code}'`;
    db.query(sql,(err, result) => {
      if (err) {
        reject(err);
        return false;
      }
     
      resolve()
    });
  })

}
 
//check code and validate
User.prototype.check_code = function(){

  

  return new Promise((resolve, reject) => {
   
    let sql = `SELECT * FROM activation_code WHERE code = "${this.data.code}" && certificate_subscription = '' && user_id='' `;
    db.query(sql, async (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
     
      if(result.length > 0){
        this.data.days_duration =  result[0].days_duration
        await this.getUserTemplates()
               await this.update_code()
              resolve('true')
              
      }else{
        this.data.taken_message ='not found'
        resolve(this.data.taken_message)
      }
    



    });
 

});
}

//--------------------checking code, updating code and updating user end------------------------//





//update activation code details
User.prototype.create_template_copy = function (){
  
  return new Promise( (resolve, reject)=> {
   
    let sql = `SELECT * FROM templates WHERE template_id = "${this.data.template_id}"`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }


      this.data.copied_template  = {
        purchased_id: uuidv4(),
        user_id: this.data.user_id,
        template_id: result[0].template_id,
        template_name: result[0].template_name,
        template_description: result[0].template_description,
        template_json: result[0].template_json,
        template_category: result[0].template_category,
        canvas_image: result[0].canvas_image,
        thumbnail: result[0].thumbnail

      }
      resolve()
    });
  })

}

//update temlpate used 
User.prototype.updateActivationCode_template_used = function (){
  
  return new Promise( (resolve, reject)=> {
   
    let sql = `UPDATE activation_code SET  template_used = ${this.data.template_used_count}  WHERE user_id = "${this.data.user_id}" AND certificate_subscription = "true"`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
    

 
      resolve()
    });
  })

}

//check subscription and add 1 to template used count if not limit reach
User.prototype.check_template_subscription = function(){
  return new Promise( async (resolve, reject) => {
    let sql = `SELECT * FROM activation_code WHERE user_id = "${this.data.user_id}" AND certificate_subscription = "true"`;
    db.query(sql, async (err, result) => {
      if (err) {
        reject(err);
        return false;
      }  
      if (result.length > 0){
     
        if(this.data.current_template+ 1> result[0].template_limit){
          this.data.taken_message = 'limit-reach' 
          resolve()
        }else{
         
          this.data.certificate_subsription = true
          this.data.template_used_count =  this.data.current_template + 1
          resolve()
        }
   
      }else{
        this.data.certificate_subsription = false
        this.data.taken_message = 'Please subcribe!'
        resolve()
      }
     
    });
  })
}
User.prototype.duplicate_template =  function(){
  return new Promise( async (resolve, reject) => {
      await  this.getUserTemplates()
      await  this.check_template_subscription()
 
    if(this.data.certificate_subsription === true){
      await this.create_template_copy()//get a copy of selected template 
   
      let sql_2 = "INSERT INTO purchased_template SET ?";
      db.query(sql_2, this.data.copied_template,async (err, result) => {
      if (err) {
      reject(err);
      return false;
      }
      await this.updateActivationCode_template_used()
      resolve(this.data.certificate_subsription)
    
      });
    }else{

    resolve(this.data.taken_message)
    }
     
     })
}
 









//delete user template and update activation code
User.prototype.delete_template = function (req, res) {
  return new Promise( (resolve, reject) => {
   
    let sql = `DELETE FROM purchased_template WHERE template_id='${this.data.template_id}'&& purchased_id='${this.data.purchased_id}'&& user_id = '${this.data.user_id}'`;
    db.query(sql, async (err) => {
      if (err) {
        reject(err);
        return false;
      }
      
      await  this.getUserTemplates()
      this.data.template_used_count = this.data.current_template 
      await this.updateActivationCode_template_used()
      resolve('true');
    });
  });
}

//get activation code and minus 1 to template used count
User.prototype.getActivation_code = function(req, res) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM activation_code WHERE  certificate_subscription='true'&& user_id = '${this.data.user_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
    
      this.data.template_used_count = result[0].template_used - 1
      resolve(result);

    });
  });
}

//delete user template and update activation code






User.prototype.update_list = function (count){
 
  return new Promise( (resolve, reject)=> {
    if(this.data.user_role == 'user'){
      var sql = `UPDATE users SET  list = '${this.data.list}' WHERE user_id = '${this.data.user_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve()
    });
    }
    if(this.data.user_role == 'admin'){
      var sql = `UPDATE admin_user SET  list = '${this.data.list}' WHERE  id = '${this.data.user_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve()
      });
    }
  
  })

}







User.prototype.reset_canvas = function () {
  return new Promise( async (resolve, reject)=> {

    await this.create_template_copy()

   var sql = `UPDATE purchased_template SET template_json = '${this.data.copied_template.template_json}'  WHERE user_id = '${this.data.user_id}' && template_id = '${this.data.template_id}'`;
      db.query(sql, (err, result) => {
  
      if (err) {
      reject(err);
      return false;
      }
      resolve(result);
      });
  })
}

User.prototype.get_all_backgrounds_image = function(){
  return new Promise( (resolve, reject)=> {

    let sql = "SELECT * FROM background";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
   
      resolve(result)
    })

  })
}


 
User.prototype.upload_user_img = function (req, res){
 
  return new Promise(async (resolve, reject) => {
    this.data.date_uploaded = new Date().toLocaleString();//date code created
    let data = {

      upload_id: uuidv4(),
   
      user_id:this.data.user_id,
      image_path: this.data.new_path,
      purchased_id: this.data.purchased_id,
   
      date_uploaded: this.data.date_uploaded
    };
    let sql = "INSERT INTO user_image SET ?";
    db.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });

}
User.prototype.get_user_image = function(req, res) {
  return new Promise(async (resolve, reject) =>{
    let sql = `SELECT * FROM user_image WHERE user_id = "${this.data.user_id}"
 `;
   db.query(sql, (err, result) => {
     if (err) {
       reject(err);
       return false;
     }
     resolve(result);
   });
  })
}
User.prototype.get_user_image_toCanvas = function(req, res) {
  return new Promise(async (resolve, reject) =>{
    let sql = `SELECT * FROM user_image WHERE image_path = "${this.data.image_path}"
 `;
   db.query(sql, (err, result) => {
     if (err) {
       reject(err);
       return false;
     }
     resolve(result);
   });
  })
}

User.prototype.delete_user_image = function(req, res) {
  return new Promise( (resolve, reject) => {
   
    let sql = `DELETE FROM user_image WHERE image_path='${this.data.image_path}' `;
    db.query(sql, async (err) => {
      if (err) {
        reject(err);
        return false;
      }
      this.deleteImageBackground(this.data.image_path)
  
      resolve();
    });
  });
}
User.prototype.deleteImageBackground = async  function (data){
   

  if (Array.isArray(data)) {
    for(let i=0; i<data.length; i++){
   
      await  unlinkAsync('public/images/users/'+data[i])
    }
   
  } else {
    unlinkAsync('public/images/users/'+data)
  }
  

   
 
}
module.exports = User;
