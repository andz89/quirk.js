const bcrypt = require("bcryptjs");
const db = require("../db");

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
    console.log("cleanUp");
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
      return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE user_name = "${this.data.user_name}" OR user_email = "${this.data.user_email}"`;
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
            return false;
          }
          resolve(result);
        });
      });
    };

    // Only if username and email is valid then check to see if it's already taken
    if (
      this.data.user_name.length > 2 &&
      this.data.user_name.length < 31 &&
      validator.isAlphanumeric(this.data.user_name)
    ) {
      checkExistUsername().then((result) => {
        if (result.length) {
          if (result[0].user_email === this.data.user_email) {
            //   this.errors.push("That email is already taken.");
            this.errors_data.email = " *That email is already taken. ";

            resolve();
          }
          if (result[0].user_name === this.data.user_name) {
            //   this.errors.push("That username is already taken.");
            this.errors_data.username = "That username is already taken.";

            resolve();
          }
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
        reject("wrong password");
      }
    });
  });
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate();

    if (Object.keys(this.errors_data).length === 0) {
      let salt = bcrypt.genSaltSync(10);
      this.data.user_password = bcrypt.hashSync(this.data.user_password, salt);
      let data = {
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
        resolve(result);
      });
    } else {
      let data = {};
      data.error = this.errors_data;
      data.user = this.data;

      reject(data);
    }
  });
};

User.prototype.test = function () {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM users WHERE user_email = "andzrivero89@gmail.com"`;

    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      if (
        result.length &&
        bcrypt.compareSync("123456", result[0].user_password)
      ) {
        resolve(result);
      } else {
        reject("wrong password");
      }
    });
  });
};

module.exports = User;
