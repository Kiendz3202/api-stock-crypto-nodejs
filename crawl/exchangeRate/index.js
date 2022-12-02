const {
	crawlAgribank,
	crawlVietcombank,
	crawlBidv,
	crawlTechcombank,
	crawlVietinbank,
	crawlMbbank,
} = require('../index');

const { delay } = require('../../utils/promise/delayTime/delay');

const exchangeRateRunAll = async () => {
	// cron.schedule('*/3 * * * *', async () => {
	crawlAgribank();
	await delay(10000);
	crawlVietcombank();
	await delay(10000);
	crawlBidv();
	await delay(10000);
	crawlTechcombank();
	await delay(10000);
	crawlVietinbank();
	await delay(10000);
	crawlMbbank();
	await delay(10000);
	// });
};

module.exports = exchangeRateRunAll;
