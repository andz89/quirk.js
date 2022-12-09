const bcrypt = require('bcryptjs');

const usersCollection = require('../db').collection('users');

let validator = require('validator');

let User = function (data) {
    this.data = data;
    this.errors = []
};


User.prototype.cleanUp = function () {
    if (typeof(this.data.username) != 'string') {
        this.data.username = ""
    };
    if (typeof(this.data.email) != 'string') {
        this.data.email = ""
    };
    if (typeof(this.data.password) != 'string') {
        this.data.password = ""
    };

    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }

};
User.prototype.validate = function () {
    return new Promise(async (resolve, reject) => { // if inputs are empty
        if (this.data.username === "") {
            this.errors.push('You must provide username.')
        };
        if (this.data.username != "" && ! validator.isAlphanumeric(this.data.username)) {
            this.errors.push('username can only contain numbers and letters.')
        };
        if (! validator.isEmail(this.data.email)) {
            this.errors.push('You must provide a valid email address.')
        };
        if (this.data.password === "") {
            this.errors.push('You must provide a password.')
        };

        // length of input password
        if (this.data.password.length > 0 && this.data.password.length < 12) {
            this.errors.push("you must povide atleast 12 characters in your password");
        }
        if (this.data.password.length > 30) {
            this.errors.push("Password cannot exceed 30 characters");
        }
        // length of input username
        if (this.data.username.length > 0 && this.data.username.length < 3) {
            this.errors.push("you must povide atleast 3 characters in your username");
        }
        if (this.data.username.length > 30) {
            this.errors.push("username cannot exceed 30 characters");
        }


        // Only if username is valid then check to see if it's already taken
        if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await usersCollection.findOne({username: this.data.username})
            if (usernameExists) {
                this.errors.push("That username is already taken.")
            }
        }

        // Only if email is valid then check to see if it's already taken
        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({email: this.data.email})
            if (emailExists) {
                this.errors.push("That email is already being used.")
            }
        }
        resolve()
    })

}


User.prototype.login = function () {

    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({username: this.data.username}).then((user) => {
            if (user && bcrypt.compareSync(this.data.password, user.password)) {
                resolve(user)
            } else {
                reject('Invalid username or password')
            }
        }).catch((e) => {
            reject('please try again')
        })
    })


}

User.prototype.register = function () {
    return new Promise(async (resolve, reject) => { // this.cleanUp()

        this.cleanUp();
        await this.validate();
        if (!this.errors.length) {
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            usersCollection.insertOne(this.data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("User Registered");
                }
            });
            resolve();
        } else {
            reject(this.errors);
        }
    })
}
module.exports = User;
