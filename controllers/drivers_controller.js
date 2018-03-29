module.exports = {
	// same thing as greeting: function(req, res) {}
	greeting(req, res) {
		res.send({ hi: 'there' });
	}
};