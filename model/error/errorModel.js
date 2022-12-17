const mongoose = require('mongoose');

const errorSchema = mongoose.Schema(
	{
		message: { type: 'String', default: 'DOJI' },
		// location: { type: "String" },
		timeUpdate: { type: 'String' },
	},
	{
		timestamps: true,
	}
);

const Error = mongoose.model('Error', errorSchema);
module.exports = Error;
