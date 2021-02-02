module.exports.home = function(req, res) {
    // return res.end('<h1>Express is up</h1>');
    // console.log(req.cookies);
    // looking and acessing the cookies
    return res.render('home.ejs', {
        title: "Home"
    });
}