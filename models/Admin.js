const db = require("../db");
const { v4: uuidv4 } = require("uuid");

const fs = require('fs').promises
 

const unlinkAsync = fs.unlink

let Admin = function (data) {
  this.data = data;
};
Admin.prototype.add_template_into_database = function () {
 

  return new Promise(async (resolve, reject) => {
    let data = {

      template_id: uuidv4(),
      template_name: this.data.template_name,
      template_description: this.data.template_description,
      template_json: this.data.json_file,
      thumbnail: this.data.file,
      canvas_image: this.data.canvas_image,

    };
    let sql = "INSERT INTO templates SET ?";
    db.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};
Admin.prototype.add_background =function(req, res){
  return new Promise( (resolve, reject) =>{
    let data = {
      background_image: this.data.background_image,
      thumbnail_image: this.data.thumbnail_image,

      background_id: uuidv4(),
      background_name: this.data.background_name,
      background_description: this.data.background_description,
    };
    let sql = "INSERT INTO background SET ?";
    db.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });

  })

}

Admin.prototype.getAllBackgrounds = function(req, res){
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
Admin.prototype.update_background = function () {
  return new Promise(async (resolve, reject) => {
 
  if(this.data.thumbnail_image && this.data.background_image){
 
    var sql = `UPDATE background SET background_image = '${this.data.background_image}',thumbnal_image='${this.data.thumbnail_image}', background_description = '${this.data.background_description}',background_name ='${this.data.background_name}' WHERE background_id = '${this.data.background_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result);
      });
  }
  // if(!this.data.template_json && this.data.file){
  //   await this.deleteImage()
  //   var sql = `UPDATE templates SET template_name = '${this.data.template_name}',template_description = '${this.data.template_description}',thumbnail = '${this.data.file}' WHERE template_id = '${this.data.template_id}'`;
  //     db.query(sql, (err, result) => {
  //       if (err) {
  //         reject(err);
  //         return false;
  //       }
       
  //       resolve(result);
  //     });
  // }
  // if(this.data.template_json && this.data.file){
  //   await this.deleteImage()
  //   var sql = `UPDATE templates SET template_name = '${this.data.template_name}',template_description = '${this.data.template_description}',template_json ='${this.data.template_json}',thumbnail = '${this.data.file}' WHERE template_id = '${this.data.template_id}'`;
  //     db.query(sql, (err, result) => {
  //       if (err) {
  //         reject(err);
  //         return false;
  //       }
  //       resolve(result);
  //     });
  // }
  else{
   
    var sql = `UPDATE templates SET  background_description = '${this.data.background_description}',background_name ='${this.data.background_name}' WHERE background_id = '${this.data.background_id}'`;
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
Admin.prototype.remove = function (req, res) {
  return new Promise( (resolve, reject) => {
   
    let sql = "DELETE FROM purchased_template";
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
}

Admin.prototype.deleteImage = function (){
  return new Promise((resolve, reject) => {
   
    let sql = `SELECT * FROM templates WHERE template_id = '${this.data.template_id}'` ;
    db.query(sql,async (err, result) => {
    
      if (err) {
        reject(err);
        return false;
      }
   await   unlinkAsync('public/images/ci/' + result[0].thumbnail)
   
      resolve();
    });

});
}

Admin.prototype.update_template = function () {
  return new Promise(async (resolve, reject) => {
 
  if(this.data.template_json && !this.data.file){
 
    var sql = `UPDATE templates SET template_name = '${this.data.template_name}',template_description = '${this.data.template_description}',template_json ='${this.data.template_json}' WHERE template_id = '${this.data.template_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result);
      });
  }
  if(!this.data.template_json && this.data.file){
    await this.deleteImage()
    var sql = `UPDATE templates SET template_name = '${this.data.template_name}',template_description = '${this.data.template_description}',thumbnail = '${this.data.file}' WHERE template_id = '${this.data.template_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
       
        resolve(result);
      });
  }
  if(this.data.template_json && this.data.file){
    await this.deleteImage()
    var sql = `UPDATE templates SET template_name = '${this.data.template_name}',template_description = '${this.data.template_description}',template_json ='${this.data.template_json}',thumbnail = '${this.data.file}' WHERE template_id = '${this.data.template_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result);
      });
  }
  else{
   
    var sql = `UPDATE templates SET template_name = '${this.data.template_name}',template_description = '${this.data.template_description}' WHERE template_id ='${this.data.template_id}'`;
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
module.exports = Admin;
