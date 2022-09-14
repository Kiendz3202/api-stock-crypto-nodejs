const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const Chart1d = require('../../model/coin/chartCoin/chart1dModel');
const Chart7d = require('../../model/coin/chartCoin/chart7dModel');
const Chart14d = require('../../model/coin/chartCoin/chart14dModel');
const Chart30d = require('../../model/coin/chartCoin/chart30dModel');
const Chart90d = require('../../model/coin/chartCoin/chart90dModel');
const Chart1y = require('../../model/coin/chartCoin/chart1yModel');
const ChartMax = require('../../model/coin/chartCoin/chartMaxModel');

const crawlChartData1d = asyncHandler(async (nameId, rank) => {
	cron.schedule('* * * * * *', async () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${nameId}/market_chart?vs_currency=usd&days=1`
			)
			.then((response) => {
				Chart1d.findOneAndUpdate(
					{ name: nameId },
					{
						data: response.data.prices,
						rank: rank,
					},
					{ upsert: true }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
});

const crawlChartData7d = asyncHandler(async (nameId, rank) => {
	cron.schedule('* * * * * *', async () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${nameId}/market_chart?vs_currency=usd&days=7`
			)
			.then((response) => {
				Chart7d.findOneAndUpdate(
					{ name: nameId },
					{
						data: response.data.prices,
						rank: rank,
					},
					{ upsert: true }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
});

const crawlChartData14d = asyncHandler(async (nameId, rank) => {
	cron.schedule('*/20 * * * * *', async () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${nameId}/market_chart?vs_currency=usd&days=14`
			)
			.then((response) => {
				Chart14d.findOneAndUpdate(
					{ name: nameId },
					{
						data: response.data.prices,
						rank: rank,
					},
					{ upsert: true }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
});

const crawlChartData30d = asyncHandler(async (nameId, rank) => {
	cron.schedule('* * * * * *', async () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${nameId}/market_chart?vs_currency=usd&days=30`
			)
			.then((response) => {
				Chart30d.findOneAndUpdate(
					{ name: nameId },
					{
						data: response.data.prices,
						rank: rank,
					},
					{ upsert: true }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
});

const crawlChartData90d = asyncHandler(async (nameId, rank) => {
	cron.schedule('* * * * * *', async () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${nameId}/market_chart?vs_currency=usd&days=90`
			)
			.then((response) => {
				Chart90d.findOneAndUpdate(
					{ name: nameId },
					{
						data: response.data.prices,
						rank: rank,
					},
					{ upsert: true }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
});

const crawlChartData1y = asyncHandler(async (nameId, rank) => {
	cron.schedule('* * * * * *', async () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${nameId}/market_chart?vs_currency=usd&days=365`
			)
			.then((response) => {
				Chart1y.findOneAndUpdate(
					{ name: nameId },
					{
						data: response.data.prices,
						rank: rank,
					},
					{ upsert: true }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
});

const crawlChartDataMax = asyncHandler(async (nameId, rank) => {
	cron.schedule('* * * * * *', async () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${nameId}/market_chart?vs_currency=usd&days=max`
			)
			.then((response) => {
				ChartMax.findOneAndUpdate(
					{ name: nameId },
					{
						data: response.data.prices,
						rank: rank,
					},
					{ upsert: true }
				).catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
});

module.exports = {
	crawlChartData1d,
	crawlChartData7d,
	crawlChartData14d,
	crawlChartData30d,
	crawlChartData90d,
	crawlChartData1y,
	crawlChartDataMax,
};
