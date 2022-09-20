const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const Coin = require('../../model/coin/coinModel');

//VND
const updateCurrentcy = asyncHandler(async () => {
	// cron.schedule('*/20 * * * * *', async () => {
	axios
		.get(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=vnd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y'
		)
		.then((response) => {
			response.data.map((coin) => {
				if (coin.fully_diluted_valuation === null) {
					coin.fully_diluted_valuation = 8;
				}
				// if (coin.max_supply == null) {
				//     coin.max_supply = 8
				// }
				// if (coin.total_supply == null) {
				//     coin.total_supply = 8
				// }
				Coin.findOneAndUpdate(
					{ name: coin.name },
					{
						'volume24h.vnd': coin.total_volume,
						'marketCap.vnd': coin.market_cap,
						'high24h.vnd': coin.high_24h,
						'low24h.vnd': coin.low_24h,
						'ath.vnd': coin.ath,
						'atl.vnd': coin.atl,
						'fullyDilutedValuation.vnd':
							coin.fully_diluted_valuation,
						'currentPrice.vnd': coin.current_price,
					}
				)
					.then((doc) => console.log(doc?.name))
					.catch((err) => console.log(err));
			});
		})
		.catch((err) => console.log(err));
	// });
});

module.exports = updateCurrentcy;
