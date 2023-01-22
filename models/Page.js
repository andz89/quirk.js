const db = require("../db");

let Page = function (data) {
  this.data = data;
};

Page.prototype.getAccount = function () {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM users WHERE user_id = "${this.data.user_id}"`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    });
  });
};

Page.prototype.getTemplate = function () {

  return new Promise( async(resolve, reject) => {
      //check if save template is exist
      const check_saved_template = ()=>{
        return new Promise((resolve, reject) => {
  
          let sql = `SELECT * FROM saved_template WHERE template_id = "${this.data.template_id}"
           && user_id = "${this.data.user_id}"`;
        
          db.query(sql, (err, result) => {
         
            if (err) {
              reject(err);
              return false;
            }
          
            if(result.length > 0){//kung naa
              resolve(result)
            }else{
       
              resolve()
            }
         
          });
        });
      }
   await check_saved_template().then((saved_file)=>{

    if(saved_file){


      let data = {}
      data.user_data = saved_file
      resolve(data);
    }else{
  
      let sql = `SELECT * FROM templates WHERE template_id = "${this.data.template_id}"`;
      db.query(sql, (err, result) => {
  

        if (err) {
          reject(err);
          return false;
        }
        let data = {}
        
        data.admin_data = result
      
        resolve(data);
      });
    }

       
           
      })
    })
};

Page.prototype.save_modify_data  = function (){
  return new Promise(async (resolve, reject) => {
    var sql = `UPDATE saved_template SET user_saved_template_onload = '${this.data.json}',saved_json = ''  WHERE user_id = '${this.data.user_id}' && template_id = '${this.data.template_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    });

});
}
Page.prototype.get_saved_modified_data = function (){
  return new Promise(async (resolve, reject) => {
   
    let sql = `SELECT * FROM saved_template WHERE template_id = "${this.data.template_id}" && user_id = '${this.data.user_id}'`;
    db.query(sql, (err, result) => {
    
      if (err) {
        reject(err);
        return false;
      }
     
    
      resolve(result);
    });

});
}
Page.prototype.create_template_copy = function (){
  return new Promise(async (resolve, reject) => {
    let data = {
      user_id: this.data.user_id,
      user_saved_template_onload: this.data.user_saved_template_onload,
      template_id: this.data.template_id,
      canvas_image: this.data.canvas_image,
      template_name: this.data.template_name,



    };
    let sql = "INSERT INTO saved_template SET ?";
    db.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
     
      resolve();

    });
 

});
}

Page.prototype.getAllTemplates = function() {
  return new Promise(async (resolve, reject) => {
   
    let sql = `SELECT * FROM templates`;
    db.query(sql, (err, result) => {
    
      if (err) {
        reject(err);
        return false;
      }
     
    
      resolve(result);
    });

});
}
module.exports = Page;
