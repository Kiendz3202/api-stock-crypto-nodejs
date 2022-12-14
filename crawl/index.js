const crawlCoin = require('./coin/crawlCoin');

const updateCurrentcy = require('./coin/updateCurrentcy');

const {
	crawlChartData1d,
	crawlChartData7d,
	crawlChartData14d,
	crawlChartData30d,
	crawlChartData90d,
	crawlChartData1y,
	crawlChartDataMax,
} = require('./coin/crawlChartData');

const {
	crawlHnx30,
	crawlHnx,
	crawlVn30,
	crawlHose,
	crawlUpcom,
	crawlAllInvesting,
} = require('./stock/crawlStock');

const {
	crawlDetailHnx30,
	crawlDetailHnx,
	crawlDetailVn30,
	crawlDetailHose,
	crawlDetailUpcom,
	crawlDetailAllInvesting,
} = require('./stock/crawlStockDetail');

const { crawlDetailReportChartAll } = require('./stock/crawlReportChart');

const {
	crawlChartHnx30,
	crawlChartHnx,
	crawlChartVn30,
	crawlChartHose,
	crawlChartUpcom,
} = require('./stock/crawlChart');

const {
	crawlSjc,
	crawlPnj,
	crawlDoji,
	crawlPhuQuySjc,
	crawlBaoTinMinhChau,
	crawlMiHong,
} = require('./gold/crawDetailGold');

const { crawlPetrolimex } = require('./petrol/crawlPetrol');

const {
	crawlAgribank,
	crawlVietcombank,
	crawlBidv,
	crawlTechcombank,
	crawlVietinbank,
	crawlMbbank,
} = require('./exchangeRate/crawlExchangeRate');

const {
	crawlVietcombankInterestRate,
	crawlVietinbankInterestRate,
	crawlAgribankbankInterestRate,
	crawlBidvInterestRate,
	crawlScbInterestRate,
	crawlMbbankInterestRate,
	crawlVibInterestRate,
	crawlTpbankInterestRate,
	crawlVpbankInterestRate,
} = require('./interestRate/allBanks/crawlInterestRateAllBanks');

module.exports = {
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
	crawlChartHnx30,
	crawlChartHnx,
	crawlChartVn30,
	crawlChartHose,
	crawlChartUpcom,
	crawlSjc,
	crawlPnj,
	crawlDoji,
	crawlPhuQuySjc,
	crawlBaoTinMinhChau,
	crawlMiHong,
	crawlPetrolimex,
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
};
