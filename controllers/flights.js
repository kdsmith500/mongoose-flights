var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    index,
    show,
    new: newFlight,
    create
};

function index(req, res) {
    Flight.find({}).sort({departs: 'asc'}).exec(function(err, flights) {
        res.render('flights/index', {
            title: 'All Flights', flights
        });
    });
}

function show(req, res) {
    Flight.findById(req.params.id).populate('tickets').exec(function(err, flight) {
        // Ticket.find({_id: {$nin: flight.tickets}}).exec(function(err, tickets) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', {
                title: 'Flight Details', flight, tickets
            });
        });
    });
}

function newFlight(req, res) {
    res.render('flights/new', {
        title: 'Add Flight'
      });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('flights/new');
        res.redirect(`/flights/${flight._id}`);
    });
}