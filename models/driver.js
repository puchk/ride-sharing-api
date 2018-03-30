const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
	driving: {
		type: Boolean,
		default: false
	},
	email: {
		type: String,
		required: true
	}
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;