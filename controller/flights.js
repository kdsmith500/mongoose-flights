var Flight = require('../models/flight');

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
    // Flight.findById(req.params.id).destinations.find({}).sort({arrival: 'asc'}).exec(function(err, flight) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('flights/show', {
            title: 'Flight Details', flight 
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
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights');
    });
}