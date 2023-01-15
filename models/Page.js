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
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM templates WHERE template_id = "fe7cffdb-fe58-4e7b-a562-c7a3402844c8"`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    });
  });
};
module.exports = Page;
