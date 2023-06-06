const db = require("../db");
const { v4: uuidv4 } = require("uuid");

// const fs = require("fs").promises;
const fs = require("fs");

const unlinkAsync = fs.unlink;

let Admin = function (data) {
  this.data = data;
};
Admin.prototype.add_template_into_database = function () {
  return new Promise(async (resolve, reject) => {
    let table_name;

    if (this.data.category == "certificate") {
      table_name = "templates";
    }

    let data = {
      template_id: uuidv4(),
      template_name: this.data.template_name,
      template_description: this.data.template_description,
      template_json: this.data.json_file,
      thumbnail: this.data.thumbnail_image,
      modal_image: this.data.modal_image,

      live: "false",
      table_names: this.data.table,
      category: this.data.category,
    };
    let sql = `INSERT INTO ${table_name} SET ?`;
    db.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};
Admin.prototype.add_background = function (req, res) {
  return new Promise((resolve, reject) => {
    let data = {
      background_image: this.data.background_image,
      thumbnail_image: this.data.thumbnail_image,

      background_id: uuidv4(),
      background_name: this.data.background_name,
      background_description: this.data.background_description,
      live: "true",
    };

    let sql = "INSERT INTO background SET ?";
    db.query(sql, data, async (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};

Admin.prototype.getAllBackgrounds = function (req, res) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM background";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve(result);
    });
  });
};
Admin.prototype.update_background = function () {
  return new Promise(async (resolve, reject) => {
    let image_to_delete = [];
    let thumbnail;
    let background;

    if (this.data.thumbnail_image == false) {
      //no upload thumbnail
      thumbnail = "";
    } else {
      image_to_delete.push(this.data.thumbnail_image_path);
      thumbnail = `thumbnail_image='${this.data.thumbnail_image}',`;
    }

    if (this.data.background_image == false) {
      //no upload bg
      background = "";
    } else {
      image_to_delete.push(this.data.background_image_path);
      background = `background_image='${this.data.background_image}',`;
    }

    var sql = `UPDATE background SET  ${thumbnail}  ${background} background_description = '${this.data.background_description}',background_name ='${this.data.background_name}' WHERE background_id = '${this.data.background_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);

      if (image_to_delete.length) {
        this.deleteImageBackground(image_to_delete);
      }
    });
  });
};

Admin.prototype.deleteImageBackground = async function (data) {
  const isParametersArray = Array.isArray(data);
  console.log("ning sulod");
  if (isParametersArray == true) {
    console.log("image is available and array");
    for (let i = 0; i < data.length; i++) {
      const filePath = "public/images/users/" + data[i];

      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // File does not exist or is not accessible
          console.error("File does not exist:", err);
        } else {
          // File exists and is accessible, proceed with deletion
          fs.unlink(filePath, async (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting file:", unlinkErr);
            } else {
              console.log("success deleting images");

              // await unlinkAsync("public/images/canvas_image/" + data[i]);
            }
          });
        }
      });
    }
  } else {
    const filePath = "public/images/users/" + data;
    fs.access(filePath, fs.constants.F_OK, (err) => {
      console.log(filePath);
      console.log("image is available");

      if (err) {
        // File does not exist or is not accessible
        console.error("File does not exist:", err);
      } else {
        // File exists and is accessible, proceed with deletion
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
          } else {
            console.log("success deleting image");
            // await unlinkAsync("public/images/users/" + data);
          }
        });
      }
    });
  }
};
Admin.prototype.update_template = function () {
  return new Promise(async (resolve, reject) => {
    let table_name;

    if (this.data.category == "certificate") {
      table_name = "templates";
    }
    let json_file;
    let image_to_delete = [];
    let thumbnail;
    let modal_image;
    if (this.data.json_file.length) {
      json_file = `template_json ='${this.data.json_file}',`;
    } else {
      json_file = "";
    }

    if (this.data.thumbnail_image == false) {
      //no upload thumbnail
      thumbnail = "";
    } else {
      image_to_delete.push(this.data.thumbnail_image_path);
      thumbnail = `thumbnail='${this.data.thumbnail_image}',`;
    }

    if (this.data.modal_image == false) {
      //no upload bg
      modal_image = "";
    } else {
      image_to_delete.push(this.data.modal_image_path);
      modal_image = `modal_image='${this.data.modal_image}',`;
    }

    var sql = `UPDATE ${table_name} SET template_name = '${this.data.template_name}',${thumbnail} ${modal_image}  ${json_file} template_description = '${this.data.template_description}' WHERE template_id = '${this.data.template_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    });

    if (image_to_delete.length) {
      this.deleteImageBackground(image_to_delete);
    }
  });
};

Admin.prototype.get_codes = function () {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM activation_code";
    db.query(sql, async (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve(result);
    });
  });
};
Admin.prototype.create_code = function () {
  return new Promise((resolve, reject) => {
    let data = {
      code: this.data.code,
      days_duration: this.data.duration,
      note: this.data.note,
      template_limit: this.data.limit,
      category: this.data.category,
    };
    let sql = "INSERT INTO activation_code SET ?";
    db.query(sql, data, async (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};

Admin.prototype.delete_code = function () {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM activation_code WHERE code = '${this.data.code}'`;
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};

//delete user template and update activation code
Admin.prototype.delete_template = function (req, res) {
  return new Promise((resolve, reject) => {
    let table_name;

    table_name = "templates";

    let sql = `DELETE FROM  ${table_name} WHERE template_id='${this.data.template_id}' `;
    db.query(sql, async (err) => {
      if (err) {
        reject(err);
        return false;
      }

      let image_to_delete = [];
      image_to_delete.push(this.data.modal_image_path);
      image_to_delete.push(this.data.thumbnail_image_path);
      if (image_to_delete.length > 0) {
        this.deleteImageBackground(image_to_delete);
        resolve("true");
      }
    });
  });
};

//delete user background and update activation code
Admin.prototype.delete_background = function (req, res) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM background WHERE background_id='${this.data.background_id}' `;
    db.query(sql, async (err) => {
      if (err) {
        reject(err);
        return false;
      }

      let image_to_delete = [];
      image_to_delete.push(this.data.background_image_path);
      image_to_delete.push(this.data.thumbnail_image_path);
      if (image_to_delete.length > 0) {
        this.deleteImageBackground(image_to_delete);
        resolve("true");
      }
    });
  });
};
Admin.prototype.publish_update = function (req, res) {
  return new Promise((resolve, reject) => {
    let table_name;

    if (this.data.category == "certificate") {
      table_name = "templates";
    }
    var sql = `UPDATE ${table_name} SET live = '${this.data.published_status}' WHERE template_id = '${this.data.template_id}'`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve();
    });
  });
};
Admin.prototype.getAllUsers = function (req, res) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve(result);
    });
  });
};
// will delete the copied templates of certificates
Admin.prototype.deleteAccount_certificates = function (req, res) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM purchased_template WHERE user_id = '${this.data.user_id}'`;
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};
Admin.prototype.deleteAccount_userTableImages = function (req, res) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM user_image WHERE user_id = '${this.data.user_id}'`;
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};
Admin.prototype.deleteAccount_images = function (req, res) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM  user_image WHERE user_id = "${this.data.user_id}"`;
    db.query(sql, async (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      if (result.length !== 0) {
        await this.deleteImageBackground(result[0].image_path);
        await this.deleteAccount_userTableImages();
        resolve();
      } else {
        await this.deleteAccount_userTableImages();
        resolve();
      }
    });
  });
};
Admin.prototype.deleteAccount_sessions = function (req, res) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM sessions WHERE user_id = '${this.data.user_id}'`;
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};
// let sql = `SELECT * FROM ${table_name} WHERE template_id = "${this.data.template_id}"`;
// if (image_to_delete.length) {
//   this.deleteImageBackground(image_to_delete);
// }
Admin.prototype.deleteAccount = async function () {
  await this.deleteAccount_certificates();
  await this.deleteAccount_images();
  await this.deleteAccount_sessions();

  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM users WHERE user_id = '${this.data.user_id}'`;
    db.query(sql, (err) => {
      if (err) {
        reject(err);
        return false;
      }

      resolve();
    });
  });
};
module.exports = Admin;
