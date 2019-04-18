const Schema = require("mongoose").Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Cours'
    }]
})

module.exports = require("mongoose").model('user', userSchema);