const crawlCoin = require('./coin/crawlCoin')

const updateCurrentcy = require('./coin/updateCurrentcy')

const { crawlChartData1d, crawlChartData7d, crawlChartData14d, crawlChartData30d, crawlChartData90d, crawlChartData1y, crawlChartDataMax } = require('./coin/crawlChartData')

const { crawlHnx30, crawlHnx, crawlVn30, crawlHose, crawlUpcom, crawlHnxInvesting } = require('./stock/crawlStock')

const { crawlDetailHnx30, crawlDetailHnx, crawlDetailVn30, crawlDetailHose, crawlDetailupcom, crawlDetailHnxInvesting } = require('./stock/crawlStockDetail')

const { crawlDetailReportChartHnx } = require('./stock/crawlReportChart')

const { crawlDetailChartHnx } = require('./stock/crawlChart')

const { crawlSjc, crawlPnj, crawlDoji, crawlPhuQuySjc, crawlBaoTinMinhChau, crawlMiHong } = require('./gold/crawDetailGold')

const { crawlPetrolimex } = require('./petrol/crawlPetrol')

const { crawlAbBank, crawlAgribank, crawlVietcombank, crawlBidv, crawlTechcombank } = require('./foreignCurrency/crawlBank')

module.exports = { crawlCoin, updateCurrentcy, crawlChartData1d, crawlChartData7d, crawlChartData14d, crawlChartData30d, crawlChartData90d, crawlChartData1y, crawlChartDataMax, crawlHnx30, crawlHnx, crawlVn30, crawlHose, crawlUpcom, crawlHnxInvesting, crawlDetailHnx30, crawlDetailHnx, crawlDetailVn30, crawlDetailHose, crawlDetailupcom, crawlDetailHnxInvesting, crawlDetailReportChartHnx, crawlDetailChartHnx, crawlSjc, crawlPnj, crawlDoji, crawlPhuQuySjc, crawlBaoTinMinhChau, crawlMiHong, crawlPetrolimex, crawlAbBank, crawlAgribank, crawlVietcombank, crawlBidv, crawlTechcombank }