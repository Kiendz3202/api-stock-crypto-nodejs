const JWT = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (userId) => {
	return new Promise((resolve, reject) => {
		const payload = {
			userId,
		};
		const secret = process.env.ACCESS_TOKEN;
		const options = {
			expiresIn: '1m',
		};

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				reject(err);
			}
			resolve(token);
		});
	});
};

const signRefreshToken = async (userId) => {
	return new Promise((resolve, reject) => {
		const payload = {
			userId,
		};
		const secret = process.env.REFRESH_TOKEN;
		const options = {
			expiresIn: '1y',
		};

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				reject(err);
			}
			//set token in redis
			resolve(token);
		});
	});
};

const verifytoken = (req, res, next) => {
	if (!req.headers['authorization']) {
		return next(createError.Unauthorized());
	}
	const authHeader = req.headers['authorization'];
	const bearerToken = authHeader.split(' ');
	const token = bearerToken[1];
	//verify token
	JWT.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
		if (err) {
			if (err.name === 'JsonWebTokenError') {
				return next(createError.Unauthorized());
			}
			return next(err);
		}
		req.payload = payload;
		next();
	});
};

const verifyRefreshToken = async (refreshToken) => {
	return new Promise((resolve, reject) => {
		JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
			if (err) {
				return reject(err);
			}
			//get refreshtoken from redis and compare with refreshToken
			resolve(payload);
		});
	});
};

module.exports = {
	signAccessToken,
	verifytoken,
	signRefreshToken,
	verifyRefreshToken,
};
