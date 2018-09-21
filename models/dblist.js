const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    description: String,
    currentAge: Number,
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('List', listSchema);