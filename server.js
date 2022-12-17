//-----import external libraries---
const express = require('express');
const createError = require('http-errors');
const axios = require('axios');
const cors = require('cors');
const env = require('dotenv');
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
// const EventEmitter = require('events');

//import connect DB
const connectDB = require('./config/db');

//------------import Routes--------------------
const { coinRoutes } = require('./routes/coinRoutes/index');
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

const { authRoutes } = require('./routes/authRoutes/index');
//-----------------------------------------------------

const {
	runCrawlGoldPetrolExchangerateInterestRate,
	runCrawlAllDetailStocks,
	runCrawlAllListStocks,
	runCrawlAllChartStocks,
	runCrawlCoin,
} = require('./crawl/finalCombine');
// const { crawlDetailHnx30 } = require('./crawl');
//---------------------------------------------------

// const myEmitter = new EventEmitter();
// myEmitter.setMaxListeners(0);

//--------------------------------------------Main Body------------------------------------------------------------------
// runCrawlCoin();
// runCrawlGoldPetrolExchangerateInterestRate();
// runCrawlAllListStocks();
// runCrawlAllDetailStocks();
// runCrawlAllChartStocks();

// -----------------------------------------------

const app = express();
env.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

//------routes cua coin------
app.use('/api/v1', coinRoutes);

//---------------------------

//-----routes cua stock------
app.use('/api/v1', hnxStockRoutes);
app.use('/api/v1', hnx30StockRoutes);
app.use('/api/v1', vn30StockRoutes);
app.use('/api/v1', hoseStockRoutes);
app.use('/api/v1', upcomStockRoutes);

//---------------------------

//-----routes cua vang-----
app.use('/api/v1', sjcRoutes);
app.use('/api/v1', pnjRoutes);
app.use('/api/v1', dojiRoutes);
app.use('/api/v1', phuQuyRoutes);
app.use('/api/v1', baoTinMinhChauRoutes);
app.use('/api/v1', miHongRoutes);

//-------------------------

//-----routes cua petrol--------
app.use('/api/v1', petrolimexRoutes);

//----------------------------

//---------routes of exchangeRate----------
app.use('/api/v1', priceExchangeRateRoutes);

//-----------------------------------------

//---------routes of interestRate---------------
app.use('/api/v1', interestRateRoutes);

//---------------------------------------------

//--------routes of user-----------------------
app.use('/api/v1', authRoutes);
//-----------------------------------------------

//-----------------ERROR HANDLE---------------------

//handle routes that dont exist
app.use((req, res, next) => {
	next(createError.NotFound('this route doesnt exist'));
});

app.use((err, req, res, next) => {
	res.json({
		status: 'fail',
		code: err.status || 500,
		message: err.message,
	});
});
//-------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('connect successfully');
});
