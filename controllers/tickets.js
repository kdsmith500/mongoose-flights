var Ticket = require('../models/ticket');
var Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
};

function create(req, res) {
    // for (let key in req.body) {
    //     if (req.body[key] === 'AUS') delete req.body[key];
    // }
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err, ticket) {
        console.log(ticket, "ticket created");
        Flight.findById(req.params.id, function(err, flight) {
            flight.tickets.push(ticket);
            flight.save();
            console.log(flight, "i dunno");
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
