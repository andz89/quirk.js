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



// Page.prototype.create_template = function(){
//   return new Promise(async (resolve, reject) => {
//     let data = {
//       user_id: this.data.user_id,
//       template_id: this.data.template_id,
//       canvas_image: this.data.canvas_image,
//       template_name: this.data.template_name,
//     };
   
//     let sql = `SELECT * FROM templates WHERE template_id = "${this.data.template_id}"`;
//     db.query(sql, data, (err, result) => {
//       if (err) {
//         reject(err);
//         return false;
//       }


//       let data_2 = {
//         user_id: this.data.user_id,
//         template_id: result[0].template_id,
//         template_name: result[0].template_name,
//         template_description: result[0].template_description,
//         template_json: result[0].template_json,
//         template_category: result[0].template_category,
//         canvas_image: result[0].canvas_image,


//       }

//       let sql_2 = "INSERT INTO purchased_template SET ?";
//     db.query(sql_2, data_2, (err, result) => {
//       if (err) {
//         reject(err);
//         return false;
//       }
     
//       resolve();

//     });
       

//     });
 

// });
// }
Page.prototype.getList = function(){
   

  return new Promise((resolve, reject) => {
    if(this.data.user_role === 'admin'){
      let sql = `SELECT * FROM admin_user WHERE id = "${this.data.user_id}"`;
     
     db.query(sql, (err, result) => {
    
       if (err) {
         reject(err);
         return false;
       }
         this.data.list = result[0].list
         resolve()
       
    
     });
    }
    if(this.data.user_role === 'user'){
      let sql = `SELECT * FROM users WHERE user_id = "${this.data.user_id}"`;
     
     db.query(sql, (err, result) => {
    
       if (err) {
         reject(err);
         return false;
       }
         this.data.list = result[0].list
         resolve()
       
    
     });
    }
   
  });

}
Page.prototype.check_user_subscription = function(){
  return new Promise((resolve, reject) => {
 
      let sql = `SELECT * FROM activation_code WHERE user_id = "${this.data.user_id}" AND certificate_subscription="true"`;
     db.query(sql, (err, result) => {
       if (err) {
         reject(err);
         return false;
       }
 
    
       if(result.length >0) {
      
        resolve()
       }else{
          this.data.expired_message = 'expired'
        resolve()
       }
        
       
    
     });
  })
}
Page.prototype.getCanvas = function(){
            return new Promise(async (resolve, reject) => {
              await this.check_user_subscription()
              await this.getList()

              if(this.data.user_role === 'admin'){
                let sql = `SELECT * FROM templates WHERE template_id = "${this.data.template_id}"`;
               
               db.query(sql, (err, result) => {
              
                 if (err) {
                   reject(err);
                   return false;
                 }
                   let data = []
                   data.list = this.data.list;
                   data.template_id = result[0].template_id;
                   data.template_json = result[0].template_json;
                   data.template_name = result[0].template_name;
                   data.thumbnail = result[0].thumbnail;
                   data.canvas_image = result[0].canvas_image;

 
             
                   resolve(data)
                 
              
               });
              }
              if(this.data.user_role === 'user'){
            
                if(this.data.expired_message == undefined){
               
                  let sql = `SELECT * FROM purchased_template WHERE template_id = "${this.data.template_id}"
                  && user_id = "${this.data.user_id}"&& purchased_id = "${this.data.purchased_id}"`;
             
                 db.query(sql, (err, result) => {
                
                   if (err) {
                     reject(err);
                     return false;
                   }
                
                     let data = []
                     data.list = this.data.list;
                     data.template_id = result[0].template_id;
                     data.purchased_id = result[0].purchased_id;
                    
                     data.template_json = result[0].template_json;
                     data.template_name = result[0].template_name;
                     data.thumbnail = result[0].thumbnail;
                     data.canvas_image = result[0].canvas_image;
               
                     resolve(data)
                   
                
                 });
                }else{
                  resolve(this.data.expired_message)
                }
             
              }
           
            });
          
}
 


 
Page.prototype.getAllTemplates = function() {
  return new Promise(async (resolve, reject) => {
   if(this.data.user_role == 'admin'){
    let sql = `SELECT * FROM templates `;
    db.query(sql, (err, result) => {
    
      if (err) {
        reject(err);
        return false;
      }
     
    
      resolve(result);
    });
   }else{
    let sql = `SELECT * FROM templates WHERE live = 'true'`;
    db.query(sql, (err, result) => {
    
      if (err) {
        reject(err);
        return false;
      }
     
    
      resolve(result);
    });
   }
   

});
}
Page.prototype.getUserTemplates = function() {
  return new Promise(async (resolve, reject) => {
   
 
      await this.check_user_subscription()
      if(this.data.expired_message == undefined){
        let sql = `SELECT * FROM purchased_template WHERE user_id = '${this.data.user_id}'` ;
        db.query(sql, (err, result) => {
        
          if (err) {
            reject(err);
            return false;
          }
         
        
          let data = {}
          data.result = result;
          data.expired = false;
          resolve(data);
        });
        }else{
        
 
          let sql = `SELECT * FROM purchased_template WHERE user_id = '${this.data.user_id}'` ;
        db.query(sql, (err, result) => {
        
          if (err) {
            reject(err);
            return false;
          }
         
        
          let data= {}
          data.result = result;
          data.expired = true;
 
          resolve(data);
        });
        }
     
    
 
 

});
}
module.exports = Page;
