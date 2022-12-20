const cron = require('node-cron');

const {
	getallCoinsChart,
	coinRunAll,
	updateNewPrice,
} = require('./coin/index');
const {
	updateAllDetailStocks,
	updateAllListStocks,
	updateAllChartStocks,
} = require('./stock/index');
const goldRunAll = require('./gold/index');
const petrolRunAll = require('./petrol/index');
const exchangeRateRunAll = require('./exchangeRate/index');
const interestRateRunAll = require('./interestRate/allBanks/index');

const { delay } = require('../utils/promise/delayTime/delay');

const runCrawlCoin = async () => {
	// cron.schedule('1 tuan chay lai 1 lan', async () => {
	//function delete all 800 coin
	cron.schedule('0 */2 * * *', async () => {
		coinRunAll();
	});
	cron.schedule('*/2 * * * *', async () => {
		updateNewPrice();
	});
	// });
};

const runCrawlAllListStocks = async () => {
	cron.schedule('*/10 9-15 * * 1-5', async () => {
		updateAllListStocks();
	});
};

const runCrawlAllDetailStocks = async () => {
	//  0 2,12 * * *
	cron.schedule('0 2,11,13 * * *', async () => {
		updateAllDetailStocks();
	});
};

const runCrawlAllChartStocks = async () => {
	// 0 2 * * *
	cron.schedule('0 2 * * *', async () => {
		updateAllChartStocks();
	});
};

const runCrawlGoldPetrolExchangerateInterestRate = async () => {
	cron.schedule('*/30 * * * *', async () => {
		goldRunAll();
		await delay(60000);
		petrolRunAll();
		await delay(40000);
		exchangeRateRunAll();
		await delay(60000);
		interestRateRunAll();
		await delay(70000);
	});
};

module.exports = {
	runCrawlGoldPetrolExchangerateInterestRate,
	runCrawlAllDetailStocks,
	runCrawlAllListStocks,
	runCrawlAllChartStocks,
	runCrawlCoin,
};
