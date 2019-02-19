var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },
    arrival: {
        type: Date,
        default: function() {
            var date = new Date();
            return new Date(date.setFullYear(date.getFullYear() + 1));
        }
    }
}, {
    timestamps: true
});

var flightSchema = new Schema({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United'],
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
        default: 747
    },
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA'],
        default: 'SEA'
    },
    destinations: [destinationSchema],
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    departs: {
        type: Date,
            default: function () {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let futureDate = new Date(year + 1, month, day, hours, minutes, seconds);
                return futureDate;
    }}}, {
        timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);