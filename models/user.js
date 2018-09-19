const   mongoose = require("mongoose"),
        passportLocalMongoose = require('passport-local-mongoose'),
        Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);