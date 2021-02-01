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

}