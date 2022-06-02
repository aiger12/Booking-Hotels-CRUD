let mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')
let schema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});
schema.plugin(passportLocalMongoose)
let manager = new mongoose.model('Manager', schema);
passport.use(manager.createStrategy())
passport.serializeUser(function(manager, done) {
    done(null, manager);
});
passport.deserializeUser(manager.deserializeUser())
module.exports = manager;