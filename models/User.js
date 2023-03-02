const bcrypt = require("bcryptjs");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");

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
// CONCAT('${this.data.user_email} +', old data here)

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
      var sql = `UPDATE purchased_template SET template_json = '${this.data.saved_json}'  WHERE user_id = '${this.data.user_id}' && template_id = '${this.data.template_id}'`;
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

//check code and validate
User.prototype.check_code = function(){
  return new Promise(async (resolve, reject) => {
 


    let sql = `SELECT * FROM activation_code WHERE code = "${this.data.code}" `;
    db.query(sql,  (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      if(result.length > 0){

          if(result[0].count < result[0].templates_limit){
              if( result[0].user_id == ''){
                this.data.count  = result[0].count + 1
                this.data.limit = result[0].templates_limit
              resolve(result)
              }
              else if(result[0].user_id && result[0].user_id == this.data.user_id){
                this.data.count  = result[0].count + 1
                this.data.limit = result[0].templates_limit
              resolve(result)
              }  else{
              this.data.taken_message ='code is already taken by other user'
              resolve()
              }
          }else if(result[0].user_id && result[0].user_id == this.data.user_id){
          //kung over na sa limit ang user nagpalit
            this.data.taken_message =`you already used your ${result[0].templates_limit} powers`
            resolve()
          }else{
            //kung ang nag gamit sa code lain user tapos over na sa limit
            this.data.taken_message ='code is already taken by other user'
            resolve()
          }
       
      }else{
        this.data.taken_message ='not found'
        resolve()
      }
    



    });
 

});
}
//update activation code details
User.prototype.update_code = function (count){
  
  return new Promise( (resolve, reject)=> {
    var sql = `UPDATE activation_code SET user_id = '${this.data.user_id}', count = ${count} WHERE code = '${this.data.code}'`;
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
User.prototype.create_template_copy = function (){
  
  return new Promise( (resolve, reject)=> {
   
    let sql = `SELECT * FROM templates WHERE template_id = "${this.data.template_id}"`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }


      this.data.copied_template  = {
        user_id: this.data.user_id,
        template_id: result[0].template_id,
        template_name: result[0].template_name,
        template_description: result[0].template_description,
        template_json: result[0].template_json,
        template_category: result[0].template_category,
        canvas_image: result[0].canvas_image,


      }
      resolve()
    });
  })

}

User.prototype.new_template =  function(){
  return new Promise( async (resolve, reject) => {
  
   
    await  this.check_code()
    if(!this.data.taken_message){

    await this.update_code(this.data.count)
    await this.create_template_copy()

    let sql_2 = "INSERT INTO purchased_template SET ?";
    db.query(sql_2, this.data.copied_template, (err, result) => {
    if (err) {
    reject(err);
    return false;
    }
    let  remaining = this.data.limit - this.data.count
    let data = ["SUCCESS",remaining,this.data.limit]


    resolve(data);

    });
    }else{

    resolve(this.data.taken_message)
    }
     
     })

 


}
User.prototype.update_list = function (count){
  console.log(this.data.user_role);
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
  return new Promise( async (resolve, reject)=> {

    resolve()
  })
}
module.exports = User;
