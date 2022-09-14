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
const asyncHandler = require('express-async-handler');
const Coin = require('./model/coin/coinModel');
const axios = require('axios');
const cron = require('node-cron');

const Hnx30 = require('./model/stock/stockList/hnx30Model');
const Hnx = require('./model/stock/stockList/hnxModel');
const Vn30 = require('./model/stock/stockList/vn30Model');
const Hose = require('./model/stock/stockList/hoseModel');
const Upcom = require('./model/stock/stockList/upcomModel');

const AllInvesting = require('./model/stock/stockList/allInvestingModel');
const AllInvestingDetail = require('./model/stock/stockDetail/allInvestingDetailModel');
const Hnx30Detail = require('./model/stock/stockDetail/hnx30DetailModel');

const EventEmitter = require('events');

//https://www.binance.com/bapi/composite/v1/public/promo/cmc/cryptocurrency/detail/chart?id=${i}&range=1D

// const myEmitter = new EventEmitter()
// myEmitter.setMaxListeners(400)
// const delay = (m) => new Promise((r) => setTimeout(r, m));

//--------Gold--------------

// crawlSjc()

const crawlAllDetailPnj = asyncHandler(async () => {
	const arr = ['00', '07', '11', '13', '14', '21'];
	const arrCt = [07];

	arr.forEach((gold, index) => {
		setTimeout(() => {
			crawlPnj(gold, index + 1);
		}, 2000 * index);
	});
});
// crawlAllDetailPnj()

// crawlDoji()
// crawlPhuQuySjc()
// crawlBaoTinMinhChau()
// crawlMiHong()

//----------------------------

//----------Petrol---------------

// crawlPetrolimex()

//-----------------------------

//---------exchangRate--------

// crawlAbBank()
// crawlAgribank()
// crawlVietcombank()
// crawlBidv()
// crawlTechcombank()
// crawlVietinbank()
// crawlMbbank();

//-----------------------------

//----------interestRate-----------
// crawlVietcombankInterestRate();
// crawlVietinbankInterestRate();
// crawlAgribankbankInterestRate();
// crawlBidvInterestRate();
// crawlScbInterestRate();
// crawlMbbankInterestRate();
// crawlVibInterestRate();
// crawlTpbankInterestRate();
// crawlVpbankInterestRate();

//-----------------------------------

//-----------------------------Stock----------------------------------------------------------
// crawlHnx30();
// crawlHnx();
// crawlVn30();
// crawlHose();
// crawlUpcom();

// crawlAllInvesting();

//---crawlAllDetail Stock---
const crawlAllDetailHnx30 = asyncHandler(async () => {
	const list = await Hnx30.find({}).limit(20);

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
});

const crawlAllDetailHnx = asyncHandler(async () => {
	const list = await Hnx.find({}).limit(20);

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
});

const crawlAllDetailVn30 = asyncHandler(async () => {
	const list = await Vn30.find({}).limit(20);

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
});

const crawlAllDetailHose = asyncHandler(async () => {
	const list = await Hose.find({}).limit(20);

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
});

const crawlAllDetailUpcom = asyncHandler(async () => {
	const list = await Upcom.find({}).limit(20);

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
});
//--------------------------

const crawlAllDetailAllInvesting = asyncHandler(async () => {
	const list = await AllInvesting.find({}).limit(20);

	list.forEach(async (stock, index) => {
		setTimeout(() => {
			crawlDetailAllInvesting(stock.id, stock.name, stock.hrefDetail);
		}, 2000 * index);
	});
});

const crawlAllDetailChartHnx = asyncHandler(async () => {
	const list = await Hnx.find({}).limit(10);

	list.forEach(async (stock, index) => {
		setTimeout(() => {
			crawlDetailChartHnx(stock.symbol);
		}, 2000 * index);
	});
});

const crawlAllDetailReportChart = asyncHandler(async () => {
	const list = await AllInvestingDetail.find({}).limit(10);

	list.forEach(async (stock, index) => {
		setTimeout(() => {
			crawlDetailReportChartAll(stock.id, stock.symbol);
		}, index * 2000);
	});
});

// crawlAllDetailHnx30();
// crawlAllDetailHnx();
// crawlAllDetailVn30();
// crawlAllDetailHose();
// crawlAllDetailUpcom();

// crawlAllDetailAllInvesting();

// crawlAllDetailChartHnx();

// crawlAllDetailReportChart();

//---------------------------------------------------------------------------

//-------------Coin------------------

const getallCoinsChart = asyncHandler(async () => {
	const coinList = await Coin.find({}).sort({ rank: 1 }).skip(0).limit(100);

	coinList.forEach((coin) => {
		crawlChartData1d(coin.nameId, coin.rank);
		crawlChartData7d(coin.nameId, coin.rank);
		crawlChartData14d(coin.nameId, coin.rank);
		crawlChartData30d(coin.nameId, coin.rank);
		crawlChartData90d(coin.nameId, coin.rank);
		crawlChartData1y(coin.nameId, coin.rank);
		crawlChartDataMax(coin.nameId, coin.rank);
	});
});
// getallCoinsChart()

// crawlCoin()
// updateCurrentcy()

// -----------------------------------------------
// -----------------------------------------------

const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const connectDB = require('./config/db');
const coinRoutes = require('./routes/coinRoutes');
const stockRoutes = require('./routes/stockRoutes');
// const goldRoutes = require('./routes/goldRoutes/sjcRoutes')
const {
	sjcRoutes,
	pnjRoutes,
	dojiRoutes,
	phuQuyRoutes,
	baoTinMinhChauRoutes,
	miHongRoutes,
} = require('./routes/goldRoutes/index');
const interestRateRoutes = require('./routes/interestRate/interestRateRoutes');
const priceRoutes = require('./routes/exchangeRate/priceOfAllBankRoutes/priceExchangeRateRoutes');

const app = express();
env.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', coinRoutes);

app.use('/', stockRoutes);

//-----routes cua vang-----
app.use('/', sjcRoutes);
app.use('/', pnjRoutes);
app.use('/', dojiRoutes);
app.use('/', phuQuyRoutes);
app.use('/', baoTinMinhChauRoutes);
app.use('/', miHongRoutes);
//-------------------------

//---------routes of exchangeRate----------
app.use('/', priceRoutes);

//-----------------------------------------

//---------routes of interestRate---------------
app.use('/', interestRateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('connect successfully');
});
