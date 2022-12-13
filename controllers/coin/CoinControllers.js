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
		const perPage = 25;
		const page = req.params.page || 1;
		const allCoin = await Coin.find();
		const allCoinLength = allCoin.length;
		const countPage = Math.ceil(allCoinLength / perPage);

		//-------------pagination by mongoose------------------------
		const coinList = await Coin.find({})
			.sort({ rank: 1 })
			.skip(perPage * page - perPage)
			.limit(perPage);

		if (!coinList) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({
			status: 'ok',
			data: { coinList, pages: countPage },
		});
	} catch (error) {
		next(error);
	}
};

const detailCoinController = async (req, res, next) => {
	try {
		const coinNameId = req.params.nameId || 'bitcoin';

		const coinDetail = await Coin.find({ nameId: coinNameId });

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

		const chartData = await CoinChart.find({ nameId: coinNameId });

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
