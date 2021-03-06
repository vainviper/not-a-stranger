const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const individualSchema = new Schema({
    firstName: String,
    lastName: String,
    meetArea: String,
    mentality: String,
    height: Number,
    weight: Number,
    build: String,
    eye: String,
    hair: String,
    socialRank: String,
    family: String,
    skills: String,
    equipment: String,
    occupation: String,
    born: Number,
    bio: String,
    race: String,
    nation: String,
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
    },
    group: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        },
        name: String
    }
});

module.exports = mongoose.model("Individual", individualSchema);