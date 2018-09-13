const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const individualSchema = new Schema({
    firstName: String,
    lastName: String,
    meetArea: String,
    occupation: String,
    age: String,
    bio: String
});

module.exports = mongoose.model("Individual", individualSchema);