const mongoose = require('mongoose'); // we are adding odels cause the mongoose package use schemas to controll the data
const Schema = mongoose.Schema;

const coursShema = new Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('Cours', coursShema);