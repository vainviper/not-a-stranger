const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    desc: String,
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

module.exports = mongoose.model("Group", groupSchema);