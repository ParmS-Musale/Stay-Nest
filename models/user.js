const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require ("passport-local-mongoose");
// const passport = require ("passport");
// const LocalStratergy = require ("passport-local");
// const User =require ("./models/user.js");

const userSchema = new Schema({
    email : {
        type :String ,
        required : true ,
    }
});

userSchema.plugin (passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
