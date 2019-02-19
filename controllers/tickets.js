var Ticket = require('../models/ticket');
var Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
};

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err, ticket) {
        Flight.findById(req.params.id, function(err, flight) {
            flight.tickets.push(ticket);
            flight.save();
            res.redirect(`/flights/${req.params.id}`);  
        });
    });
};


function newTicket(req, res) {
    Ticket.find({}, function(err, flight) {
        res.render('tickets/new', {
            title: 'Add Ticket', flightId: req.params.id
        });
    });
}
