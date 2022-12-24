const Coin = require('../../model/coin/coinModel');
const CoinChart = require('../../model/coin/chartCoin/chartCoinModel');
const createError = require('http-errors');

//change request to axios or fetch
// const autoAddTredingCoin = (req, res, next) => {
//     // request.get('https://api.coingecko.com/api/v3/search/trending', (error, response, body) => {
//     //     let json = JSON.parse(body)
//     //     json.coins.map((coin) => console.log(coin + '\n'))

//     console.log(req.query)

//     // })
// }

const paginationPageCoinController = async (req, res, next) => {
	try {
		const perPage = req.query.per_page || 25;
		const page = req.query.page || 1;
		if (
			!(
				Number.isInteger(parseFloat(perPage)) && parseFloat(perPage) > 0
			) ||
			!(Number.isInteger(parseFloat(page)) && parseFloat(page) > 0)
		) {
			throw createError.BadRequest(
				'query per_page and page must be integer and larger than 0'
			);
		}
		const allCoinLength = await Coin.count();
		const countPage = Math.ceil(allCoinLength / perPage);

		//-------------pagination by mongoose------------------------
		const coinList = await Coin.find({})
			.sort({ rank: 1 })
			.skip(perPage * page - perPage)
			.limit(perPage)
			.select('-_id -createdAt -updatedAt -__v');

		if (!coinList) {
			throw createError.NotFound('can not find data');
		}

		const arr = [];
		coinList.forEach((coin) => {
			arr.push(coin.nameId);
		});
		// const test = async () => {
		const dataChart = await CoinChart.aggregate([
			{
				$match: {
					$expr: { $in: ['$nameId', arr] },
				},
			},
			{
				$project: {
					_id: 0,
					t: { $slice: ['$t', -10] },
					price: { $slice: ['$price', -10] },
					nameId: 1,
				},
			},
		]);

		res.status(200).json({
			status: 'ok',
			data: { coinList, dataChart, pages: countPage },
		});
	} catch (error) {
		next(error);
	}
};

const detailCoinController = async (req, res, next) => {
	try {
		const coinNameId = req.params.nameId || 'bitcoin';

		const coinDetail = await Coin.find({ nameId: coinNameId }).select(
			'-_id -createdAt -updatedAt -__v'
		);

		if (!coinDetail) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: coinDetail });
	} catch (error) {
		next(error);
	}
};

const coinChartController = async (req, res, next) => {
	try {
		const coinNameId = req.params.nameId || 'bitcoin';

		const chartData = await CoinChart.find({ nameId: coinNameId }).select(
			'-_id -__v -createdAt -updatedAt'
		);

		if (!chartData) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: chartData });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	paginationPageCoinController,
	detailCoinController,
	coinChartController,
};
