const Driver = require('../models/driver');

module.exports = {
	// same thing as greeting: function(req, res) {}
	greeting(req, res) {
		res.send({ hi: 'there' });
	},

	create(req, res, next) {
		Driver.create(req.body)
			.then(driver => res.send(driver))
			.catch(next);
	},

	edit(req, res, next) {
		Driver.findByIdAndUpdate({ _id: req.params.id }, req.body)
			.then(() => Driver.findById({ _id: req.params.id }))
			.then(driver => res.send(driver))
			.catch(next);
	}
};