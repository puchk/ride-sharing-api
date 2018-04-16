const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
	it('Post to /api/drivers creates a new driver', done => {
		Driver.count().then(count => {
			request(app)
				.post('/api/drivers')
				.send({ email: 'test@test.com '})
				.end(() => {
					Driver.count().then(newCount => {
						assert(count + 1 === newCount);
						done();
					});
				});
		});
	});

	it('PUT to /api/drivers/id edits an existing driver', done => {
		const driver = new Driver({ email: 'new@test.com', driving: false });
		driver.save().then(() => {
			request(app)
				.put('/api/drivers/' + driver._id)
				.send({ driving: true })
				.end(() => {
					Driver.findOne({ email: 'new@test.com'})
						.then(driver => {
							assert(driver.driving === true);
							done();
					});
				});
		})
	});

	it('DELETE to /api/driveres/id deletes a driver', done => {
		const driver = new Driver({ email: 'a@test.com', driving: false });
		request(app)
			.delete('/api/drivers/' + driver._id)
			.end(() => {
				Driver.findOne({ email: 'a@test.com '})
					.then((driver) => {
						assert(driver === null);
						done();
					});
			});
	});

	it('GET to /api/drivers finds drivers location', done => {
		const driver1 = new Driver({
			email: 'driver1@test.com',
			geometry: { type: 'Point', coordinates: [-122.47, 47.61]}
		});
		const driver2 = new Driver({
			email: 'driver2@test.com',
			geometry: {type: 'Point', coordinates: [-80.25, 25.79]}
		});

		Promise.all([driver1.save(), driver2.save()])
			.then(() => {
				request(app)
				.get('/api/drivers?lng=-80&lat=25')
				.end((err, response) => {
					assert(response.body.length === 1);
					assert(response.body[0].email === 'driver2@test.com');
					done();
				});
			});
	});
});