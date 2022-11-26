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
	cron.schedule('*/2 * * * *', async () => {
		const crawlAllDetailPnj = async () => {
			const arr = ['00', '07', '11', '13', '14', '21'];

			arr.forEach((gold, index) => {
				setTimeout(() => {
					crawlPnj(gold, index + 1);
				}, 3000 * index);
			});
		};

		crawlAllDetailPnj();
		await delay(180000);
		crawlSjc();
		await delay(5000);
		crawlDoji();
		await delay(5000);
		crawlPhuQuySjc();
		await delay(5000);
		crawlBaoTinMinhChau();
		await delay(5000);
		crawlMiHong();
	});
};

module.exports = goldRunAll;
