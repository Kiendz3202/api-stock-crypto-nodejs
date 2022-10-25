const asyncHandler = require('express-async-handler');
const Coin = require('../../model/coin/coinModel');
const CoinChart = require('../../model/coin/chartCoin/chartCoinModel');

//change request to axios or fetch
// const autoAddTredingCoin = (req, res, next) => {
//     // request.get('https://api.coingecko.com/api/v3/search/trending', (error, response, body) => {
//     //     let json = JSON.parse(body)
//     //     json.coins.map((coin) => console.log(coin + '\n'))

//     console.log(req.query)

//     // })
// }

const paginationPageCoinController = asyncHandler(async (req, res, next) => {
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

	res.status(200).json(coinList);
});

const detailCoinController = asyncHandler(async (req, res, next) => {
	const coinSymbol = req.params.coin || 'btc';

	const coinDetail = await Coin.find({ symbol: coinSymbol });

	res.status(200).json(coinDetail);
});

const coinChartController = async (req, res, next) => {
	const coinSymbol = req.params.coin || 'btc';

	const chartData = await CoinChart.find({ symbol: coinSymbol });

	res.status(200).json(chartData);
};

module.exports = {
	paginationPageCoinController,
	detailCoinController,
	coinChartController,
};
