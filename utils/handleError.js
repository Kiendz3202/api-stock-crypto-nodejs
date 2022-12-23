const Error = require('../model/error/errorModel');

const uploadErrorToDb = async (messageError) => {
	const timeUpdate = Math.floor(Date.now() / 1000);
	Error.findOneAndUpdate(
		{ timeUpdate: timeUpdate },
		{
			message: messageError,
			timeUpdate: timeUpdate,
		},
		{ upsert: true }
	).catch((err) => console.log(err.message));
};

module.exports = { uploadErrorToDb };
