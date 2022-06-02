const Manager = require("../models/managerModel");
const Assistant = require("../models/sellerModel");
const Customer = require("../models/userModel");
const path = require("path");
const passport=require('passport')

exports.login_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/managerPage/login.ejs'), { err: error });
};

// exports.login_post = async (req, res) => {
//     const { email, password } = req.body;
//
//     const user = await Manager.findOne({ email });
//
//     if (!user) {
//         req.session.error = "Invalid email";
//         return res.redirect('/manager/login');
//     }
//
//
//     req.session.isAuth = true;
//     req.session.firstName = user.firstName;
//     req.session.lastName = user.lastName;
//     res.redirect('/manager');
// };

exports.login_post = async (req, res) => {
    let manager = new Manager({
        email: req.body.email,
        password: req.body.password
    })

    req.login(manager, function (err){
        if(err){
            console.log(err)
        }else {
            passport.authenticate("local")(req, res, function (){
                res.redirect("/loginmanager")
            })
        }
    })

    req.session.isAuth = true;
    req.session.isSeller=false;
    req.session.isManager=false;
    req.session.firstName = manager.firstName;
    req.session.lastName = manager.lastName;
    res.redirect('/loginmanager');
};

exports.signup_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/managerPage/signup.ejs'), { err: error });
};

exports.signup_post = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName && !lastName && !email && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/manager/signup');
    }

    let assistant = await Assistant.findOne({email})
    let customer = await Customer.findOne({email})
    let manager = await Manager.findOne({email})

    if (assistant || customer || manager) {
        req.session.error = "Email taken!";
        return res.redirect('/manager/login');
    }


    manager = new Manager({
        firstName,
        lastName,
        email,
        password,
    });

    await manager.save();
    res.redirect('/manager/login');
};

exports.logout_post = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/manager/logout');
    });
};