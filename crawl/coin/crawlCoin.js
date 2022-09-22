const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const Coin = require('../../model/coin/coinModel');
const CoinChart = require('../../model/coin/chartCoin/chartCoinModel');

const crawlCoin = asyncHandler(async () => {
	// cron.schedule('*/20 * * * * *', async () => {
	axios
		.get(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y'
		)
		.then((response) => {
			response.data.map((coin) => {
				coin.currentTimestamp = Math.floor(Date.now() / 1000);

				if (coin.fully_diluted_valuation === null) {
					coin.fully_diluted_valuation = 8;
				}
				if (coin.max_supply == null) {
					coin.max_supply = 8;
				}
				if (coin.total_supply == null) {
					coin.total_supply = 8;
				}

				Coin.findOneAndUpdate(
					{ name: coin.name },
					{
						name: coin.name,
						symbol: coin.symbol,
						nameId: coin.id,
						image: coin.image,
						priceChange1hPercent:
							coin.price_change_percentage_1h_in_currency,
						priceChange24hPercent:
							coin.price_change_percentage_24h_in_currency,
						priceChange7dPercent:
							coin.price_change_percentage_7d_in_currency,
						priceChange14dPercent:
							coin.price_change_percentage_14d_in_currency,
						priceChange30dPercent:
							coin.price_change_percentage_30d_in_currency,
						priceChange200dPercent:
							coin.price_change_percentage_200d_in_currency,
						priceChange1yPercent:
							coin.price_change_percentage_1y_in_currency,
						'volume24h.usd': coin.total_volume,
						'marketCap.usd': coin.market_cap,
						'currentPrice.usd': coin.current_price,
						'high24h.usd': coin.high_24h,
						'low24h.usd': coin.low_24h,
						'ath.usd': coin.ath,
						'atl.usd': coin.atl,
						'fullyDilutedValuation.usd':
							coin.fully_diluted_valuation,
						rank: coin.market_cap_rank,
						circulatingSupply: coin.circulating_supply,
						totalSupply: coin.total_supply,
						maxSupply: coin.max_supply,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.name))
					.catch((err) => console.log(err));

				CoinChart.findOneAndUpdate(
					{ symbol: coin.symbol },
					{
						symbol: coin.symbol,
						$push: {
							t: coin.currentTimestamp,
							price: coin.current_price,
						},
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log(err));
			});
		})
		.catch((err) => console.log(err));
	// });
});

module.exports = crawlCoin;
