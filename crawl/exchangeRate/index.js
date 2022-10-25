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
	await delay(30000);
	crawlVietcombank();
	await delay(30000);
	crawlBidv();
	await delay(30000);
	crawlTechcombank();
	await delay(30000);
	crawlVietinbank();
	await delay(30000);
	crawlMbbank();
	// });
};

module.exports = exchangeRateRunAll;
