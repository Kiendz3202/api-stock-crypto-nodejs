const express = require('express');
const route = express.Router();

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
