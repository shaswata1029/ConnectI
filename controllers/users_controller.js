const User = require("../models/user")

module.exports.profile = function(req, res) {

    // res.end("<h1>User Profile</h1>");


    return res.render('user_profile', {
        title: 'User Profile'
    })


}

module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "ConnectI | Sign Up"
    })
}

// rendered the sign-up page

module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "ConnectI | Sign In"
    })
}

// rendered the sign-in page


module.exports.create = function(req, res) {
    // get the sign up data
    if (req.body.password != req.body.confirm_password)
        return res.redirect('back');

    User.findOne({ email: req.body.email },
        function(err, user) {
            if (err) {
                console.log('error in finding the user to sign up');
                return;
            }
            if (!user) {
                User.create(req.body, function(err, user) {
                    if (err) {
                        console.log('error in creating the user');
                        return;
                    }
                    return res.redirect('/users/sign_in');
                })
            } else
                return res.redirect('back');


        })
}