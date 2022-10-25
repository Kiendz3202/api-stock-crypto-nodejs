const {
	crawlVietcombankInterestRate,
	crawlVietinbankInterestRate,
	crawlAgribankbankInterestRate,
	crawlBidvInterestRate,
	crawlScbInterestRate,
	crawlMbbankInterestRate,
	crawlVibInterestRate,
	crawlTpbankInterestRate,
	crawlVpbankInterestRate,
} = require('../../index');

const { delay } = require('../../../utils/promise/delayTime/delay');

const interestRateRunAll = async () => {
	// cron.schedule('*/3 * * * *', async () => {
	crawlVietcombankInterestRate();
	await delay(30000);
	crawlVietinbankInterestRate();
	await delay(30000);
	crawlAgribankbankInterestRate();
	await delay(30000);
	crawlBidvInterestRate();
	await delay(30000);
	crawlScbInterestRate();
	await delay(30000);
	crawlMbbankInterestRate();
	await delay(30000);
	crawlVibInterestRate();
	await delay(30000);
	crawlTpbankInterestRate();
	await delay(30000);
	crawlVpbankInterestRate();
	// });
};

module.exports = interestRateRunAll;
