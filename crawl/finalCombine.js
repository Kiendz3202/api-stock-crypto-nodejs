const cron = require('node-cron');

const { getallCoinsChart, coinRunAll } = require('./coin/index');
const stockRunAll = require('./stock/index');
const goldRunAll = require('./gold/index');
const petrolRunAll = require('./petrol/index');
const exchangeRateRunAll = require('./exchangeRate/index');
const interestRateRunAll = require('./interestRate/allBanks/index');

const { delay } = require('../utils/promise/delayTime/delay');

const runCrawlCoin = async () => {
	// cron.schedule('*/4 * * * *', async () => {
	coinRunAll();
	// });
};

const runCrawlStock = async () => {
	// cron.schedule('*/12 * * * *', async () => {
	stockRunAll();
	// });
};

const runCrawlGoldPetrolExchangerateInterestRate = async () => {
	// cron.schedule('*/12 * * * *', async () => {
	goldRunAll();
	await delay(180000);
	petrolRunAll();
	await delay(20000);
	exchangeRateRunAll();
	await delay(180000);
	interestRateRunAll();
	// await delay(270000);
	// });
};

module.exports = {
	runCrawlGoldPetrolExchangerateInterestRate,
	runCrawlStock,
	runCrawlCoin,
};
