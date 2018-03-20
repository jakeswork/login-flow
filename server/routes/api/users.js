const User = require('../../models/User');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'
const dbName = 'local'

module.exports = (app) => {
	app.use(bodyParser.json())
  // app.get('/api/counters', (req, res, next) => {
  //   Counter.find()
  //     .exec()
  //     .then((counter) => res.json(counter))
  //     .catch((err) => next(err));
  // });

	function validateEmail(address) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(address).toLowerCase());
	}

  app.post('/api/users', function (req, res, next) {
		const user = new User();
		const email = req.body.email
		const password = req.body.password
		if(validateEmail(email)) {
			if(password.length > 6) {
				MongoClient.connect(url, function(err, client) {
					assert.equal(null, err)
					const db = client.db(dbName)
					const collection = db.collection('users')
					collection.find({"email": email}).toArray(function(err, docs){
						assert.equal(err, null)
						if(docs.length > 0) {
							res.status(400)
							res.send('E-mail already exists')
						} else {
							user.email = email
							user.password = password
					    user.save()
					      .then(() => res.json(user))
					      .catch((err) => next(err))
						}
					})
					client.close()
				})
			} else {
				res.status(411)
				res.send('Password not long enough')
			}
		} else {
			res.status(412)
			res.send('E-mail invalid')
		}

  });

  // app.delete('/api/counters/:id', function (req, res, next) {
  //   Counter.findOneAndRemove({ _id: req.params.id })
  //     .exec()
  //     .then((counter) => res.json())
  //     .catch((err) => next(err));
  // });
	//
  // app.put('/api/counters/:id/increment', (req, res, next) => {
  //   Counter.findById(req.params.id)
  //     .exec()
  //     .then((counter) => {
  //       counter.count++;
	//
  //       counter.save()
  //         .then(() => res.json(counter))
  //         .catch((err) => next(err));
  //     })
  //     .catch((err) => next(err));
  // });

};
