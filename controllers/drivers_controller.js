const Driver = require('../models/driver');

module.exports = {
	// same thing as greeting: function(req, res) {}
	greeting(req, res) {
		res.send({ hi: 'there' });
	},

	index(req, res, next) {
    const { lng, lat } = req.query;
    
    Driver.aggregate([
      {
        '$geoNear':{
          "near": {'type': 'Point', 'coordinates': [parseFloat(lng), parseFloat(lat)]},
          "spherical": true, "distanceField": 'dist', "maxDistance": 200000
        }
      }    
    ])
      .then(drivers => res.send(drivers))
      .catch(next);
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
	},

	delete(req, res, next){
		Driver.findByIdAndRemove({ _id: req.params.id })
			.then(driver => res.status(204).send(driver))
			.catch(next);
	}
};