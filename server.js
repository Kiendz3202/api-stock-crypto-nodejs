//-----import external libraries and stuff like that---
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const cron = require('node-cron');
const EventEmitter = require('events');
//-----------------------------------------------------

//-----import function in other files,folders---------
const {
	crawlCoin,
	updateCurrentcy,
	crawlChartData1d,
	crawlChartData7d,
	crawlChartData14d,
	crawlChartData30d,
	crawlChartData90d,
	crawlChartData1y,
	crawlChartDataMax,
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
	crawlDetailChartHnx,
	crawlSjc,
	crawlPnj,
	crawlDoji,
	crawlPhuQuySjc,
	crawlBaoTinMinhChau,
	crawlMiHong,
	crawlPetrolimex,
	crawlAbBank,
	crawlAgribank,
	crawlVietcombank,
	crawlBidv,
	crawlTechcombank,
	crawlVietinbank,
	crawlMbbank,
	crawlVietcombankInterestRate,
	crawlVietinbankInterestRate,
	crawlAgribankbankInterestRate,
	crawlBidvInterestRate,
	crawlScbInterestRate,
	crawlMbbankInterestRate,
	crawlVibInterestRate,
	crawlTpbankInterestRate,
	crawlVpbankInterestRate,
} = require('./crawl/index');

const { delay } = require('./utils/promise/delayTime/delay');
//---------------------------------------------------
//-----import Stock Model-----------------------------------------------
const Hnx30 = require('./model/stock/stockList/hnx30Model');
const Hnx = require('./model/stock/stockList/hnxModel');
const Vn30 = require('./model/stock/stockList/vn30Model');
const Hose = require('./model/stock/stockList/hoseModel');
const Upcom = require('./model/stock/stockList/upcomModel');

const AllInvesting = require('./model/stock/stockList/allInvestingModel');
const AllInvestingDetail = require('./model/stock/stockDetail/allInvestingDetailModel');
const Hnx30Detail = require('./model/stock/stockDetail/hnx30DetailModel');
//-------------------------------------------------------------------------

//-----import Coin Model------------------------
const Coin = require('./model/coin/coinModel');
//-----------------------------------------------

// const myEmitter = new EventEmitter();
// myEmitter.setMaxListeners(0);

//--------------------------------------------Main Body------------------------------------------------------------------

//-----------------------------Stock----------------------------------------------------------
const stockRunAll = async () => {
	//----Length of collection to caculate time delay each crawlingFunction executes
	cron.schedule('*/2 * * * *', async () => {
		const hnxLength = await Hnx.find().count();
		const hnx30Length = await Hnx30.find().count();
		const vn30Length = await Vn30.find().count();
		const hoseLength = await Hose.find().count();
		const upcomLength = await Upcom.find().count();

		//----crawl all basic information stocks----
		crawlHnx();
		await delay(3000);
		crawlHnx30();
		await delay(3000);
		crawlVn30();
		await delay(3000);
		crawlHose();
		await delay(3000);
		crawlUpcom();
		await delay(20000);
		// crawlAllInvesting();
		//--------------------------------------

		//---crawlAllDetail Stock---

		const crawlAllDetailHnx30 = async () => {
			// cron.schedule('*/30 8-16 * * *', async () => {
			const list = await Hnx30.find({}).limit(5);

			list.forEach(async (stock, index) => {
				setTimeout(() => {
					crawlDetailHnx30(
						stock.name,
						stock.symbol,
						stock.reference,
						stock.ceil,
						stock.floor,
						stock.currentPrice,
						stock.high,
						stock.low,
						stock.change,
						stock.changePercent,
						stock.turnOver
					);
				}, 2000 * index);
			});
			// });
		};

		const crawlAllDetailHnx = async () => {
			// cron.schedule('*/35 * * * *', async () => {
			const list = await Hnx.find({}).limit(5);

			list.forEach(async (stock, index) => {
				setTimeout(() => {
					crawlDetailHnx(
						stock.name,
						stock.symbol,
						stock.reference,
						stock.ceil,
						stock.floor,
						stock.currentPrice,
						stock.high,
						stock.low,
						stock.change,
						stock.changePercent,
						stock.turnOver
					);
				}, 2000 * index);
			});
			// });
		};

		const crawlAllDetailVn30 = async () => {
			const list = await Vn30.find({}).limit(5);

			list.forEach(async (stock, index) => {
				setTimeout(() => {
					crawlDetailVn30(
						stock.name,
						stock.symbol,
						stock.reference,
						stock.ceil,
						stock.floor,
						stock.currentPrice,
						stock.high,
						stock.low,
						stock.change,
						stock.changePercent,
						stock.turnOver
					);
				}, 2000 * index);
			});
		};

		const crawlAllDetailHose = async () => {
			// cron.schedule('14 * * * *', async () => {
			const list = await Hose.find({}).limit(5);

			list.forEach(async (stock, index) => {
				setTimeout(() => {
					crawlDetailHose(
						stock.name,
						stock.symbol,
						stock.reference,
						stock.ceil,
						stock.floor,
						stock.currentPrice,
						stock.high,
						stock.low,
						stock.change,
						stock.changePercent,
						stock.turnOver
					);
				}, 2000 * index);
			});
			// })
		};

		const crawlAllDetailUpcom = async () => {
			const list = await Upcom.find({}).limit(5);

			list.forEach(async (stock, index) => {
				setTimeout(() => {
					crawlDetailUpcom(
						stock.name,
						stock.symbol,
						stock.reference,
						stock.ceil,
						stock.floor,
						stock.currentPrice,
						stock.high,
						stock.low,
						stock.change,
						stock.changePercent,
						stock.turnOver
					);
				}, 2000 * index);
			});
		};
		//--------------------------

		// const crawlAllDetailAllInvesting = asyncHandler(async () => {
		// 	const list = await AllInvesting.find({}).limit(20);

		// 	list.forEach(async (stock, index) => {
		// 		setTimeout(() => {
		// 			crawlDetailAllInvesting(stock.id, stock.name, stock.hrefDetail);
		// 		}, 2000 * index);
		// 	});
		// });

		// const crawlAllDetailChartHnx = asyncHandler(async () => {
		// 	const list = await Hnx.find({}).limit(10);

		// 	list.forEach(async (stock, index) => {
		// 		setTimeout(() => {
		// 			crawlDetailChartHnx(stock.symbol);
		// 		}, 2000 * index);
		// 	});
		// });

		// const crawlAllDetailReportChart = asyncHandler(async () => {
		// 	const list = await AllInvestingDetail.find({}).limit(10);

		// 	list.forEach(async (stock, index) => {
		// 		setTimeout(() => {
		// 			crawlDetailReportChartAll(stock.id, stock.symbol);
		// 		}, index * 2000);
		// 	});
		// });

		//---crawl detail information in particularly stock and update price to array in database to draw chart
		console.log('start crawl detail');
		crawlAllDetailHnx30();
		//set delay for crwaling each exchange.When crawling first time, dont have data in database so we have to set default time delay,
		//it depends on your caculating
		// if (hnx30Length !== 0) {
		// 	await delay(hnx30Length * 2000 + 5000);
		// } else {
		// 	await delay(30 * 2000 + 5000);
		// }
		if (hnx30Length !== 0) {
			await delay(5 * 2000);
		} else {
			await delay(5 * 2000);
		}

		crawlAllDetailVn30();
		// if (vn30Length !== 0) {
		// 	await delay(vn30Length * 2000 + 5000);
		// } else {
		// 	await delay(30 * 2000 + 5000);
		// }
		if (hnx30Length !== 0) {
			await delay(5 * 2000);
		} else {
			await delay(5 * 2000);
		}

		crawlAllDetailHnx();
		// if (hnxLength !== 0) {
		// 	await delay(hnxLength * 2000 + 5000);
		// } else {
		// 	await delay(400 * 2000 + 5000);
		// }
		if (hnx30Length !== 0) {
			await delay(5 * 2000);
		} else {
			await delay(5 * 2000);
		}

		crawlAllDetailHose();
		// if (hoseLength !== 0) {
		// 	await delay(hoseLength * 2000 + 5000);
		// } else {
		// 	await delay(450 * 2000 + 5000);
		// }
		if (hnx30Length !== 0) {
			await delay(5 * 2000);
		} else {
			await delay(5 * 2000);
		}

		crawlAllDetailUpcom();
		// if (upcomLength !== 0) {
		// 	await delay(upcomLength * 2000 + 5000);
		// } else {
		// 	await delay(900 * 2000 + 5000);
		// }
		if (hnx30Length !== 0) {
			await delay(5 * 2000);
		} else {
			await delay(5 * 2000);
		}
		console.log('done crawl detail');

		// crawlAllDetailAllInvesting();

		// crawlAllDetailChartHnx(); ham nay la goi api cua ho de lay data,gio khong can nua

		// crawlAllDetailReportChart();
	});
};

// stockRunAll();

//---------------------------------------------------------------------------

//-------------Coin------------------

// const getallCoinsChart = asyncHandler(async () => {
// 	const coinList = await Coin.find({}).sort({ rank: 1 }).skip(0).limit(100);

// 	coinList.forEach((coin) => {
// 		crawlChartData1d(coin.nameId, coin.rank);
// 		crawlChartData7d(coin.nameId, coin.rank);
// 		crawlChartData14d(coin.nameId, coin.rank);
// 		crawlChartData30d(coin.nameId, coin.rank);
// 		crawlChartData90d(coin.nameId, coin.rank);
// 		crawlChartData1y(coin.nameId, coin.rank);
// 		crawlChartDataMax(coin.nameId, coin.rank);
// 	});
// });
// getallCoinsChart();

const coinRunAll = async () => {
	cron.schedule('*/2 * * * *', async () => {
		crawlCoin();
		// updateCurrentcy();
	});
};
// coinRunAll();

// -----------------------------------------------

//--------Gold--------------

const goldRunAll = async () => {
	cron.schedule('*/2 * * * *', async () => {
		const crawlAllDetailPnj = asyncHandler(async () => {
			const arr = ['00', '07', '11', '13', '14', '21'];
			const arrCt = [07];

			arr.forEach((gold, index) => {
				setTimeout(() => {
					crawlPnj(gold, index + 1);
				}, 2000 * index);
			});
		});

		crawlSjc();
		crawlDoji();
		await delay(2000);
		crawlPhuQuySjc();
		crawlBaoTinMinhChau();
		await delay(2000);
		crawlMiHong();
		crawlAllDetailPnj();
	});
};
// goldRunAll();

//----------------------------

//----------Petrol---------------

const petrolRunAll = async () => {
	cron.schedule('*/2 * * * *', async () => {
		crawlPetrolimex();
	});
};
// petrolRunAll();

//-----------------------------

//---------exchangRate--------

const exchangeRateRunAll = async () => {
	cron.schedule('*/2 * * * *', async () => {
		crawlAbBank();
		crawlAgribank();
		await delay(2000);
		crawlVietcombank();
		crawlBidv();
		await delay(2000);
		crawlTechcombank();
		crawlVietinbank();
		await delay(2000);
		crawlMbbank();
	});
};
exchangeRateRunAll();

//-----------------------------

//----------interestRate-----------

const interestRateRunAll = async () => {
	cron.schedule('*/2 * * * *', async () => {
		crawlVietcombankInterestRate(); //
		crawlVietinbankInterestRate(); //
		await delay(2000);
		crawlAgribankbankInterestRate(); //
		crawlBidvInterestRate();
		await delay(2000);
		crawlScbInterestRate();
		crawlMbbankInterestRate();
		await delay(2000);
		crawlVibInterestRate();
		crawlTpbankInterestRate();
		await delay(2000);
		crawlVpbankInterestRate();
	});
};
interestRateRunAll();

//-----------------------------------

// -----------------------------------------------

const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const connectDB = require('./config/db');
const { coinRoutes } = require('./routes/coinRoutes/index');
//------------import Routes--------------------
const {
	hnxStockRoutes,
	hnx30StockRoutes,
	vn30StockRoutes,
	hoseStockRoutes,
	upcomStockRoutes,
} = require('./routes/stockRoutes/index');
const {
	sjcRoutes,
	pnjRoutes,
	dojiRoutes,
	phuQuyRoutes,
	baoTinMinhChauRoutes,
	miHongRoutes,
} = require('./routes/goldRoutes/index');
const { petrolimexRoutes } = require('./routes/petrol/index');
const { priceExchangeRateRoutes } = require('./routes/exchangeRate/index');
const { interestRateRoutes } = require('./routes/interestRate/index');
//----------------------------------------------------------------------
const { del } = require('request');

const app = express();
env.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//------routes cua coin------
app.use('/', coinRoutes);

//---------------------------

//-----routes cua stock------
app.use('/', hnxStockRoutes);
app.use('/', hnx30StockRoutes);
app.use('/', vn30StockRoutes);
app.use('/', hoseStockRoutes);
app.use('/', upcomStockRoutes);

//---------------------------

//-----routes cua vang-----
app.use('/', sjcRoutes);
app.use('/', pnjRoutes);
app.use('/', dojiRoutes);
app.use('/', phuQuyRoutes);
app.use('/', baoTinMinhChauRoutes);
app.use('/', miHongRoutes);

//-------------------------

//-----routes cua petrol--------
app.use('/', petrolimexRoutes);

//----------------------------

//---------routes of exchangeRate----------
app.use('/', priceExchangeRateRoutes);

//-----------------------------------------

//---------routes of interestRate---------------
app.use('/', interestRateRoutes);

//---------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('connect successfully');
});
