const express = require('express');
const router = express.Router();
const user = require('../models/user');
const wrapasync = require('../utils/wrapasync');
const passport = require('passport');
const { saveredirectUrl } = require('../middleware');
const usercontroller = require("../controllers/users.js");

router.route("/signup")
    .get( usercontroller.rendersignup)
    .post( wrapasync(usercontroller.signup));


router.route("/login")
    .get(usercontroller.renderloginform)
    .post( saveredirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }), usercontroller.login);


router.get("/logout", usercontroller.logout);

module.exports = router;