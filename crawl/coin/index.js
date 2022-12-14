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
} = require('../index');
const { uploadErrorToDb } = require('../../utils/handleError');

const { delay } = require('../../utils/promise/delayTime/delay');

const Coin = require('../../model/coin/coinModel');
const CoinChart = require('../../model/coin/chartCoin/chartCoinModel');
const { default: axios } = require('axios');
const asyncHandler = require('express-async-handler');

const getallCoinsChart = async () => {
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
};

const coinRunAll = asyncHandler(async () => {
	await Coin.deleteMany({});
	const initialCoinChart = await CoinChart.find({}, { nameId: 1, _id: 0 });
	const initialCoinChartSymbol = initialCoinChart.map((coin) => coin.nameId);

	//crawl 200 coins * 4 pages = 800 coins
	const arr = [1, 2, 3, 4];
	// const arr = [1];
	//coin new
	// const arrCoinNew = [];

	for (const page of arr) {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
			)
			.then((response) => {
				response.data.map(async (coin) => {
					//push symbol to arrCoinNew
					// arrCoinNew.push(coin.symbol);
					//update
					Coin.findOneAndUpdate(
						{ nameId: coin.id },
						{
							name: coin?.name || '',
							symbol: coin?.symbol || '',
							nameId: coin?.id || '',
							image: coin?.image || '',
							priceChange1hPercent:
								coin?.price_change_percentage_1h_in_currency ||
								'',
							priceChange24hPercent:
								coin?.price_change_percentage_24h_in_currency ||
								'',
							priceChange7dPercent:
								coin?.price_change_percentage_7d_in_currency ||
								'',
							priceChange14dPercent:
								coin?.price_change_percentage_14d_in_currency ||
								'',
							priceChange30dPercent:
								coin?.price_change_percentage_30d_in_currency ||
								'',
							priceChange200dPercent:
								coin?.price_change_percentage_200d_in_currency ||
								'',
							priceChange1yPercent:
								coin?.price_change_percentage_1y_in_currency ||
								'',
							'volume24h.usd': coin?.total_volume || '',
							'marketCap.usd': coin?.market_cap || '',
							'currentPrice.usd': coin?.current_price || '',
							'high24h.usd': coin?.high_24h || '',
							'low24h.usd': coin?.low_24h || '',
							'ath.usd': coin?.ath || '',
							'atl.usd': coin?.atl || '',
							'fullyDilutedValuation.usd':
								coin?.fully_diluted_valuation || '',
							rank: coin?.market_cap_rank || '',
							circulatingSupply: coin?.circulating_supply || '',
							totalSupply: coin?.total_supply || '',
							maxSupply: coin?.max_supply || '',
						},
						{ upsert: true }
					)
						// .then((doc) => console.log(doc?.name))
						.catch((err) => console.log(err.message));
				});
			})
			.catch((err) => {
				console.log(
					err.code + ' ' + err.response.status + ' crawl list coin'
				);
				uploadErrorToDb(
					err.code + ' ' + err.response.status + ' crawl list coin'
				);
			});
		await delay(5000);
	}

	await delay(40000);
	// const CoinIsEnough = 800;
	// if ((await Coin.find()).length != CoinIsEnough) {
	// 	console.log('update not enough coins');
	// 	await delay(10000);
	// }

	if (initialCoinChart.length != 0) {
		const arrCoinNew = await Coin.find({}, { nameId: 1, _id: 0 });
		console.log(arrCoinNew.length);
		const arrCoinNewSymbol = arrCoinNew.map((coin) => coin.nameId);
		const coinNeedRemove = initialCoinChartSymbol.filter((coin) =>
			arrCoinNewSymbol.indexOf(coin) > -1 ? false : true
		);
		console.log('coin need remove');
		let countNeedRemove = 0;
		coinNeedRemove.map((coin) => {
			CoinChart.deleteOne({ nameId: coin }).catch((err) =>
				console.log(err)
			);
			countNeedRemove++;
		});
		console.log(countNeedRemove);
		console.log('end coin need remove');
	}

	const coinChartIsEmty = (await CoinChart.count()) ? false : true;
	const currentCoin = await Coin.find({});
	const currentCoinSymbol = currentCoin.map((coin) => ({
		symbol: coin.symbol,
		nameId: coin.nameId,
	}));

	if (coinChartIsEmty) {
		console.log('start vcoinChartIsEmty');
		console.log(currentCoin.length);

		for (const coin of currentCoin) {
			axios
				.get(
					`https://api.coingecko.com/api/v3/coins/${coin.nameId}/market_chart?vs_currency=usd&days=1`
				)
				.then((response) => {
					let arrPrice = [];
					let arrTime = [];

					const dataChart = response.data.prices;
					dataChart.map((item) => {
						arrTime.push(item[0]);
						arrPrice.push(item[1]);
					});

					CoinChart.findOneAndUpdate(
						{ nameId: coin.nameId },
						{
							symbol: coin.symbol,
							nameId: coin.nameId,
							t: arrTime,
							price: arrPrice,
						},
						{ upsert: true }
					)
						// .then((doc) => console.log(doc?.symbol))
						.catch((err) => console.log(err.message));
				})
				.catch((err) => {
					console.log(
						err.code +
							' ' +
							err.response.status +
							' crawl chart coin when chartcoin is empty'
					);
					uploadErrorToDb(
						err.code +
							' ' +
							err.response.status +
							' crawl chart coin when chartcoin is empty'
					);
				});
			await delay(8000);
		}
		console.log('end coinChartIsEmty');
	} else {
		const currentCoinChart = await CoinChart.find(
			{},
			{ symbol: 1, nameId: 1, _id: 0 }
		);
		const currentSymbolCoinChart = currentCoinChart.map(
			(coin) => coin.nameId
		);
		const coinChartNeedupdate = currentCoinSymbol.filter((coin) =>
			currentSymbolCoinChart.indexOf(coin.nameId) > -1 ? false : true
		);
		console.log('coin need update');
		let countNeedUpdate = 0;

		for (const coin of coinChartNeedupdate) {
			countNeedUpdate++;
			axios
				.get(
					`https://api.coingecko.com/api/v3/coins/${coin.nameId}/market_chart?vs_currency=usd&days=1`
				)
				.then((response) => {
					let arrPrice = [];
					let arrTime = [];

					const dataChart = response.data.prices;
					dataChart.map((item) => {
						arrTime.push(item[0]);
						arrPrice.push(item[1]);
					});

					CoinChart.findOneAndUpdate(
						{ nameId: coin.nameId },
						{
							symbol: coin.symbol,
							nameId: coin.nameId,
							t: arrTime,
							price: arrPrice,
						},
						{ upsert: true }
					)
						// .then((doc) => console.log(doc?.symbol))
						.catch((err) => console.log(err.message));
				})
				.catch((err) => {
					console.log(
						err.code +
							' ' +
							err.response.status +
							' crawl chart coin when chartcoin is not empty'
					);
					uploadErrorToDb(
						err.code +
							' ' +
							err.response.status +
							' crawl chart coin when chartcoin is not empty'
					);
				});
			await delay(8000);
		}
		console.log(countNeedUpdate);
		console.log('end coin need update');
	}
});

const updateNewPrice = asyncHandler(async () => {
	const coinIsEmty = (await Coin.count()) ? false : true;
	const coinChartIsEmty = (await CoinChart.count()) ? false : true;

	if (!coinIsEmty) {
		//crawl 200 coins * 6 pages = 1200 coins
		const arr = [1, 2, 3, 4, 5, 6];

		for (const page of arr) {
			axios
				.get(
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
				)
				.then((response) => {
					response.data.map(async (coin) => {
						// const isExistInCoinChart = await CoinChart.find(
						// 	{
						// 		nameId: coin.id,
						// 	}
						// );
						Coin.findOneAndUpdate(
							{ nameId: coin?.id },
							{
								name: coin?.name || '',
								symbol: coin?.symbol || '',
								nameId: coin?.id || '',
								image: coin?.image || '',
								priceChange1hPercent:
									coin?.price_change_percentage_1h_in_currency ||
									'',
								priceChange24hPercent:
									coin?.price_change_percentage_24h_in_currency ||
									'',
								priceChange7dPercent:
									coin?.price_change_percentage_7d_in_currency ||
									'',
								priceChange14dPercent:
									coin?.price_change_percentage_14d_in_currency ||
									'',
								priceChange30dPercent:
									coin?.price_change_percentage_30d_in_currency ||
									'',
								priceChange200dPercent:
									coin?.price_change_percentage_200d_in_currency ||
									'',
								priceChange1yPercent:
									coin?.price_change_percentage_1y_in_currency ||
									'',
								'volume24h.usd': coin?.total_volume || '',
								'marketCap.usd': coin?.market_cap || '',
								'currentPrice.usd': coin?.current_price || '',
								'high24h.usd': coin?.high_24h || '',
								'low24h.usd': coin?.low_24h || '',
								'ath.usd': coin?.ath || '',
								'atl.usd': coin?.atl || '',
								'fullyDilutedValuation.usd':
									coin?.fully_diluted_valuation || '',
								rank: coin?.market_cap_rank || '',
								circulatingSupply:
									coin?.circulating_supply || '',
								totalSupply: coin?.total_supply || '',
								maxSupply: coin?.max_supply || '',
							}
							// { upsert: true }
						)
							// .then((doc) => console.log(doc?.name))
							.catch((err) => console.log(err));

						if (!coinChartIsEmty) {
							CoinChart.findOneAndUpdate(
								{ nameId: coin.id },
								{
									$push: {
										t: Math.floor(Date.now()),
										price: coin.current_price,
									},
								}
								// { upsert: true }
							)
								// .then((doc) => console.log(doc?.symbol))
								.catch((err) => console.log(err.message));
						}
					});
				})
				.catch((err) => {
					console.log(
						err.code +
							' ' +
							err.response.status +
							' crawl coin list'
					);
					uploadErrorToDb(
						err.code +
							' ' +
							err.response.status +
							' crawl coin list'
					);
				});
			await delay(4000);
		}
	}
});

// const UpdateDataChart = async () => {
// 	//crawl 200 coins * 4 pages = 800 coins
// 	const arr = [1, 2, 3, 4];
// 	arr.forEach(async (page, index) => {
// 		setTimeout(() => {
// 			axios
// 				.get(
// 					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
// 				)
// 				.then((response) => {
// 					response.data.map(async (coin) => {
// 						Coin.findOneAndUpdate(
// 							{ name: coin?.name },
// 							{
// 								name: coin?.name || '',
// 								symbol: coin?.symbol || '',
// 								nameId: coin?.id || '',
// 								image: coin?.image || '',
// 								priceChange1hPercent:
// 									coin?.price_change_percentage_1h_in_currency ||
// 									'',
// 								priceChange24hPercent:
// 									coin?.price_change_percentage_24h_in_currency ||
// 									'',
// 								priceChange7dPercent:
// 									coin?.price_change_percentage_7d_in_currency ||
// 									'',
// 								priceChange14dPercent:
// 									coin?.price_change_percentage_14d_in_currency ||
// 									'',
// 								priceChange30dPercent:
// 									coin?.price_change_percentage_30d_in_currency ||
// 									'',
// 								priceChange200dPercent:
// 									coin?.price_change_percentage_200d_in_currency ||
// 									'',
// 								priceChange1yPercent:
// 									coin?.price_change_percentage_1y_in_currency ||
// 									'',
// 								'volume24h.usd': coin?.total_volume || '',
// 								'marketCap.usd': coin?.market_cap || '',
// 								'currentPrice.usd': coin?.current_price || '',
// 								'high24h.usd': coin?.high_24h || '',
// 								'low24h.usd': coin?.low_24h || '',
// 								'ath.usd': coin?.ath || '',
// 								'atl.usd': coin?.atl || '',
// 								'fullyDilutedValuation.usd':
// 									coin?.fully_diluted_valuation || '',
// 								rank: coin?.market_cap_rank || '',
// 								circulatingSupply:
// 									coin?.circulating_supply || '',
// 								totalSupply: coin?.total_supply || '',
// 								maxSupply: coin?.max_supply || '',
// 							},
// 							{ upsert: true }
// 						)
// 							// .then((doc) => console.log(doc?.name))
// 							.catch((err) => console.log(err));

// 						const isExistInCoinChart = await CoinChart.findOne({
// 							symbol: coin.symbol,
// 						});
// 						if (!isExistInCoinChart) {
// 							const arrPrice = [];
// 							const arrTime = [];
// 							axios
// 								.get(
// 									`https://api.coingecko.com/api/v3/coins/${coin.nameId}/market_chart?vs_currency=usd&days=90`
// 								)
// 								.then((response) => {
// 									const dataChart = response.data.prices;
// 									dataChart.map((item) => {
// 										arrTime.push(item[0]);
// 										arrPrice.push(item[1]);
// 									});

// 									CoinChart.findOneAndUpdate(
// 										{ symbol: coin.symbol },
// 										{
// 											symbol: coin.symbol,
// 											t: arrTime,
// 											price: arrPrice,
// 										},
// 										{ upsert: true }
// 									)
// 										// .then((doc) => console.log(doc?.symbol))
// 										.catch((err) => console.log(err));
// 								});
// 						}
// 					});
// 				})
// 				.catch((err) => console.log(err));
// 		}, 1000 * index);
// 	});
// };

module.exports = {
	getallCoinsChart,
	coinRunAll,
	updateNewPrice,
};
