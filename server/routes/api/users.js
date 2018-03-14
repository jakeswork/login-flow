const User = require('../../models/User');
const bodyParser = require('body-parser')

module.exports = (app) => {
	app.use(bodyParser.json())
  // app.get('/api/counters', (req, res, next) => {
  //   Counter.find()
  //     .exec()
  //     .then((counter) => res.json(counter))
  //     .catch((err) => next(err));
  // });

  app.post('/api/users', function (req, res, next) {
    const user = new User();
		user.email = req.body.email
		user.password = req.body.password
    user.save()
      .then(() => res.json(user))
      .catch((err) => next(err));
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
