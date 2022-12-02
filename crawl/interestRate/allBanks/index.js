const {
	crawlVietcombankInterestRate,
	crawlVietinbankInterestRate,
	crawlAgribankbankInterestRate,
	crawlBidvInterestRate,
	crawlScbInterestRate,
	crawlMbbankInterestRate,
	crawlVibInterestRate,
} = require('../../index');

const { delay } = require('../../../utils/promise/delayTime/delay');

const interestRateRunAll = async () => {
	// cron.schedule('*/3 * * * *', async () => {
	crawlVietcombankInterestRate();
	await delay(10000);
	crawlVietinbankInterestRate();
	await delay(10000);
	crawlAgribankbankInterestRate();
	await delay(10000);
	crawlBidvInterestRate();
	await delay(10000);
	crawlScbInterestRate();
	await delay(10000);
	crawlMbbankInterestRate();
	await delay(10000);
	crawlVibInterestRate();
	await delay(10000);
	// });
};

module.exports = interestRateRunAll;
