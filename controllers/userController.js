const User = require('../models/User')

exports.login = async (req, res) => {
    let user = new User(req.body);
  let xx =  await  user.login()
    console.log(xx);
    if(xx.length > 0) {
        req.session.user = {
            email: user.data.username
        }
        res.redirect('/')

    }else{
        req.flash('errors', 'wrong password')
        res.redirect('/')
    }
    

};
exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/')
}
exports.home = (req, res) => {
    if (req.session.user) {
        res.render('home-dashboard', {email: req.session.user.email})

    } else {
        res.render('home-guest', {
            errors: req.flash('errors'),
            regErrors: req.flash('regErrors')
        })

    }
}
exports.register = (req, res) => {
    let user = new User(req.body)
    user.register().then(() => {
        req.session.user = {
            username: user.data.username
        };
        res.redirect('/')

    }).catch((regErrors) => {

        regErrors.forEach(error => {
            req.flash('regErrors', error)
        });
        res.redirect('/')

    })

}
