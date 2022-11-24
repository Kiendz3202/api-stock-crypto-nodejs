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
	runCrawlStock,
	runCrawlStockList,
	runCrawlCoin,
} = require('./crawl/finalCombine');
//---------------------------------------------------

// const myEmitter = new EventEmitter();
// myEmitter.setMaxListeners(0);

//--------------------------------------------Main Body------------------------------------------------------------------
runCrawlCoin();
// runCrawlGoldPetrolExchangerateInterestRate();
// runCrawlStockList();
// runCrawlStock();

// -----------------------------------------------

const app = express();
env.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// const querySelectorAll = require('query-selector');
const cheerio = require('cheerio');
// const request = require('request-promise');

// app.use('/', async (req, res) => {
// 	const urlGoldSjc = 'https://webgia.com/gia-vang/sjc';
// 	const result = await axios(urlGoldSjc)
// 		.then((res) => res.data)
// 		.catch((err) => console.log(err));

// 	const $ = cheerio.load(result);
// 	console.log($('#main table tbody :nth-child(1) :nth-child(3)').text()); // chỉnh từ web chính sjc sang web giá, web chính ko trả về html
// 	// console.log($('#price1 table tbody :nth-child(4) :nth-child(2)').text());

// 	res.json($.root().html());
// });

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

//--------routes of user-----------------------
app.use('/auth', authRoutes);
//-----------------------------------------------

//-----------------ERROR HANDLE---------------------

//handle routes that dont exist
app.use((req, res, next) => {
	next(createError.NotFound('this route doesnt exist'));
});

app.use((err, req, res, next) => {
	res.json({
		status: err.status || 500,
		message: err.message,
	});
});
//-------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('connect successfully');
});
