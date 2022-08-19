const crawlCoin = require('./crawlCoin')
const updateCurrentcy = require('./updateCurrentcy')
const { crawlChartData1d, crawlChartData7d, crawlChartData14d, crawlChartData30d, crawlChartData90d, crawlChartData1y, crawlChartDataMax } = require('./crawlChartData')
const { crawlHnx30, crawlHnx, crawlVn30, crawlHose, crawlUpcom, crawlHnxInvesting } = require('../stock/crawlStock')
const { crawlDetailHnx30, crawlDetailHnx, crawlDetailVn30, crawlDetailHose, crawlDetailupcom, crawlDetailHnxInvesting } = require('../stock/crawlStockDetail')

module.exports = { crawlCoin, updateCurrentcy, crawlChartData1d, crawlChartData7d, crawlChartData14d, crawlChartData30d, crawlChartData90d, crawlChartData1y, crawlChartDataMax, crawlHnx30, crawlHnx, crawlVn30, crawlHose, crawlUpcom, crawlHnxInvesting, crawlDetailHnx30, crawlDetailHnx, crawlDetailVn30, crawlDetailHose, crawlDetailupcom, crawlDetailHnxInvesting }