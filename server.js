const { crawlCoin, updateCurrentcy, crawlChartData1d, crawlChartData7d, crawlChartData14d, crawlChartData30d, crawlChartData90d, crawlChartData1y, crawlChartDataMax, crawlHnx30, crawlHnx, crawlVn30, crawlHose, crawlUpcom, crawlHnxInvesting, crawlDetailHnx30, crawlDetailHnx, crawlDetailVn30, crawlDetailHose, crawlDetailupcom, crawlDetailHnxInvesting } = require('./crawl/coin/index')
const asyncHandler = require('express-async-handler')
const Coin = require('./model/coin/coinModel')
const axios = require('axios')
const cron = require('node-cron')
const Hnx30 = require('./model/stock/stockList/hnx30Model')
const Hnx = require('./model/stock/stockList/hnxModel')
const HnxInvesting = require('./model/stock/stockList/hnxInvestingModel')
const Hnx30Detail = require('./model/stock/stockDetail/hnx30DetailModel')
const EventEmitter = require('events')

//https://www.binance.com/bapi/composite/v1/public/promo/cmc/cryptocurrency/detail/chart?id=${i}&range=1D

// const myEmitter = new EventEmitter()
// myEmitter.setMaxListeners(400)
// const delay = (m) => new Promise((r) => setTimeout(r, m));

const getallCoinsChart = asyncHandler(async () => {
    const coinList = await Coin.find({}).sort({ rank: 1 }).skip(0).limit(100)

    coinList.forEach((coin) => {
        crawlChartData1d(coin.nameId, coin.rank)
        crawlChartData7d(coin.nameId, coin.rank)
        crawlChartData14d(coin.nameId, coin.rank)
        crawlChartData30d(coin.nameId, coin.rank)
        crawlChartData90d(coin.nameId, coin.rank)
        crawlChartData1y(coin.nameId, coin.rank)
        crawlChartDataMax(coin.nameId, coin.rank)
    })
})

// crawlHnx30()
// crawlHnx()
// crawlVn30()
// crawlHose()
// crawlUpcom()

// crawlHnxInvesting()

const crawlAllDetailHnx30 = asyncHandler(async () => {
    const list = await Hnx30.find({})
    let sum = 0
    list.forEach(async (stock, index) => {
        setTimeout(() => {
            crawlDetailHnx30(stock.symbol)
        }, 2000 * index)
    })
})

const crawlAllDetailHnx = asyncHandler(async () => {
    const list = await Hnx.find({}).limit(6)

    list.forEach(async (stock, index) => {
        setTimeout(() => {
            crawlDetailHnx(stock.symbol)
        }, 2000 * index)
    })
})

const crawlAllDetailHnxInvesting = asyncHandler(async () => {
    const list = await HnxInvesting.find({}).limit(10)

    list.forEach(async (stock, index) => {
        setTimeout(() => {
            crawlDetailHnxInvesting(stock.id, stock.name, stock.change, stock.changePercent, stock.high, stock.low, stock.turnOver, stock.time, stock.hrefDetail)
        }, 2000 * index)
    })
})



// crawlAllDetailHnx30()
// crawlAllDetailHnx()

crawlAllDetailHnxInvesting()

// getallCoinsChart()


// crawlCoin()
// updateCurrentcy()

// -----------------------------------------------
// -----------------------------------------------



const express = require('express')
const cors = require('cors')
const env = require('dotenv')
const connectDB = require('./config/db')
const coinRoutes = require('./routes/coinRoutes')

const app = express()
env.config()
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.use('/', coinRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('connect successfully')
})