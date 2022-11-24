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
	// // cron.schedule('*/3 * * * *', async () => {
	// const crawlAllDetailPnj = async () => {
	// 	const arr = ['00', '07', '11', '13', '14', '21'];

	// 	arr.forEach((gold, index) => {
	// 		setTimeout(() => {
	// 			crawlPnj(gold, index + 1);
	// 		}, 30000 * index);
	// 	});
	// };

	// crawlAllDetailPnj();
	// await delay(180000);
	crawlSjc();
	// await delay(40000);
	// crawlDoji();
	// await delay(40000);
	// crawlPhuQuySjc();
	// await delay(40000);
	// crawlBaoTinMinhChau();
	// await delay(40000);
	// crawlMiHong();
	// });
};

module.exports = goldRunAll;
