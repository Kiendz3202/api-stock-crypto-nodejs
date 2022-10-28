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
	await delay(40000);
	crawlVietinbankInterestRate();
	await delay(40000);
	crawlAgribankbankInterestRate();
	await delay(40000);
	crawlBidvInterestRate();
	await delay(40000);
	crawlScbInterestRate();
	await delay(40000);
	crawlMbbankInterestRate();
	await delay(40000);
	crawlVibInterestRate();
	await delay(40000);
	crawlTpbankInterestRate();
	await delay(40000);
	crawlVpbankInterestRate();
	// });
};

module.exports = interestRateRunAll;
