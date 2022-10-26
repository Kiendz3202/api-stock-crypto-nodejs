const {
	crawlCoin,
	updateCurrentcy,
	crawlChartData1d,
	crawlChartData7d,
	crawlChartData14d,
	crawlChartData30d,
	crawlChartData90d,
	crawlChartData1y,
	crawlChartDataMax,
} = require('../index');

const { delay } = require('../../utils/promise/delayTime/delay');

const Coin = require('../../model/coin/coinModel');

const getallCoinsChart = async () => {
	const coinList = await Coin.find({}).sort({ rank: 1 }).skip(0).limit(100);

	coinList.forEach((coin) => {
		crawlChartData1d(coin.nameId, coin.rank);
		crawlChartData7d(coin.nameId, coin.rank);
		crawlChartData14d(coin.nameId, coin.rank);
		crawlChartData30d(coin.nameId, coin.rank);
		crawlChartData90d(coin.nameId, coin.rank);
		crawlChartData1y(coin.nameId, coin.rank);
		crawlChartDataMax(coin.nameId, coin.rank);
	});
};

const coinRunAll = async () => {
	//crawl 200 coins * 4 pages = 1000 coins
	const coinListLength = Coin.find({});
	const arr = [0, 1, 2, 3];

	if (coinListLength) {
		arr.forEach(async (coin, index) => {
			setTimeout(() => {
				crawlCoin(index + 1);
				updateCurrentcy(index + 1);
			}, 10000 * index);
		});
	} else {
		arr.forEach(async (coin, index) => {
			setTimeout(() => {
				crawlCoin(index + 1);
			}, 3000 * index);
		});

		await delay(12000);

		arr.forEach(async (coin, index) => {
			setTimeout(() => {
				updateCurrentcy(index + 1);
			}, 3000 * index);
		});
	}
};

module.exports = { getallCoinsChart, coinRunAll };
