const User = require('../models/User')

exports.login = (req, res) => {
    let user = new User(req.body);
    user.login().then((result) => {
        req.session.user = {
            username: user.data.username

        }
        res.redirect('/')


    }).catch((err) => {
        req.flash('errors', err)
        res.redirect('/')

    })
};
exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/')
}
exports.home = (req, res) => {
    if (req.session.user) {
        res.render('home-dashboard', {username: req.session.user.username})

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
