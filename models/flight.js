var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flightSchema = new Schema({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        // default: function () {
        //     default to 1 year from local date time
    }}, {
        timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);