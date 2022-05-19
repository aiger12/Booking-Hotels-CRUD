const bcrypt = require("bcryptjs");
const Manager = require("../models/managerModel");
const Assistant = require("../models/sellerModel");
const Customer = require("../models/userModel");
const path = require("path");

exports.login_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/sellerPage/login.ejs'), { err: error });
};

exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    const user = await Assistant.findOne({ email });

    if (!user) {
        req.session.error = "Invalid email";
        return res.redirect('/seller/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid password";
        return res.redirect('/seller/login');
    }

    req.session.isAuth = true;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    res.redirect('/seller');
};

exports.signup_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/sellerPage/signup.ejs'), { err: error });
};

exports.signup_post = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName && !lastName && !email && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/seller/signup');
    }

    let assistant = await Assistant.findOne({email})
    let customer = await Customer.findOne({email})
    let manager = await Manager.findOne({email})

    if (assistant || customer || manager) {
        req.session.error = "Email taken!";
        return res.redirect('/seller/signup');
    }

    const hashPsw = await bcrypt.hash(password, 12);

    assistant = new Assistant({
        firstName,
        lastName,
        email,
        password: hashPsw,
    });

    await assistant.save();
    res.redirect('/seller/login');
};

exports.logout_post = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/seller/login');
    });
};