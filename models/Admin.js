const db = require("../db");
const { v4: uuidv4 } = require("uuid");
let Admin = function (data) {
  this.data = data;
};

Admin.prototype.add_template_into_database = function () {
  return new Promise(async (resolve, reject) => {
    let data = {
      template_id: uuidv4(),
      template_name: this.data.template_name,
      template_description: this.data.template_description,
      json_file: this.data.json_file,
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
module.exports = Admin;
