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
	await delay(40000);
	crawlVietcombank();
	await delay(40000);
	crawlBidv();
	await delay(40000);
	crawlTechcombank();
	await delay(40000);
	crawlVietinbank();
	await delay(40000);
	crawlMbbank();
	// });
};

module.exports = exchangeRateRunAll;
