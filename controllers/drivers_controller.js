const Driver = require('../models/driver');

module.exports = {
	// same thing as greeting: function(req, res) {}
	greeting(req, res) {
		res.send({ hi: 'there' });
	},

	create(req, res) {
		Driver.create(req.body)
			.then(driver => res.send(driver));
	}
};