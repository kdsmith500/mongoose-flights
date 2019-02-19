var Ticket = require('../models/ticket');
var Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.tickets.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);  
        });
    });
}

function newTicket(req, res) {
    Ticket.find({}, function(err, flight) {
        res.render('tickets/new', {
            title: 'Add Ticket', flight
        });
    });
}
