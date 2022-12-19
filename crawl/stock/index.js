const Hnx30 = require('../../model/stock/stockList/hnx30Model');
const Hnx = require('../../model/stock/stockList/hnxModel');
const Vn30 = require('../../model/stock/stockList/vn30Model');
const Hose = require('../../model/stock/stockList/hoseModel');
const Upcom = require('../../model/stock/stockList/upcomModel');

const AllInvesting = require('../../model/stock/stockList/allInvestingModel');
const AllInvestingDetail = require('../../model/stock/stockDetail/allInvestingDetailModel');
const Hnx30Detail = require('../../model/stock/stockDetail/hnx30DetailModel');

const { delay } = require('../../utils/promise/delayTime/delay');

const {
	crawlHnx30,
	crawlHnx,
	crawlVn30,
	crawlHose,
	crawlUpcom,
	crawlAllInvesting,
	crawlDetailHnx30,
	crawlDetailHnx,
	crawlDetailVn30,
	crawlDetailHose,
	crawlDetailUpcom,
	crawlDetailAllInvesting,
	crawlDetailReportChartAll,
	crawlChartHnx30,
	crawlChartHnx,
	crawlChartVn30,
	crawlChartHose,
	crawlChartUpcom,
} = require('../index');

const updateAllListStocks = async () => {
	crawlHnx();
	await delay(10000);
	crawlHose();
	await delay(10000);
	crawlHnx30();
	await delay(10000);
	crawlVn30();
	await delay(30000);
	const hnxLength = await Hnx.find().count();
	const hnx30Length = await Hnx30.find().count();
	const vn30Length = await Vn30.find().count();
	const hoseLength = await Hose.find().count();
	// console.log(hnxLength + ' final');
	// console.log(hnx30Length + ' final');
	// console.log(vn30Length + ' final');
	// console.log(hoseLength + ' final');
};

const updateAllDetailStocks = async () => {
	//----Length of collection to caculate time delay each crawlingFunction executes
	const hnxLength = await Hnx.find().count();
	const hnx30Length = await Hnx30.find().count();
	const vn30Length = await Vn30.find().count();
	const hoseLength = await Hose.find().count();
	// const upcomLength = await Upcom.find().count();

	//---crawl detail information in particularly stock and update price to array in database to draw chart
	console.log('start crawl detail stocks');

	if (hnx30Length !== 0) {
		crawlDetailHnx30();
		await delay(hnx30Length * 3000);
	}

	if (hnxLength !== 0) {
		crawlDetailHnx();
		await delay(hnxLength * 3000);
	}

	if (vn30Length !== 0) {
		crawlDetailVn30();
		await delay(vn30Length * 3000);
	}

	if (hoseLength !== 0) {
		crawlDetailHose();
		await delay(hoseLength * 3000);
	}

	// if (upcomLength !== 0) {
	// 	crawlDetailUpcom();
	// 	await delay(upcomLength * 2000);
	// }

	console.log('end crawl detail stocks');
};

const updateAllChartStocks = async () => {
	//----Length of collection to caculate time delay each crawlingFunction executes
	const hnxLength = await Hnx.find().count();
	const hnx30Length = await Hnx30.find().count();
	const vn30Length = await Vn30.find().count();
	const hoseLength = await Hose.find().count();
	// const upcomLength = await Upcom.find().count();

	if (hnx30Length !== 0) {
		crawlChartHnx30();
		await delay(hnx30Length * 3000);
	}

	if (hnxLength !== 0) {
		crawlChartHnx();
		await delay(hnxLength * 3000);
	}

	if (vn30Length !== 0) {
		crawlChartVn30();
		await delay(vn30Length * 3000);
	}

	if (hoseLength !== 0) {
		crawlChartHose();
		await delay(hoseLength * 3000);
	}

	// if (upcomLength !== 0) {
	// 	crawlChartUpcom();
	// 	await delay(upcomLength * 3000);
	// }
};

module.exports = {
	updateAllDetailStocks,
	updateAllListStocks,
	updateAllChartStocks,
};
