const bcrypt = require("bcryptjs");

const db = require("../db");

let validator = require("validator");

let User = function (data) {
  this.data = data;
  this.errors = [];
  this.errors_data = {};
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};
User.prototype.validate = function () {
  return new Promise((resolve, reject) => {
    // if inputs are empty

    if (this.data.username === "") {
      //   this.errors.push("You must provide username.");
      this.errors_data.username = "You must provide username.";
    }
    if (
      this.data.username != "" &&
      !validator.isAlphanumeric(this.data.username)
    ) {
      //   this.errors.push("username can only contain numbers and letters.");
      this.errors_data.username =
        "username can only contain numbers and letters.";
    }
    if (!validator.isEmail(this.data.email)) {
      //   this.errors.push("You must provide a valid email address.");
      this.errors_data.email = "You must provide a valid email address.";
    }
    if (this.data.password === "") {
      //   this.errors.push("You must provide a password.");
      this.errors_data.password = "You must provide a password.";
    }

    // length of input password
    if (this.data.password.length > 0 && this.data.password.length < 5) {
      //   this.errors.push(
      //     "you must povide atleast 12 characters in your password"
      //   );
      this.errors_data.password =
        "you must povide atleast 12 characters in your password.";
    }
    if (this.data.password.length > 30) {
      //   this.errors.push("Password cannot exceed 30 characters");
      this.errors_data.password = "Password cannot exceed 30 characters";
    }
    // length of input username
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      //   this.errors.push("you must povide atleast 3 characters in your username");
      this.errors_data.username =
        "you must povide atleast 3 characters in your username";
    }
    if (this.data.username.length > 30) {
      //   this.errors.push("username cannot exceed 30 characters");
      this.errors_data.username = "username cannot exceed 30 characters";
    }

    const checkExistUsername = () => {
      return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE name = "${this.data.username}" OR email = "${this.data.email}"`;
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
      this.data.username.length > 2 &&
      this.data.username.length < 31 &&
      validator.isAlphanumeric(this.data.username)
    ) {
      checkExistUsername().then((result) => {
        if (result.length) {
          if (result[0].email === this.data.email) {
            //   this.errors.push("That email is already taken.");
            this.errors_data.email = "That email is already taken.";

            resolve();
          }
          if (result[0].name === this.data.username) {
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
    let sql = `SELECT * FROM users WHERE name = "${this.data.username}"`;

    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }

      if (
        result.length &&
        bcrypt.compareSync(this.data.password, result[0].password)
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
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      let data = {
        name: this.data.username,
        email: this.data.email,
        password: this.data.password,
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
      console.log(this.errors_data);
      reject(this.errors_data);
    }
  });
};
module.exports = User;
