const {
	crawlSjc,
	crawlPnj,
	crawlDoji,
	crawlPhuQuySjc,
	crawlBaoTinMinhChau,
	crawlMiHong,
} = require('../index');

const { delay } = require('../../utils/promise/delayTime/delay');

const goldRunAll = async () => {
	// cron.schedule('*/3 * * * *', async () => {
	const crawlAllDetailPnj = async () => {
		const arr = ['00', '07', '11', '13', '14', '21'];

		arr.forEach((gold, index) => {
			setTimeout(() => {
				crawlPnj(gold, index + 1);
			}, 5000 * index);
		});
	};

	crawlAllDetailPnj();
	await delay(30000);
	crawlSjc();
	await delay(30000);
	crawlDoji();
	await delay(30000);
	crawlPhuQuySjc();
	await delay(30000);
	crawlBaoTinMinhChau();
	await delay(30000);
	crawlMiHong();
	// });
};

module.exports = goldRunAll;
