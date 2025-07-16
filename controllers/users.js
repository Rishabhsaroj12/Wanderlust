const user = require('../models/user');


module.exports.rendersignup =(req, res) => {
    res.render("users/signup");
};


module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new user({ username, email });
        const registeruser = await user.register(newuser, password);
        req.login(registeruser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to our site!");
        res.redirect("/listings");
        });
        // console.log(registeruser);
    } catch (e) {
        console.log(e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.renderloginform = (req, res) => {
    res.render("users/login");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout =  (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
       
            req.flash("success", "Logged out successfully!");
            res.redirect("/listings");
        });
    }