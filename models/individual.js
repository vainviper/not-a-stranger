const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const individualSchema = new Schema({
    firstName: String,
    lastName: String,
    meetArea: String,
    occupation: String,
    born: Number,
    bio: String,
    race: String,
    nation: String,
    images: [],
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    list: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'List'
        }
    }
});

module.exports = mongoose.model("Individual", individualSchema);