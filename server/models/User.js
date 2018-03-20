const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

module.exports = mongoose.model('User', UserSchema);
