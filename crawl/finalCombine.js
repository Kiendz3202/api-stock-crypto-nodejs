const cron = require('node-cron');

const { getallCoinsChart, coinRunAll } = require('./coin/index');
const { stockRunAll, stockRunList } = require('./stock/index');
const goldRunAll = require('./gold/index');
const petrolRunAll = require('./petrol/index');
const exchangeRateRunAll = require('./exchangeRate/index');
const interestRateRunAll = require('./interestRate/allBanks/index');

const { delay } = require('../utils/promise/delayTime/delay');

const runCrawlCoin = async () => {
	cron.schedule('*/3 * * * *', async () => {
		coinRunAll();
	});
};

const runCrawlStock = async () => {
	//  0 */2 * * *
	// cron.schedule('0 */2 * * *', async () => {
	stockRunAll();
	// });
};

const runCrawlStockList = async () => {
	cron.schedule('*/4 * * * *', async () => {
		stockRunList();
	});
};

const runCrawlGoldPetrolExchangerateInterestRate = async () => {
	cron.schedule('*/30 * * * *', async () => {
		goldRunAll();
		await delay(380000);
		petrolRunAll();
		await delay(40000);
		exchangeRateRunAll();
		await delay(240000);
		interestRateRunAll();
		//360
	});
};

module.exports = {
	runCrawlGoldPetrolExchangerateInterestRate,
	runCrawlStock,
	runCrawlStockList,
	runCrawlCoin,
};
