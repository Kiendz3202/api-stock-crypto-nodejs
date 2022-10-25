const express = require('express');
const route = express.Router();
const createError = require('http-errors');
const User = require('../../model/user/userModel');
const { userValidate } = require('../../utils/validation/userValidate');
const {
	signAccessToken,
	signRefreshToken,
	verifytoken,
	verifyRefreshToken,
} = require('../../utils/jwt-service/jwt_service');

const {
	register,
	login,
	refreshtoken,
	logout,
} = require('../../controllers/auth/authControllers');

route.post('/register', register);

route.post('/refresh-token', refreshtoken);

route.post('/login', login);

route.delete('/logout', logout);

module.exports = route;
