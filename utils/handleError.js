const Error = require('../model/error/errorModel');

const uploadErrorToDb = async (messageError) => {
	const timeUpdate = Math.floor(Date.now() / 1000);
	Error.findOneAndUpdate(
		{ message: messageError },
		{
			message: messageError,
			timeUpdate: timeUpdate,
		}
	).catch((err) => console.log(err.message));
};

module.exports = { uploadErrorToDb };
