const asyncHandler = require('express-async-handler')
const cron = require('node-cron')
const axios = require('axios')
const puppeteer = require('puppeteer')
const Hnx30 = require('../../model/stock/stockList/hnx30Model')
const Hnx = require('../../model/stock/stockList/hnxModel')
const Vn30 = require('../../model/stock/stockList/vn30Model')
const Hose = require('../../model/stock/stockList/hoseModel')
const Upcom = require('../../model/stock/stockList/upcomModel')

const Hnx30Detail = require('../../model/stock/stockDetail/hnx30DetailModel')
const HnxDetail = require('../../model/stock/stockDetail/hnxDetailModel')
const HoseDetail = require('../../model/stock/stockDetail/hoseDetailModel')
const Vn30Detail = require('../../model/stock/stockDetail/vn30DetailModel')
const UpcomDetail = require('../../model/stock/stockDetail/upcomDetailModel')

const HnxInvestingDetail = require('../../model/stock/stockDetail/hnxInvestingDetailModel')


const urlHnx30 = 'https://banggia.vietstock.vn/bang-gia/hnx30'
const urlHnx = 'https://banggia.vietstock.vn/bang-gia/hnx'
const urlVn30 = 'https://banggia.vietstock.vn/bang-gia/vn30'
const urlHose = 'https://banggia.vietstock.vn/bang-gia/hose'
const urlUpcom = 'https://banggia.vietstock.vn/bang-gia/upcom'




const crawlDetailHnx30 = asyncHandler(async (symbol) => {
    // cron.schedule('*/20 * * * * *', async () =>{

    // const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

    // let selector = `td[data-tooltip = ${name}]`


    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(urlHnx30)
    // await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
    // await page.click(`[data-value = ${symbol}]`)
    // const selector = await page.$(`#sym-328`)
    // await page.waitForSelector(`span[data-value=${symbol}]`)
    // await page.click('#sym-328')
    // await page.click(`[data-value=${symbol}]`)
    // await page.waitForSelector('#symbol-detail-popup', { visible: true })
    // await page.evaluate(selector, (selector) => selector.click())
    await page.waitForTimeout(2000)

    let hnx30DetailData = await page.evaluate(async (symbol) => {

        const delay = (m) => new Promise((r) => setTimeout(r, m));

        document.querySelector(`span[data-value=${symbol}]`).click()

        await delay(2000);

        let stocks = []

        let stockDataElement = document.getElementById('data-trading')
        let stockChartElement = document.getElementById('frame-chart')
        let popup = document.getElementById('symbol-detail-popup')

        let dataJson = {}

        try {
            const nameSymbolElement = document.getElementById('link-finance')
            dataJson.name = nameSymbolElement.querySelectorAll('span')[1].innerText;
            dataJson.symbol = nameSymbolElement.querySelectorAll('span')[0].innerText;

            const priceBasicElement = document.querySelector('.table-basic tbody tr')

            dataJson.reference = priceBasicElement.querySelectorAll('td')[0].innerText
            dataJson.ceil = priceBasicElement.querySelectorAll('td')[1].innerText
            dataJson.floor = priceBasicElement.querySelectorAll('td')[2].innerText

            dataJson.currentPrice = document.querySelector('.last-price-number span span').innerText

            dataJson.high = stockDataElement.querySelectorAll('.table-middle tbody tr td')[1].innerText
            dataJson.low = stockDataElement.querySelectorAll('.table-middle tbody tr td')[2].innerText

            dataJson.change = document.querySelectorAll('.change-number-rate span')[0].innerText
            dataJson.changePercent = document.querySelectorAll('.change-number-rate span')[1].innerText

            dataJson.openPrice = stockDataElement.querySelectorAll('.table-middle tbody tr td')[0].innerText

            const sumElement = stockDataElement.querySelectorAll('.table-sum tbody tr')[1]
            dataJson.turnOver = sumElement.querySelectorAll('td')[0].innerText
            dataJson.sumValue = sumElement.querySelectorAll('td')[1].innerText

            dataJson.urlChart = stockChartElement.getAttribute('src')

            const rowElement1 = stockDataElement.querySelectorAll('.table-sum tbody tr')[5]
            const rowElement2 = stockDataElement.querySelectorAll('.table-sum tbody tr')[6]
            const rowElement3 = stockDataElement.querySelectorAll('.table-sum tbody tr')[7]

            const turnOverBuyArr = []
            const buyPriceArr = []
            const sellPriceArr = []
            const turnOverSellArr = []

            turnOverBuyArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)

            buyPriceArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)

            sellPriceArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)

            turnOverSellArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)

            dataJson.turnOverBuy = turnOverBuyArr
            dataJson.turnOverSell = turnOverSellArr
            dataJson.buyPrice = buyPriceArr
            dataJson.sellPrice = sellPriceArr


        } catch (err) {
            console.log(err)
        }
        return dataJson
    }, symbol)

    Hnx30Detail.findOneAndUpdate({ name: hnx30DetailData.name }, {
        name: hnx30DetailData.name,
        symbol: hnx30DetailData.symbol,
        reference: hnx30DetailData.reference,
        ceil: hnx30DetailData.ceil,
        floor: hnx30DetailData.floor,
        currentPrice: hnx30DetailData.currentPrice,
        change: hnx30DetailData.change,
        changePercent: hnx30DetailData.changePercent,
        openPrice: hnx30DetailData.openPrice,
        high: hnx30DetailData.high,
        low: hnx30DetailData.low,
        turnOver: hnx30DetailData.turnOver,
        sumValue: hnx30DetailData.sumValue,
        turnOverBuy: hnx30DetailData.turnOverBuy,
        turnOverSell: hnx30DetailData.turnOverSell,
        buyPrice: hnx30DetailData.buyPrice,
        sellPrice: hnx30DetailData.sellPrice,
        urlChart: hnx30DetailData.urlChart
    }, { upsert: true }).then(doc => console.log(doc.symbol)).catch(err => console.log(hnx30DetailData.name))

    // return hnx30DetailData

    await browser.close()
    // })
})

const crawlDetailHnx = asyncHandler(async (symbol) => {
    // cron.schedule('*/20 * * * * *', async () =>{

    // const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

    // let selector = `td[data-tooltip = ${name}]`


    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();

    await page.goto(urlHnx)
    // await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
    // await page.click(`[data-value = ${symbol}]`)
    // const selector = await page.$(`#sym-328`)
    // await page.waitForSelector(`span[data-value=${symbol}]`)
    // await page.click('#sym-328')
    await page.waitForTimeout(2000)
    // await page.click(`[data-value=${symbol}]`)
    // await page.waitForSelector('#symbol-detail-popup', { visible: true })

    // await page.evaluate(selector, (selector) => selector.click())
    // await page.waitForTimeout(3000)
    let hnxDetailData = await page.evaluate(async (symbol) => {

        const delay = (m) => new Promise((r) => setTimeout(r, m));

        document.querySelector(`span[data-value=${symbol}]`).click()

        await delay(2000);

        let stocks = []

        let stockDataElement = document.getElementById('data-trading')
        let stockChartElement = document.getElementById('frame-chart')
        let popup = document.getElementById('symbol-detail-popup')

        let dataJson = {}

        try {
            const nameSymbolElement = document.getElementById('link-finance')
            dataJson.name = nameSymbolElement.querySelectorAll('span')[1].innerText;
            dataJson.symbol = nameSymbolElement.querySelectorAll('span')[0].innerText;

            const priceBasicElement = document.querySelector('.table-basic tbody tr')

            dataJson.reference = priceBasicElement.querySelectorAll('td')[0].innerText
            dataJson.ceil = priceBasicElement.querySelectorAll('td')[1].innerText
            dataJson.floor = priceBasicElement.querySelectorAll('td')[2].innerText

            dataJson.currentPrice = document.querySelector('.last-price-number span span').innerText

            dataJson.high = stockDataElement.querySelectorAll('.table-middle tbody tr td')[1].innerText
            dataJson.low = stockDataElement.querySelectorAll('.table-middle tbody tr td')[2].innerText

            dataJson.change = document.querySelectorAll('.change-number-rate span')[0].innerText
            dataJson.changePercent = document.querySelectorAll('.change-number-rate span')[1].innerText

            dataJson.openPrice = stockDataElement.querySelectorAll('.table-middle tbody tr td')[0].innerText

            const sumElement = stockDataElement.querySelectorAll('.table-sum tbody tr')[1]
            dataJson.turnOver = sumElement.querySelectorAll('td')[0].innerText
            dataJson.sumValue = sumElement.querySelectorAll('td')[1].innerText

            dataJson.urlChart = stockChartElement.getAttribute('src')

            const rowElement1 = stockDataElement.querySelectorAll('.table-sum tbody tr')[5]
            const rowElement2 = stockDataElement.querySelectorAll('.table-sum tbody tr')[6]
            const rowElement3 = stockDataElement.querySelectorAll('.table-sum tbody tr')[7]

            const turnOverBuyArr = []
            const buyPriceArr = []
            const sellPriceArr = []
            const turnOverSellArr = []

            turnOverBuyArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)

            buyPriceArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)

            sellPriceArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)

            turnOverSellArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)

            dataJson.turnOverBuy = turnOverBuyArr
            dataJson.turnOverSell = turnOverSellArr
            dataJson.buyPrice = buyPriceArr
            dataJson.sellPrice = sellPriceArr


        } catch (err) {
            console.log(err)
        }
        return dataJson
    }, symbol)

    console.log(hnxDetailData)

    // HnxDetail.findOneAndUpdate({ name: hnxDetailData.name }, {
    //     name: hnxDetailData.name,
    //     symbol: hnxDetailData.symbol,
    //     reference: hnxDetailData.reference,
    //     ceil: hnxDetailData.ceil,
    //     floor: hnxDetailData.floor,
    //     currentPrice: hnxDetailData.currentPrice,
    //     change: hnxDetailData.change,
    //     changePercent: hnxDetailData.changePercent,
    //     openPrice: hnxDetailData.openPrice,
    //     high: hnxDetailData.high,
    //     low: hnxDetailData.low,
    //     turnOver: hnxDetailData.turnOver,
    //     sumValue: hnxDetailData.sumValue,
    //     turnOverBuy: hnxDetailData.turnOverBuy,
    //     turnOverSell: hnxDetailData.turnOverSell,
    //     buyPrice: hnxDetailData.buyPrice,
    //     sellPrice: hnxDetailData.sellPrice,
    //     urlChart: hnxDetailData.urlChart
    // }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(hnxDetailData.name))

    // return hnxDetailData

    await browser.close()
    // })
})

const crawlDetailVn30 = asyncHandler(async (symbol) => {
    // cron.schedule('*/20 * * * * *', async () =>{

    // const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

    // let selector = `td[data-tooltip = ${name}]`


    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(urlVn30)
    // await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
    // await page.click(`[data-value = ${symbol}]`)
    // const selector = await page.$(`#sym-328`)
    // await page.waitForSelector(`span[data-value=${symbol}]`)
    // await page.click('#sym-328')
    // await page.click(`[data-value=${symbol}]`)
    // await page.waitForSelector('#symbol-detail-popup', { visible: true })
    // await page.evaluate(selector, (selector) => selector.click())
    await page.waitForTimeout(2000)

    let vn30DetailData = await page.evaluate(async (symbol) => {
        const delay = (m) => new Promise((r) => setTimeout(r, m));

        document.querySelector(`span[data-value=${symbol}]`).click()

        await delay(2000);

        let stocks = []

        let stockDataElement = document.getElementById('data-trading')
        let stockChartElement = document.getElementById('frame-chart')
        let popup = document.getElementById('symbol-detail-popup')

        let dataJson = {}

        try {
            const nameSymbolElement = document.getElementById('link-finance')
            dataJson.name = nameSymbolElement.querySelectorAll('span')[1].innerText;
            dataJson.symbol = nameSymbolElement.querySelectorAll('span')[0].innerText;

            const priceBasicElement = document.querySelector('.table-basic tbody tr')

            dataJson.reference = priceBasicElement.querySelectorAll('td')[0].innerText
            dataJson.ceil = priceBasicElement.querySelectorAll('td')[1].innerText
            dataJson.floor = priceBasicElement.querySelectorAll('td')[2].innerText

            dataJson.currentPrice = document.querySelector('.last-price-number span span').innerText

            dataJson.high = stockDataElement.querySelectorAll('.table-middle tbody tr td')[1].innerText
            dataJson.low = stockDataElement.querySelectorAll('.table-middle tbody tr td')[2].innerText

            dataJson.change = document.querySelectorAll('.change-number-rate span')[0].innerText
            dataJson.changePercent = document.querySelectorAll('.change-number-rate span')[1].innerText

            dataJson.openPrice = stockDataElement.querySelectorAll('.table-middle tbody tr td')[0].innerText

            const sumElement = stockDataElement.querySelectorAll('.table-sum tbody tr')[1]
            dataJson.turnOver = sumElement.querySelectorAll('td')[0].innerText
            dataJson.sumValue = sumElement.querySelectorAll('td')[1].innerText

            dataJson.urlChart = stockChartElement.getAttribute('src')

            const rowElement1 = stockDataElement.querySelectorAll('.table-sum tbody tr')[5]
            const rowElement2 = stockDataElement.querySelectorAll('.table-sum tbody tr')[6]
            const rowElement3 = stockDataElement.querySelectorAll('.table-sum tbody tr')[7]

            const turnOverBuyArr = []
            const buyPriceArr = []
            const sellPriceArr = []
            const turnOverSellArr = []

            turnOverBuyArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)

            buyPriceArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)

            sellPriceArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)

            turnOverSellArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)

            dataJson.turnOverBuy = turnOverBuyArr
            dataJson.turnOverSell = turnOverSellArr
            dataJson.buyPrice = buyPriceArr
            dataJson.sellPrice = sellPriceArr


        } catch (err) {
            console.log(err)
        }
        return dataJson
    }, symbol)

    Vn30Detail.findOneAndUpdate({ name: vn30DetailData.name }, {
        name: vn30DetailData.name,
        symbol: vn30DetailData.symbol,
        reference: vn30DetailData.reference,
        ceil: vn30DetailData.ceil,
        floor: vn30DetailData.floor,
        currentPrice: vn30DetailData.currentPrice,
        change: vn30DetailData.change,
        changePercent: vn30DetailData.changePercent,
        openPrice: vn30DetailData.openPrice,
        high: vn30DetailData.high,
        low: vn30DetailData.low,
        turnOver: vn30DetailData.turnOver,
        sumValue: vn30DetailData.sumValue,
        turnOverBuy: vn30DetailData.turnOverBuy,
        turnOverSell: vn30DetailData.turnOverSell,
        buyPrice: vn30DetailData.buyPrice,
        sellPrice: vn30DetailData.sellPrice,
        urlChart: vn30DetailData.urlChart
    }, { upsert: true }).then(doc => console.log(doc.symbol)).catch(err => console.log(err))

    // return vn30DetailData

    await browser.close()
    // })
})

const crawlDetailHose = asyncHandler(async (symbol) => {
    // cron.schedule('*/20 * * * * *', async () =>{

    // const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

    // let selector = `td[data-tooltip = ${name}]`


    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(urlHose)
    // await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
    // await page.click(`[data-value = ${symbol}]`)
    // const selector = await page.$(`#sym-328`)
    // await page.waitForSelector(`span[data-value=${symbol}]`)
    // await page.click('#sym-328')
    // await page.click(`[data-value=${symbol}]`)
    // await page.waitForSelector('#symbol-detail-popup', { visible: true })
    // await page.evaluate(selector, (selector) => selector.click())
    await page.waitForTimeout(2000)

    let hoseDetailData = await page.evaluate(async (symbol) => {
        const delay = (m) => new Promise((r) => setTimeout(r, m));

        document.querySelector(`span[data-value=${symbol}]`).click()

        await delay(2000);

        let stocks = []

        let stockDataElement = document.getElementById('data-trading')
        let stockChartElement = document.getElementById('frame-chart')
        let popup = document.getElementById('symbol-detail-popup')

        let dataJson = {}

        try {
            const nameSymbolElement = document.getElementById('link-finance')
            dataJson.name = nameSymbolElement.querySelectorAll('span')[1].innerText;
            dataJson.symbol = nameSymbolElement.querySelectorAll('span')[0].innerText;

            const priceBasicElement = document.querySelector('.table-basic tbody tr')

            dataJson.reference = priceBasicElement.querySelectorAll('td')[0].innerText
            dataJson.ceil = priceBasicElement.querySelectorAll('td')[1].innerText
            dataJson.floor = priceBasicElement.querySelectorAll('td')[2].innerText

            dataJson.currentPrice = document.querySelector('.last-price-number span span').innerText

            dataJson.high = stockDataElement.querySelectorAll('.table-middle tbody tr td')[1].innerText
            dataJson.low = stockDataElement.querySelectorAll('.table-middle tbody tr td')[2].innerText

            dataJson.change = document.querySelectorAll('.change-number-rate span')[0].innerText
            dataJson.changePercent = document.querySelectorAll('.change-number-rate span')[1].innerText

            dataJson.openPrice = stockDataElement.querySelectorAll('.table-middle tbody tr td')[0].innerText

            const sumElement = stockDataElement.querySelectorAll('.table-sum tbody tr')[1]
            dataJson.turnOver = sumElement.querySelectorAll('td')[0].innerText
            dataJson.sumValue = sumElement.querySelectorAll('td')[1].innerText

            dataJson.urlChart = stockChartElement.getAttribute('src')

            const rowElement1 = stockDataElement.querySelectorAll('.table-sum tbody tr')[5]
            const rowElement2 = stockDataElement.querySelectorAll('.table-sum tbody tr')[6]
            const rowElement3 = stockDataElement.querySelectorAll('.table-sum tbody tr')[7]

            const turnOverBuyArr = []
            const buyPriceArr = []
            const sellPriceArr = []
            const turnOverSellArr = []

            turnOverBuyArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)

            buyPriceArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)

            sellPriceArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)

            turnOverSellArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)

            dataJson.turnOverBuy = turnOverBuyArr
            dataJson.turnOverSell = turnOverSellArr
            dataJson.buyPrice = buyPriceArr
            dataJson.sellPrice = sellPriceArr


        } catch (err) {
            console.log(err)
        }
        return dataJson
    }, symbol)

    HoseDetail.findOneAndUpdate({ name: hoseDetailData.name }, {
        name: hoseDetailData.name,
        symbol: hoseDetailData.symbol,
        reference: hoseDetailData.reference,
        ceil: hoseDetailData.ceil,
        floor: hoseDetailData.floor,
        currentPrice: hoseDetailData.currentPrice,
        change: hoseDetailData.change,
        changePercent: hoseDetailData.changePercent,
        openPrice: hoseDetailData.openPrice,
        high: hoseDetailData.high,
        low: hoseDetailData.low,
        turnOver: hoseDetailData.turnOver,
        sumValue: hoseDetailData.sumValue,
        turnOverBuy: hoseDetailData.turnOverBuy,
        turnOverSell: hoseDetailData.turnOverSell,
        buyPrice: hoseDetailData.buyPrice,
        sellPrice: hoseDetailData.sellPrice,
        urlChart: hoseDetailData.urlChart
    }, { upsert: true }).then(doc => console.log(doc.symbol)).catch(err => console.log(err))

    // return hoseDetailData

    await browser.close()
    // })
})

const crawlDetailupcom = asyncHandler(async (symbol) => {
    // cron.schedule('*/20 * * * * *', async () =>{

    // const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

    // let selector = `td[data-tooltip = ${name}]`


    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(urlUpcom)
    // await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
    // await page.click(`[data-value = ${symbol}]`)
    // const selector = await page.$(`#sym-328`)
    // await page.waitForSelector(`span[data-value=${symbol}]`)
    // await page.click('#sym-328')
    // await page.click(`[data-value=${symbol}]`)
    // await page.waitForSelector('#symbol-detail-popup', { visible: true })
    // await page.evaluate(selector, (selector) => selector.click())
    await page.waitForTimeout(2000)

    let upcomDetailData = await page.evaluate(async (symbol) => {
        const delay = (m) => new Promise((r) => setTimeout(r, m));

        document.querySelector(`span[data-value=${symbol}]`).click()

        await delay(2000);

        let stocks = []

        let stockDataElement = document.getElementById('data-trading')
        let stockChartElement = document.getElementById('frame-chart')
        let popup = document.getElementById('symbol-detail-popup')

        let dataJson = {}

        try {
            const nameSymbolElement = document.getElementById('link-finance')
            dataJson.name = nameSymbolElement.querySelectorAll('span')[1].innerText;
            dataJson.symbol = nameSymbolElement.querySelectorAll('span')[0].innerText;

            const priceBasicElement = document.querySelector('.table-basic tbody tr')

            dataJson.reference = priceBasicElement.querySelectorAll('td')[0].innerText
            dataJson.ceil = priceBasicElement.querySelectorAll('td')[1].innerText
            dataJson.floor = priceBasicElement.querySelectorAll('td')[2].innerText

            dataJson.currentPrice = document.querySelector('.last-price-number span span').innerText

            dataJson.high = stockDataElement.querySelectorAll('.table-middle tbody tr td')[1].innerText
            dataJson.low = stockDataElement.querySelectorAll('.table-middle tbody tr td')[2].innerText

            dataJson.change = document.querySelectorAll('.change-number-rate span')[0].innerText
            dataJson.changePercent = document.querySelectorAll('.change-number-rate span')[1].innerText

            dataJson.openPrice = stockDataElement.querySelectorAll('.table-middle tbody tr td')[0].innerText

            const sumElement = stockDataElement.querySelectorAll('.table-sum tbody tr')[1]
            dataJson.turnOver = sumElement.querySelectorAll('td')[0].innerText
            dataJson.sumValue = sumElement.querySelectorAll('td')[1].innerText

            dataJson.urlChart = stockChartElement.getAttribute('src')

            const rowElement1 = stockDataElement.querySelectorAll('.table-sum tbody tr')[5]
            const rowElement2 = stockDataElement.querySelectorAll('.table-sum tbody tr')[6]
            const rowElement3 = stockDataElement.querySelectorAll('.table-sum tbody tr')[7]

            const turnOverBuyArr = []
            const buyPriceArr = []
            const sellPriceArr = []
            const turnOverSellArr = []

            turnOverBuyArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)
            turnOverBuyArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[0].innerText)

            buyPriceArr.push(rowElement1.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement2.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)
            buyPriceArr.push(rowElement3.querySelectorAll('td')[0].querySelectorAll('span')[3].innerText)

            sellPriceArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)
            sellPriceArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[1].innerText)

            turnOverSellArr.push(rowElement1.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement2.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)
            turnOverSellArr.push(rowElement3.querySelectorAll('td')[1].querySelectorAll('span')[3].innerText)

            dataJson.turnOverBuy = turnOverBuyArr
            dataJson.turnOverSell = turnOverSellArr
            dataJson.buyPrice = buyPriceArr
            dataJson.sellPrice = sellPriceArr


        } catch (err) {
            console.log(err)
        }
        return dataJson
    }, symbol)

    UpcomDetail.findOneAndUpdate({ name: upcomDetailData.name }, {
        name: upcomDetailData.name,
        symbol: upcomDetailData.symbol,
        reference: upcomDetailData.reference,
        ceil: upcomDetailData.ceil,
        floor: upcomDetailData.floor,
        currentPrice: upcomDetailData.currentPrice,
        change: upcomDetailData.change,
        changePercent: upcomDetailData.changePercent,
        openPrice: upcomDetailData.openPrice,
        high: upcomDetailData.high,
        low: upcomDetailData.low,
        turnOver: upcomDetailData.turnOver,
        sumValue: upcomDetailData.sumValue,
        turnOverBuy: upcomDetailData.turnOverBuy,
        turnOverSell: upcomDetailData.turnOverSell,
        buyPrice: upcomDetailData.buyPrice,
        sellPrice: upcomDetailData.sellPrice,
        urlChart: upcomDetailData.urlChart
    }, { upsert: true }).then(doc => console.log(doc.symbol)).catch(err => console.log(err))

    // return upcomDetailData

    await browser.close()
    // })
})

const crawlDetailHnxInvesting = asyncHandler(async (id, name, change, changePercent, high, low, turnOver, time, hrefDetail) => {
    // cron.schedule('*/20 * * * * *', async () =>{

    // const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

    // let selector = `td[data-tooltip = ${name}]`

    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        let status = await page.goto(`https://vn.investing.com${hrefDetail}`, { timeout: 0 })
        // await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
        // await page.click(`[data-value = ${symbol}]`)
        // const selector = await page.$(`#sym-328`)
        // await page.waitForSelector(`span[data-value=${symbol}]`)
        // await page.click('#sym-328')
        // await page.click(`[data-value=${symbol}]`)
        // await page.waitForSelector('#symbol-detail-popup', { visible: true })
        // await page.evaluate(selector, (selector) => selector.click())
        await page.waitForTimeout(3000)

        // const bodyHandle = await page.$('body');
        // const { height } = await bodyHandle.boundingBox();
        // await bodyHandle.dispose();

        // // Scroll one viewport at a time, pausing to let content load
        // const viewportHeight = page.viewport().height;
        // let viewportIncr = 0;
        // while (viewportIncr + viewportHeight < height) {
        //     await page.evaluate(_viewportHeight => {
        //         window.scrollBy(0, _viewportHeight);
        //     }, viewportHeight);
        //     await page.waitForTimeout(2000);
        //     viewportIncr = viewportIncr + viewportHeight;
        // }

        // // Scroll back to top
        // await page.evaluate(_ => {
        //     window.scrollTo(0, 0);
        // });

        // // Some extra delay to let all data load
        // await page.waitForTimeout(1000);

        let hnxInvestingDetailData = await page.evaluate(async (id, name, change, changePercent, high, low, turnOver, time) => {
            const delay = (m) => new Promise((r) => setTimeout(r, m));

            // document.querySelector(`span[data-value=${symbol}]`).click()

            // await delay(2000);

            let stocks = []

            // let mainElement = document.querySelector("div[data-set='chat-panel-main']").previousSibling
            // let infoCompanyElement = mainElement.querySelector(':nth-last-child(2)')


            let dataJson = {}

            try {

                // dataJson.id = 'id'
                // dataJson.name = "name"
                // dataJson.symbol = 'symbol'
                // dataJson.currentPrice = 'currentPrice'
                // dataJson.reference = "reference"
                // dataJson.openPrice = 'openPrice'
                // dataJson.buyPrice = 'buyPrice'
                // dataJson.sellPrice = 'sellPrice'
                // dataJson.high = "high"
                // dataJson.low = "low"
                // dataJson.low1Year = 'low1year'
                // dataJson.high1Year = 'high1year'
                // dataJson.change = "change"
                // dataJson.changePercent = "changePercent"
                // dataJson.changePercent1Year = 'changePercent1Year'
                // dataJson.turnOver = "turnOver"
                // dataJson.turnOverAverage3Month = 'turnOverAverage3Month'
                // dataJson.marketcap = 'marketcap'
                // dataJson.p2eRatio = 'p2eRatio'
                // dataJson.revenue = 'revenue'
                // dataJson.eps = 'eps'
                // dataJson.dividend = 'dividend'
                // dataJson.timeReport = 'dividend'
                // dataJson.descriptionCompany = 'descriptionCompany'
                // dataJson.major = 'major'
                // dataJson.field = 'field'
                // dataJson.numberOfEmployees = 'numberOfEmployees'
                // dataJson.marketLocation = 'marketLocation'

                dataJson.descriptionCompany = document.getElementsByClassName('company-profile_profile-description__30Rta')[0].innerText
                let mainElement = document.querySelectorAll(".instrumentOverview_overview-section__2hN4A")[5]
                dataJson.major = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(1) a ').innerText
                dataJson.field = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(2) a ').innerText
                dataJson.numberOfEmployees = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(3) :nth-child(2) ').innerText
                dataJson.marketLocation = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(4) a ').innerText
                dataJson.id = id
                dataJson.name = name
                dataJson.symbol = document.querySelector('main div h2').innerText.slice(10)
                dataJson.currentPrice = document.querySelector("span[data-test='instrument-price-last']").innerText
                dataJson.referencePrice = document.querySelector('dl div:nth-child(1) dd span :nth-child(1)').innerText + document.querySelector('dl div:nth-child(1) dd span :nth-child(2)').innerText
                dataJson.openPrice = document.querySelector('dl div:nth-child(4) dd span :nth-child(1)').innerText + document.querySelector('dl div:nth-child(4) dd span :nth-child(2)').innerText
                dataJson.buyPrice = document.querySelector('[data-test="instrument-header-details"] :nth-child(3) :nth-child(2) :nth-child(2) :nth-child(1)').innerText
                dataJson.sellPrice = document.querySelector('[data-test="instrument-header-details"] :nth-child(3) :nth-child(2) :nth-child(2) :nth-child(3)').innerText
                dataJson.high = high
                dataJson.low = low
                dataJson.low1Year = document.querySelector('dl div:nth-child(5) dd span:nth-child(1) span:nth-child(1)').innerText
                dataJson.high1Year = document.querySelector('dl div:nth-child(5) dd span:nth-child(3) span:nth-child(1)').innerText
                dataJson.change = change
                dataJson.changePercent = changePercent
                dataJson.changePercent1Year = document.querySelector('dl div:nth-child(13) dd span span:nth-child(1)').innerText + "%"
                dataJson.turnOver = turnOver
                dataJson.turnOverAverage3Month = document.querySelector('dl div:nth-child(10) dd span span:nth-child(1)').innerText
                dataJson.marketcap = document.querySelector('dl div:nth-child(8) dd span span:nth-child(1)').innerText + document.querySelector('dl div:nth-child(8) dd span span:nth-child(2)').innerText
                dataJson.p2eRatio = document.querySelector('dl div:nth-child(11) dd span span:nth-child(1)').innerText
                dataJson.revenue = document.querySelector('dl div:nth-child(3) dd span span:nth-child(1)').innerText + document.querySelector('dl div:nth-child(3) dd span span:nth-child(2)').innerText
                dataJson.eps = document.querySelector('dl div:nth-child(6) dd span span:nth-child(1)').innerText + document.querySelector('dl div:nth-child(6) dd span span:nth-child(2)').innerText
                dataJson.dividend = document.querySelector('dl div:nth-child(9) dd div :nth-child(1) :nth-child(1)').innerText + document.querySelector('dl div:nth-child(9) dd div :nth-child(1) :nth-child(2)').innerText + "(" + document.querySelector('dl div:nth-child(9) dd div :nth-child(2) :nth-child(2) :nth-child(1)').innerText + document.querySelector('dl div:nth-child(9) dd div :nth-child(2) :nth-child(2) :nth-child(2)').innerText + ")" || ""
                dataJson.timeReport = document.querySelector('dl div:nth-child(15) dd a').innerText
            } catch (err) {
                console.log(err)
            }
            // await delay(2000);
            return dataJson
        }, id, name, change, changePercent, high, low, turnOver, time)

        // console.log(hnxInvestingDetailData)



        HnxInvestingDetail.findOneAndUpdate({ name: hnxInvestingDetailData.name }, {
            id: hnxInvestingDetailData.id,
            name: hnxInvestingDetailData.name,
            symbol: hnxInvestingDetailData.symbol,
            currentPrice: hnxInvestingDetailData.currentPrice,
            referencePrice: hnxInvestingDetailData.referencePrice,
            openPrice: hnxInvestingDetailData.openPrice,
            buyPrice: hnxInvestingDetailData.buyPrice,
            sellPrice: hnxInvestingDetailData.sellPrice,
            high: hnxInvestingDetailData.high,
            low: hnxInvestingDetailData.low,
            high1Year: hnxInvestingDetailData.high1Year,
            low1Year: hnxInvestingDetailData.low1Year,
            change: hnxInvestingDetailData.change,
            changePercent: hnxInvestingDetailData.changePercent,
            changePercent1Year: hnxInvestingDetailData.changePercent1Year,
            turnOver: hnxInvestingDetailData.turnOver,
            turnOverAverage3Month: hnxInvestingDetailData.turnOverAverage3Month,
            marketcap: hnxInvestingDetailData.marketcap,
            p2eRatio: hnxInvestingDetailData.p2eRatio,
            revenue: hnxInvestingDetailData.revenue,
            eps: hnxInvestingDetailData.eps,
            dividend: hnxInvestingDetailData.dividend,
            timeReport: hnxInvestingDetailData.timeReport,
            descriptionCompany: hnxInvestingDetailData.descriptionCompany,
            major: hnxInvestingDetailData.major,
            field: hnxInvestingDetailData.field,
            numberOfEmployees: hnxInvestingDetailData.numberOfEmployees,
            marketLocation: hnxInvestingDetailData.marketLocation
        }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(err))

        // return upcomDetailData

        await browser.close()
    } catch (error) {
        console.log(error)
    }

    // })
})

module.exports = { crawlDetailHnx30, crawlDetailHnx, crawlDetailVn30, crawlDetailHose, crawlDetailupcom, crawlDetailHnxInvesting }