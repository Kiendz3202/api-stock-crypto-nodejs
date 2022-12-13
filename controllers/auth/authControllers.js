const createError = require('http-errors');
const User = require('../../model/user/userModel');
const { userValidate } = require('../../utils/validation/userValidate');
const {
	signAccessToken,
	signRefreshToken,
	verifytoken,
	verifyRefreshToken,
} = require('../../utils/jwt-service/jwt_service');

const register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const { error, value } = userValidate(req.body);
		// console.log(error.status);
		if (error) {
			throw createError(error.details[0].message);
		}

		const isExists = await User.findOne({ email });

		if (isExists) {
			throw createError.Conflict(`${email} is already registered`);
		}

		const user = new User({
			email,
			password,
		});

		const savedUser = await user.save();

		return res.status(200).json({
			status: 'ok',
			data: savedUser,
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { error } = userValidate(req.body);

		if (error) {
			throw createError(error.details[0].message);
		}

		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			throw createError.NotFound('User not registered');
		}

		const isValid = await user.comparePassword(password);

		if (!isValid) {
			throw createError.Unauthorized();
		}

		const accessToken = await signAccessToken(user._id);
		const refreshtoken = await signRefreshToken(user._id);

		res.status(200).json({
			status: 'ok',
			data: {
				accessToken,
				refreshtoken,
			},
		});
	} catch (error) {
		next(error);
	}
};

const refreshtoken = async (req, res, next) => {
	try {
		const { refreshtoken } = req.body;
		if (!refreshtoken) throw createError.BadRequest();
		//nếu có refresh token thì đối chiếu nó xem có trong db redis không
		//nếu có thì xác thực tiếp bằng hàm verifyRefreshToken
		//còn nếu không hoặc trong blacklist thì sẽ return về lỗi

		const { userId } = await verifyRefreshToken(refreshtoken);
		const accessTokenNew = await signAccessToken(userId);
		const refreshTokenNew = await signRefreshToken(userId);
		res.send({
			status: 'ok',
			data: {
				accessTokenNew,
				refreshTokenNew,
			},
		});
	} catch (error) {
		next(error);
	}
};

const logout = async (req, res, next) => {
	try {
		const { refreshtoken } = req.body;
		if (!refreshtoken) {
			throw createError.BadRequest();
		}

		const { usesrId } = await verifyRefreshToken(refreshtoken);
		//xoá refresh token trong redis
	} catch (error) {
		next(error);
	}
};

module.exports = { register, login, refreshtoken, logout };
