var Flight = require('../models/flight');

module.exports = {
    create
};

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    Flight.findById(req.params.id, function(err, flight) {
      flight.destinations.push(req.body);
      flight.save(function(err) {
        res.redirect(`/flights/${flight._id}`);
      });
    });
}