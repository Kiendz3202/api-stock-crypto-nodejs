const mongoose = require('mongoose');
const { networkConditions } = require('puppeteer');
const bcrypt = require('bcryptjs');
const { func } = require('joi');

const userSchema = mongoose.Schema({
	email: {
		type: 'String',
		lowercase: true,
		unique: true,
		required: true,
	},
	password: {
		type: 'String',
		required: true,
	},
});

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified) {
			next();
		}

		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		console.log(bcrypt.hash(this.password, salt));
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
