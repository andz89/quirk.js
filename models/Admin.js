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
      thumbnail: this.data.thumbnail_image,
      modal_image: this.data.modal_image,
      canvas_image: this.data.canvas_image
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
    db.query(sql, data, async (err, result) => {
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

 

    let image_to_delete = []
    let thumbnail;
    let background;
     

      if(this.data.thumbnail_image == false ){//no upload thumbnail
          thumbnail = ''
      }else{
        image_to_delete.push(this.data.thumbnail_image_path)
        thumbnail = `thumbnail_image='${this.data.thumbnail_image}',`
      }


      if(this.data.background_image == false ){//no upload bg
        background = ''
     }else{
      image_to_delete.push(this.data.background_image_path)
      background = `background_image='${this.data.background_image}',`
     }


    var sql = `UPDATE background SET  ${thumbnail}  ${background} background_description = '${this.data.background_description}',background_name ='${this.data.background_name}' WHERE background_id = '${this.data.background_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result);

        
         
       
        if(image_to_delete.length) {
          this.deleteImageBackground(image_to_delete)
        }
 
      });
 
 
 
   
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
Admin.prototype.deleteImageBackground = async  function (data){

  for(let i=0; i<data.length; i++){
   
    await  unlinkAsync('public/images/canvas_image/'+data[i])
  }
 
   
 
}
 

Admin.prototype.update_template = function () {
  return new Promise(async (resolve, reject) => {
    let json_file;
    let image_to_delete = []
    let thumbnail;
    let modal_image;
    if(this.data.template_json.length){
      json_file = `template_json ='${this.data.template_json}',`
    }else{
      json_file = '';
    }


      if(this.data.thumbnail_image == false ){//no upload thumbnail
          thumbnail = ''
      }else{
        image_to_delete.push(this.data.thumbnail_image_path)
        thumbnail = `thumbnail='${this.data.thumbnail_image}',`
      }
      
 
      if(this.data.modal_image == false ){//no upload bg
        modal_image = ''
     }else{ 
      image_to_delete.push(this.data.modal_image_path)
      modal_image = `modal_image='${this.data.modal_image}',`
     
     }


    var sql = `UPDATE templates SET template_name = '${this.data.template_name}',${thumbnail} ${modal_image}  ${json_file} template_description = '${this.data.template_description}' WHERE template_id = '${this.data.template_id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(result);
      });
 
      if(image_to_delete.length) {
       
        this.deleteImageBackground(image_to_delete)
      }
 
      
  });
};

 
Admin.prototype.get_codes = function (){
  return new Promise((resolve, reject) => {
   
    let sql = 'SELECT * FROM activation_code' ;
    db.query(sql,async (err, result) => {
    
      if (err) {
        reject(err);
        return false;
      }
 
    
      resolve(result);
    });

});
}
Admin.prototype.create_code = function(){
  return new Promise((resolve, reject)=>{
    let data = {
      code: this.data.code,
      days_duration: this.data.duration,
      note: this.data.note,
      template_limit: this.data.limit


    }
    let sql = "INSERT INTO activation_code SET ?";
    db.query(sql, data, async (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
     
      resolve();
    });
  })
}


Admin.prototype.delete_code = function(){
  return new Promise( (resolve, reject) => {
   
    let sql = `DELETE FROM activation_code WHERE code = '${this.data.code}'`;
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  })
}

//delete user template and update activation code
Admin.prototype.delete_template = function (req, res) {
  return new Promise( (resolve, reject) => {
   
    let sql = `DELETE FROM templates WHERE template_id='${this.data.template_id}' `;
    db.query(sql, async (err) => {
      if (err) {
        reject(err);
        return false;
      }
      console.log(this.data.modal_image_path);
      let image_to_delete = []
      image_to_delete.push(this.data.modal_image_path)
      image_to_delete.push(this.data.thumbnail_image_path)
      if(image_to_delete.length > 0){
        this.deleteImageBackground(image_to_delete)
        resolve('true');
      }
     
    });
  });
}

//delete user background and update activation code
Admin.prototype.delete_background = function (req, res) {
  return new Promise( (resolve, reject) => {
   
    let sql = `DELETE FROM background WHERE background_id='${this.data.background_id}' `;
    db.query(sql, async (err) => {
      if (err) {
        reject(err);
        return false;
      }
 
      let image_to_delete = []
      image_to_delete.push(this.data.background_image_path)
      image_to_delete.push(this.data.thumbnail_image_path)
      if(image_to_delete.length > 0){
        this.deleteImageBackground(image_to_delete)
        resolve('true');
      }
     
    });
  });
}
Admin.prototype.publish_update = function(req, res){
  console.log(this.data.published_status);
  return new Promise( (resolve, reject) => {
    var sql = `UPDATE templates SET live = '${this.data.published_status}' WHERE template_id = '${this.data.template_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve();

    });
  })
}

module.exports = Admin;
