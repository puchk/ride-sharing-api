const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	type: { type: String, default: 'Point' },
	coordinates: { type: [Number], index: '2dsphere' }
});

const DriverSchema = new Schema({
	driving: {
		type: Boolean,
		default: false
	},
	email: {
		type: String,
		required: true
	},
	geometry: LocationSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;