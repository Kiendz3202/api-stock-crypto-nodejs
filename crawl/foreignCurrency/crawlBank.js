const asyncHandler = require('express-async-handler')
const cron = require('node-cron')
const puppeteer = require('puppeteer')

const AbBank = require('../../model/foreignCurrency/abBankModel')
const Agribank = require('../../model/foreignCurrency/agribankModel')
const Vietcombank = require('../../model/foreignCurrency/vietcombankModel')
const Bidv = require('../../model/foreignCurrency/bidvModel')
const Techcombank = require('../../model/foreignCurrency/techcombankModel')

const urlAbBank = 'https://www.abbank.vn/thong-tin/ty-gia-ngoai-te-abbank.html'
const urlAgribank = 'https://www.agribank.com.vn/vn/ty-gia'
const urlVietcombank = 'https://portal.vietcombank.com.vn/Personal/TG/Pages/ty-gia.aspx?devicechannel=default'
const urlBidv = 'https://www.bidv.com.vn/vn/ty-gia-ngoai-te'
const urlTechcombank = 'https://www.techcombank.com.vn/cong-cu-tien-ich/ti-gia/ti-gia-hoi-doai'


const crawlAbBank = asyncHandler(async () => {
    // cron.schedule('*/50 * * * * *', async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(urlAbBank, { timeout: 0 })
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

        const bodyHandle = await page.$('body');
        const { height } = await bodyHandle.boundingBox();
        await bodyHandle.dispose();

        // Scroll one viewport at a time, pausing to let content load
        const viewportHeight = page.viewport().height;
        let viewportIncr = 0;
        while (viewportIncr + viewportHeight < height) {
            await page.evaluate(_viewportHeight => {
                window.scrollBy(0, _viewportHeight);
            }, viewportHeight);
            await page.waitForTimeout(2000);
            viewportIncr = viewportIncr + viewportHeight;
        }

        // Scroll back to top
        await page.evaluate(_ => {
            window.scrollTo(0, 0);
        });

        // Some extra delay to let all data load
        await page.waitForTimeout(1000);
        let abBankData = await page.evaluate(async () => {

            // const delay = (m) => new Promise((r) => setTimeout(r, m));

            // document.querySelector(`span[data-value=${symbol}]`).click()

            // await delay(2000);

            let stocks = []


            let dataJson = {}

            try {
                dataJson.name = 'Ngân hàng TMCP An Bình'
                dataJson.symbol = 'ABBank'
                dataJson.timeUpdate = document.querySelector('table tbody :nth-child(10) :nth-child(3) span')?.innerText.slice(-8) + " " + document.querySelector('table tbody :nth-child(9) :nth-child(3) span')?.innerText.slice(-10)

                dataJson.usdBuyCast = document.querySelector('table tbody :nth-child(17) :nth-child(2) span')?.innerText
                dataJson.usdBuyTransfer = document.querySelector('table tbody :nth-child(17) :nth-child(3) span')?.innerText
                dataJson.usdSellTransfer = document.querySelector('table tbody :nth-child(17) :nth-child(4) span')?.innerText
                dataJson.usdSellCast = document.querySelector('table tbody :nth-child(17) :nth-child(5) span')?.innerText

                dataJson.eurBuyCast = document.querySelector('table tbody :nth-child(19) :nth-child(2) span')?.innerText
                dataJson.eurBuyTransfer = document.querySelector('table tbody :nth-child(19) :nth-child(3) span')?.innerText
                dataJson.eurSellTransfer = document.querySelector('table tbody :nth-child(19) :nth-child(4) span')?.innerText
                dataJson.eurSellCast = document.querySelector('table tbody :nth-child(19) :nth-child(5) span')?.innerText

                dataJson.gbpBuyCast = document.querySelector('table tbody :nth-child(20) :nth-child(2) span')?.innerText
                dataJson.gbpBuyTransfer = document.querySelector('table tbody :nth-child(20) :nth-child(3) span')?.innerText
                dataJson.gbpSellTransfer = document.querySelector('table tbody :nth-child(20) :nth-child(4) span')?.innerText
                dataJson.gbpSellCast = document.querySelector('table tbody :nth-child(20) :nth-child(5) span')?.innerText

                dataJson.jpyBuyCast = document.querySelector('table tbody :nth-child(21) :nth-child(2) span')?.innerText
                dataJson.jpyBuyTransfer = document.querySelector('table tbody :nth-child(21) :nth-child(3) span')?.innerText
                dataJson.jpySellTransfer = document.querySelector('table tbody :nth-child(21) :nth-child(4) span')?.innerText
                dataJson.jpySellCast = document.querySelector('table tbody :nth-child(21) :nth-child(5) span')?.innerText

                dataJson.audBuyCast = document.querySelector('table tbody :nth-child(22) :nth-child(2) span')?.innerText
                dataJson.audBuyTransfer = document.querySelector('table tbody :nth-child(22) :nth-child(3) span')?.innerText
                dataJson.audSellTransfer = document.querySelector('table tbody :nth-child(22) :nth-child(4) span')?.innerText
                dataJson.audSellCast = document.querySelector('table tbody :nth-child(22) :nth-child(5) span')?.innerText

                dataJson.cadBuyCast = document.querySelector('table tbody :nth-child(23) :nth-child(2) span')?.innerText
                dataJson.cadBuyTransfer = document.querySelector('table tbody :nth-child(23) :nth-child(3) span')?.innerText
                dataJson.cadSellTransfer = document.querySelector('table tbody :nth-child(23) :nth-child(4) span')?.innerText
                dataJson.cadSellCast = document.querySelector('table tbody :nth-child(23) :nth-child(5) span')?.innerText

                dataJson.nzdBuyCast = document.querySelector('table tbody :nth-child(24) :nth-child(2) span')?.innerText
                dataJson.nzdBuyTransfer = document.querySelector('table tbody :nth-child(24) :nth-child(3) span')?.innerText
                dataJson.nzdSellTransfer = document.querySelector('table tbody :nth-child(24) :nth-child(4) span')?.innerText
                dataJson.nzdSellCast = document.querySelector('table tbody :nth-child(24) :nth-child(5) span')?.innerText

                dataJson.sgdBuyCast = document.querySelector('table tbody :nth-child(25) :nth-child(2) span')?.innerText
                dataJson.sgdBuyTransfer = document.querySelector('table tbody :nth-child(25) :nth-child(3) span')?.innerText
                dataJson.sgdSellTransfer = document.querySelector('table tbody :nth-child(25) :nth-child(4) span')?.innerText
                dataJson.sgdSellCast = document.querySelector('table tbody :nth-child(25) :nth-child(5) span')?.innerText

                dataJson.chfBuyCast = document.querySelector('table tbody :nth-child(26) :nth-child(2) span')?.innerText
                dataJson.chfBuyTransfer = document.querySelector('table tbody :nth-child(26) :nth-child(3) span')?.innerText
                dataJson.chfSellTransfer = document.querySelector('table tbody :nth-child(26) :nth-child(4) span')?.innerText
                dataJson.chfSellCast = document.querySelector('table tbody :nth-child(26) :nth-child(5) span')?.innerText

                dataJson.hkdBuyCast = document.querySelector('table tbody :nth-child(27) :nth-child(2) span')?.innerText
                dataJson.hkdBuyTransfer = document.querySelector('table tbody :nth-child(27) :nth-child(3) span')?.innerText
                dataJson.hkdSellTransfer = document.querySelector('table tbody :nth-child(27) :nth-child(4) span')?.innerText
                dataJson.hkdSellCast = document.querySelector('table tbody :nth-child(27) :nth-child(5) span')?.innerText

                dataJson.krwBuyCast = document.querySelector('table tbody :nth-child(28) :nth-child(2) span')?.innerText
                dataJson.krwBuyTransfer = document.querySelector('table tbody :nth-child(28) :nth-child(3) span')?.innerText
                dataJson.krwSellTransfer = document.querySelector('table tbody :nth-child(28) :nth-child(4) span')?.innerText
                dataJson.krwSellCast = document.querySelector('table tbody :nth-child(28) :nth-child(5) span')?.innerText

            } catch (err) {
                console.log(err)
            }
            return dataJson
        })

        console.log(abBankData)

        AbBank.findOneAndUpdate({ name: abBankData.symbol }, {
            name: abBankData.name,
            symbol: abBankData.symbol,
            timeUpdate: abBankData.timeUpdate,

            usdBuyCast: abBankData.usdBuyCast,
            usdBuyTransfer: abBankData.usdBuyTransfer,
            usdSellTransfer: abBankData.usdSellTransfer,
            usdSellCast: abBankData.usdSellCast,

            eurBuyCast: abBankData.eurBuyCast,
            eurBuyTransfer: abBankData.eurBuyTransfer,
            eurSellTransfer: abBankData.eurSellTransfer,
            eurSellCast: abBankData.eurSellCast,

            gbpBuyCast: abBankData.gbpBuyCast,
            gbpBuyTransfer: abBankData.gbpBuyTransfer,
            gbpSellTransfer: abBankData.gbpSellTransfer,
            gbpSellCast: abBankData.gbpSellCast,

            jpyBuyCast: abBankData.jpyBuyCast,
            jpyBuyTransfer: abBankData.jpyBuyTransfer,
            jpySellTransfer: abBankData.jpySellTransfer,
            jpySellCast: abBankData.jpySellCast,

            audBuyCast: abBankData.audBuyCast,
            audBuyTransfer: abBankData.audBuyTransfer,
            audSellTransfer: abBankData.audSellTransfer,
            audSellCast: abBankData.audSellCast,

            cadBuyCast: abBankData.cadBuyCast,
            cadBuyTransfer: abBankData.cadBuyTransfer,
            cadSellTransfer: abBankData.cadSellTransfer,
            cadSellCast: abBankData.cadSellCast,

            nzdBuyCast: abBankData.nzdBuyCast,
            nzdBuyTransfer: abBankData.nzdBuyTransfer,
            nzdSellTransfer: abBankData.nzdSellTransfer,
            nzdSellCast: abBankData.nzdSellCast,

            sgdBuyCast: abBankData.sgdBuyCast,
            sgdBuyTransfer: abBankData.sgdBuyTransfer,
            sgdSellTransfer: abBankData.sgdSellTransfer,
            sgdSellCast: abBankData.sgdSellCast,

            chfBuyCast: abBankData.chfBuyCast,
            chfBuyTransfer: abBankData.chfBuyTransfer,
            chfSellTransfer: abBankData.chfSellTransfer,
            chfSellCast: abBankData.chfSellCast,

            hkdBuyCast: abBankData.hkdBuyCast,
            hkdBuyTransfer: abBankData.hkdBuyTransfer,
            hkdSellTransfer: abBankData.hkdSellTransfer,
            hkdSellCast: abBankData.hkdSellCast,

            krwBuyCast: abBankData.krwBuyCast,
            krwBuyTransfer: abBankData.krwBuyTransfer,
            krwSellTransfer: abBankData.krwSellTransfer,
            krwSellCast: abBankData.krwSellCast,
        }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(abBankData.symbol))

        await browser.close()
    } catch (error) {
        console.log(error)
    }
    // })
})

const crawlAgribank = asyncHandler(async () => {
    // cron.schedule('*/50 * * * * *', async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(urlAgribank, { timeout: 0 })
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

        const bodyHandle = await page.$('body');
        const { height } = await bodyHandle.boundingBox();
        await bodyHandle.dispose();

        // Scroll one viewport at a time, pausing to let content load
        const viewportHeight = page.viewport().height;
        let viewportIncr = 0;
        while (viewportIncr + viewportHeight < height) {
            await page.evaluate(_viewportHeight => {
                window.scrollBy(0, _viewportHeight);
            }, viewportHeight);
            await page.waitForTimeout(2000);
            viewportIncr = viewportIncr + viewportHeight;
        }

        // Scroll back to top
        await page.evaluate(_ => {
            window.scrollTo(0, 0);
        });

        // Some extra delay to let all data load
        await page.waitForTimeout(1000);
        let agribankData = await page.evaluate(async () => {

            // const delay = (m) => new Promise((r) => setTimeout(r, m));

            // document.querySelector(`span[data-value=${symbol}]`).click()

            // await delay(2000);

            let stocks = []


            let dataJson = {}

            try {
                dataJson.name = 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam'
                dataJson.symbol = 'Agribank'
                dataJson.timeUpdate = document.querySelector('#tyGiaCn div:nth-child(1)')?.innerText.slice(35, 40) + " " + document.querySelector('#tyGiaCn div:nth-child(1)')?.innerText.slice(46, 56)

                dataJson.usdBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(1) :nth-child(2)')?.innerText
                dataJson.usdBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(1) :nth-child(3)')?.innerText
                dataJson.usdSell = document.querySelector('#tyGiaCn table tbody :nth-child(1) :nth-child(4)')?.innerText

                dataJson.eurBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(2) :nth-child(2)')?.innerText
                dataJson.eurBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(2) :nth-child(3)')?.innerText
                dataJson.eurSell = document.querySelector('#tyGiaCn table tbody :nth-child(2) :nth-child(4)')?.innerText

                dataJson.gbpBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(3) :nth-child(2)')?.innerText
                dataJson.gbpBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(3) :nth-child(3)')?.innerText
                dataJson.gbpSell = document.querySelector('#tyGiaCn table tbody :nth-child(3) :nth-child(4)')?.innerText

                dataJson.hkdBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(4) :nth-child(2)')?.innerText
                dataJson.hkdBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(4) :nth-child(3)')?.innerText
                dataJson.hkdSell = document.querySelector('#tyGiaCn table tbody :nth-child(4) :nth-child(4)')?.innerText

                dataJson.chfBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(5) :nth-child(2)')?.innerText
                dataJson.chfBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(5) :nth-child(3)')?.innerText
                dataJson.chfSell = document.querySelector('#tyGiaCn table tbody :nth-child(5) :nth-child(4)')?.innerText

                dataJson.jpyBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(6) :nth-child(2)')?.innerText
                dataJson.jpyBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(6) :nth-child(3)')?.innerText
                dataJson.jpySell = document.querySelector('#tyGiaCn table tbody :nth-child(6) :nth-child(4)')?.innerText

                dataJson.audBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(7) :nth-child(2)')?.innerText
                dataJson.audBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(7) :nth-child(3)')?.innerText
                dataJson.audSell = document.querySelector('#tyGiaCn table tbody :nth-child(7) :nth-child(4)')?.innerText

                dataJson.sgdBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(8) :nth-child(2)')?.innerText
                dataJson.sgdBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(8) :nth-child(3)')?.innerText
                dataJson.sgdSell = document.querySelector('#tyGiaCn table tbody :nth-child(8) :nth-child(4)')?.innerText

                dataJson.thbBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(9) :nth-child(2)')?.innerText
                dataJson.thbBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(9) :nth-child(3)')?.innerText
                dataJson.thbSell = document.querySelector('#tyGiaCn table tbody :nth-child(9) :nth-child(4)')?.innerText

                dataJson.cadBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(10) :nth-child(2)')?.innerText
                dataJson.cadBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(10) :nth-child(3)')?.innerText
                dataJson.cadSell = document.querySelector('#tyGiaCn table tbody :nth-child(10) :nth-child(4)')?.innerText

                dataJson.nzdBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(11) :nth-child(2)')?.innerText
                dataJson.nzdBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(11) :nth-child(3)')?.innerText
                dataJson.nzdSell = document.querySelector('#tyGiaCn table tbody :nth-child(11) :nth-child(4)')?.innerText

                dataJson.krwBuyCast = document.querySelector('#tyGiaCn table tbody :nth-child(12) :nth-child(2)')?.innerText
                dataJson.krwBuyTransfer = document.querySelector('#tyGiaCn table tbody :nth-child(12) :nth-child(3)')?.innerText
                dataJson.krwSell = document.querySelector('#tyGiaCn table tbody :nth-child(12) :nth-child(4)')?.innerText

            } catch (err) {
                console.log(err)
            }
            return dataJson
        })

        console.log(agribankData)

        Agribank.findOneAndUpdate({ name: agribankData.symbol }, {
            name: agribankData.name,
            symbol: agribankData.symbol,
            timeUpdate: agribankData.timeUpdate,

            usdBuyCast: agribankData.usdBuyCast,
            usdBuyTransfer: agribankData.usdBuyTransfer,
            usdSell: agribankData.usdSell,

            eurBuyCast: agribankData.eurBuyCast,
            eurBuyTransfer: agribankData.eurBuyTransfer,
            eurSell: agribankData.eurSell,

            gbpBuyCast: agribankData.gbpBuyCast,
            gbpBuyTransfer: agribankData.gbpBuyTransfer,
            gbpSell: agribankData.gbpSell,

            hkdBuyCast: agribankData.hkdBuyCast,
            hkdBuyTransfer: agribankData.hkdBuyTransfer,
            hkdSell: agribankData.hkdSell,

            chfBuyCast: agribankData.chfBuyCast,
            chfBuyTransfer: agribankData.chfBuyTransfer,
            chfSell: agribankData.chfSell,

            jpyBuyCast: agribankData.jpyBuyCast,
            jpyBuyTransfer: agribankData.jpyBuyTransfer,
            jpySell: agribankData.jpySell,

            audBuyCast: agribankData.audBuyCast,
            audBuyTransfer: agribankData.audBuyTransfer,
            audSell: agribankData.audSell,

            sgdBuyCast: agribankData.sgdBuyCast,
            sgdBuyTransfer: agribankData.sgdBuyTransfer,
            sgdSell: agribankData.sgdSell,

            thbBuyCast: agribankData.thbBuyCast,
            thbBuyTransfer: agribankData.thbBuyTransfer,
            thbSell: agribankData.thbSell,

            cadBuyCast: agribankData.cadBuyCast,
            cadBuyTransfer: agribankData.cadBuyTransfer,
            cadSell: agribankData.cadSell,


            nzdBuyCast: agribankData.nzdBuyCast,
            nzdBuyTransfer: agribankData.nzdBuyTransfer,
            nzdSell: agribankData.nzdSell,

            krwBuyCast: agribankData.krwBuyCast,
            krwBuyTransfer: agribankData.krwBuyTransfer,
            krwSell: agribankData.krwSell,
        }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(agribankData.symbol))

        await browser.close()
    } catch (error) {
        console.log(error)
    }
    // })
})

const crawlVietcombank = asyncHandler(async () => {
    // cron.schedule('*/50 * * * * *', async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
        await page.goto(urlVietcombank, { timeout: 0 })

        // await page.waitForTimeout(3000)

        let vietcombankData = await page.evaluate(async () => {

            // const delay = (m) => new Promise((r) => setTimeout(r, m));

            // await delay(2000);

            let stocks = []


            let dataJson = {}

            try {
                dataJson.name = 'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam'
                dataJson.symbol = 'Vietcombank'
                dataJson.timeUpdate = document.querySelector('#UpdateTime')?.innerText

                dataJson.audBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(3)')?.innerText
                dataJson.audBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(4)')?.innerText
                dataJson.audSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(5)')?.innerText

                dataJson.cadBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(3)')?.innerText
                dataJson.cadBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(4)')?.innerText
                dataJson.cadSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(5)')?.innerText

                dataJson.chfBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(3)')?.innerText
                dataJson.chfBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(4)')?.innerText
                dataJson.chfSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(5)')?.innerText

                dataJson.cnyBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(3)')?.innerText
                dataJson.cnyBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(4)')?.innerText
                dataJson.cnySell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(5)')?.innerText

                dataJson.dkkBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(3)')?.innerText
                dataJson.dkkBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(4)')?.innerText
                dataJson.dkkSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(5)')?.innerText

                dataJson.eurBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(3)')?.innerText
                dataJson.eurBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(4)')?.innerText
                dataJson.eurSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(5)')?.innerText

                dataJson.gbpBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(3)')?.innerText
                dataJson.gbpBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(4)')?.innerText
                dataJson.gbpSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(5)')?.innerText

                dataJson.hkdBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(3)')?.innerText
                dataJson.hkdBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(4)')?.innerText
                dataJson.hkdSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(5)')?.innerText

                dataJson.inrBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(3)')?.innerText
                dataJson.inrBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(4)')?.innerText
                dataJson.inrSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(5)')?.innerText

                dataJson.jpyBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(3)')?.innerText
                dataJson.jpyBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(4)')?.innerText
                dataJson.jpySell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(5)')?.innerText

                dataJson.krwBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(3)')?.innerText
                dataJson.krwBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(4)')?.innerText
                dataJson.krwSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(5)')?.innerText

                dataJson.kwdBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(3)')?.innerText
                dataJson.kwdBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(4)')?.innerText
                dataJson.kwdSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(5)')?.innerText

                dataJson.myrBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(3)')?.innerText
                dataJson.myrBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(4)')?.innerText
                dataJson.myrSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(5)')?.innerText

                dataJson.nokBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(3)')?.innerText
                dataJson.nokBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(4)')?.innerText
                dataJson.nokSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(5)')?.innerText

                dataJson.rubBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(3)')?.innerText
                dataJson.rubBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(4)')?.innerText
                dataJson.rubSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(5)')?.innerText

                dataJson.sarBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(3)')?.innerText
                dataJson.sarBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(4)')?.innerText
                dataJson.sarSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(5)')?.innerText

                dataJson.sekBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(3)')?.innerText
                dataJson.sekBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(4)')?.innerText
                dataJson.sekSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(5)')?.innerText

                dataJson.sgdBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(3)')?.innerText
                dataJson.sgdBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(4)')?.innerText
                dataJson.sgdSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(5)')?.innerText

                dataJson.thbBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(3)')?.innerText
                dataJson.thbBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(4)')?.innerText
                dataJson.thbSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(5)')?.innerText

                dataJson.usdBuyCast = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(3)')?.innerText
                dataJson.usdBuyTransfer = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(4)')?.innerText
                dataJson.usdSell = document.querySelector('#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(5)')?.innerText

            } catch (err) {
                console.log(err)
            }
            return dataJson
        })

        // console.log(vietcombankData)

        Vietcombank.findOneAndUpdate({ symbol: vietcombankData.symbol }, {
            name: vietcombankData.name,
            symbol: vietcombankData.symbol,
            timeUpdate: vietcombankData.timeUpdate,

            audBuyCast: vietcombankData.audBuyCast,
            audBuyTransfer: vietcombankData.audBuyTransfer,
            audSell: vietcombankData.audSell,

            cadBuyCast: vietcombankData.cadBuyCast,
            cadBuyTransfer: vietcombankData.cadBuyTransfer,
            cadSell: vietcombankData.cadSell,

            chfBuyCast: vietcombankData.chfBuyCast,
            chfBuyTransfer: vietcombankData.chfBuyTransfer,
            chfSell: vietcombankData.chfSell,

            cnyBuyCast: vietcombankData.cnyBuyCast,
            cnyBuyTransfer: vietcombankData.cnyBuyTransfer,
            cnySell: vietcombankData.cnySell,

            dkkBuyCast: vietcombankData.dkkBuyCast,
            dkkBuyTransfer: vietcombankData.dkkBuyTransfer,
            dkkSell: vietcombankData.dkkSell,

            eurBuyCast: vietcombankData.eurBuyCast,
            eurBuyTransfer: vietcombankData.eurBuyTransfer,
            eurSell: vietcombankData.eurSell,

            gbpBuyCast: vietcombankData.gbpBuyCast,
            gbpBuyTransfer: vietcombankData.gbpBuyTransfer,
            gbpSell: vietcombankData.gbpSell,

            hkdBuyCast: vietcombankData.hkdBuyCast,
            hkdBuyTransfer: vietcombankData.hkdBuyTransfer,
            hkdSell: vietcombankData.hkdSell,

            inrBuyCast: vietcombankData.inrBuyCast,
            inrBuyTransfer: vietcombankData.inrBuyTransfer,
            inrSell: vietcombankData.inrSell,

            jpyBuyCast: vietcombankData.jpyBuyCast,
            jpyBuyTransfer: vietcombankData.jpyBuyTransfer,
            jpySell: vietcombankData.jpySell,

            krwBuyCast: vietcombankData.krwBuyCast,
            krwBuyTransfer: vietcombankData.krwBuyTransfer,
            krwSell: vietcombankData.krwSell,

            kwdBuyCast: vietcombankData.kwdBuyCast,
            kwdBuyTransfer: vietcombankData.kwdBuyTransfer,
            kwdSell: vietcombankData.kwdSell,

            myrBuyCast: vietcombankData.myrBuyCast,
            myrBuyTransfer: vietcombankData.myrBuyTransfer,
            myrSell: vietcombankData.myrSell,

            nokBuyCast: vietcombankData.nokBuyCast,
            nokBuyTransfer: vietcombankData.nokBuyTransfer,
            nokSell: vietcombankData.nokSell,

            rubBuyCast: vietcombankData.rubBuyCast,
            rubBuyTransfer: vietcombankData.rubBuyTransfer,
            rubSell: vietcombankData.rubSell,

            sarBuyCast: vietcombankData.sarBuyCast,
            sarBuyTransfer: vietcombankData.sarBuyTransfer,
            sarSell: vietcombankData.sarSell,

            sekBuyCast: vietcombankData.sekBuyCast,
            sekBuyTransfer: vietcombankData.sekBuyTransfer,
            sekSell: vietcombankData.sekSell,

            sgdBuyCast: vietcombankData.sgdBuyCast,
            sgdBuyTransfer: vietcombankData.sgdBuyTransfer,
            sgdSell: vietcombankData.sgdSell,

            thbBuyCast: vietcombankData.thbBuyCast,
            thbBuyTransfer: vietcombankData.thbBuyTransfer,
            thbSell: vietcombankData.thbSell,

            usdBuyCast: vietcombankData.usdBuyCast,
            usdBuyTransfer: vietcombankData.usdBuyTransfer,
            usdSell: vietcombankData.usdSell,
        }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(vietcombankData.symbol))

        await browser.close()
    } catch (error) {
        console.log(error)
    }
    // })
})

const crawlBidv = asyncHandler(async () => {
    // cron.schedule('*/50 * * * * *', async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
        await page.goto(urlBidv, { timeout: 0 })

        // await page.waitForTimeout(3000)

        let bidvData = await page.evaluate(async () => {

            // const delay = (m) => new Promise((r) => setTimeout(r, m));

            // await delay(2000);

            let stocks = []


            let dataJson = {}

            try {
                dataJson.name = 'Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam'
                dataJson.symbol = 'Bidv'

                let date = new Date()
                dataJson.timeUpdate = date.getHours() +
                    ":" + date.getMinutes() +
                    ":" + date.getSeconds() +
                    " " + date.getDate() +
                    "/" + (date.getMonth() + 1) +
                    "/" + date.getFullYear()

                dataJson.usdBuyCast = document.querySelector('table tbody :nth-child(1) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.usdBuyTransfer = document.querySelector('table tbody :nth-child(1) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.usdSell = document.querySelector('table tbody :nth-child(1) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.gbpBuyCast = document.querySelector('table tbody :nth-child(4) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.gbpBuyTransfer = document.querySelector('table tbody :nth-child(4) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.gbpSell = document.querySelector('table tbody :nth-child(4) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.hkdBuyCast = document.querySelector('table tbody :nth-child(5) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.hkdBuyTransfer = document.querySelector('table tbody :nth-child(5) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.hkdSell = document.querySelector('table tbody :nth-child(5) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.chfBuyCast = document.querySelector('table tbody :nth-child(6) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.chfBuyTransfer = document.querySelector('table tbody :nth-child(6) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.chfSell = document.querySelector('table tbody :nth-child(6) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.jpyBuyCast = document.querySelector('table tbody :nth-child(7) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.jpyBuyTransfer = document.querySelector('table tbody :nth-child(7) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.jpySell = document.querySelector('table tbody :nth-child(7) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.thbBuyCast = document.querySelector('table tbody :nth-child(8) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.thbBuyTransfer = document.querySelector('table tbody :nth-child(8) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.thbSell = document.querySelector('table tbody :nth-child(8) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.audBuyCast = document.querySelector('table tbody :nth-child(9) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.audBuyTransfer = document.querySelector('table tbody :nth-child(9) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.audSell = document.querySelector('table tbody :nth-child(9) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.cadBuyCast = document.querySelector('table tbody :nth-child(10) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.cadBuyTransfer = document.querySelector('table tbody :nth-child(10) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.cadSell = document.querySelector('table tbody :nth-child(10) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.sgdBuyCast = document.querySelector('table tbody :nth-child(11) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.sgdBuyTransfer = document.querySelector('table tbody :nth-child(11) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.sgdSell = document.querySelector('table tbody :nth-child(11) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.sekBuyCast = document.querySelector('table tbody :nth-child(12) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.sekBuyTransfer = document.querySelector('table tbody :nth-child(12) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.sekSell = document.querySelector('table tbody :nth-child(12) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.lakBuyCast = document.querySelector('table tbody :nth-child(13) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.lakBuyTransfer = document.querySelector('table tbody :nth-child(13) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.lakSell = document.querySelector('table tbody :nth-child(13) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.dkkBuyCast = document.querySelector('table tbody :nth-child(14) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.dkkBuyTransfer = document.querySelector('table tbody :nth-child(14) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.dkkSell = document.querySelector('table tbody :nth-child(14) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.nokBuyCast = document.querySelector('table tbody :nth-child(15) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.nokBuyTransfer = document.querySelector('table tbody :nth-child(15) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.nokSell = document.querySelector('table tbody :nth-child(15) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.cnyBuyCast = document.querySelector('table tbody :nth-child(16) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.cnyBuyTransfer = document.querySelector('table tbody :nth-child(16) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.cnySell = document.querySelector('table tbody :nth-child(16) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.rubBuyCast = document.querySelector('table tbody :nth-child(17) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.rubBuyTransfer = document.querySelector('table tbody :nth-child(17) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.rubSell = document.querySelector('table tbody :nth-child(17) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.nzdBuyCast = document.querySelector('table tbody :nth-child(18) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.nzdBuyTransfer = document.querySelector('table tbody :nth-child(18) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.nzdSell = document.querySelector('table tbody :nth-child(18) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.krwBuyCast = document.querySelector('table tbody :nth-child(19) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.krwBuyTransfer = document.querySelector('table tbody :nth-child(19) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.krwSell = document.querySelector('table tbody :nth-child(19) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.eurBuyCast = document.querySelector('table tbody :nth-child(20) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.eurBuyTransfer = document.querySelector('table tbody :nth-child(20) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.eurSell = document.querySelector('table tbody :nth-child(20) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.twdBuyCast = document.querySelector('table tbody :nth-child(21) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.twdBuyTransfer = document.querySelector('table tbody :nth-child(21) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.twdSell = document.querySelector('table tbody :nth-child(21) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

                dataJson.myrBuyCast = document.querySelector('table tbody :nth-child(22) :nth-child(3) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.myrBuyTransfer = document.querySelector('table tbody :nth-child(22) :nth-child(4) :nth-child(2) :nth-child(2) ')?.innerText
                dataJson.myrSell = document.querySelector('table tbody :nth-child(22) :nth-child(5) :nth-child(2) :nth-child(2) ')?.innerText

            } catch (err) {
                console.log(err)
            }
            return dataJson
        })

        // console.log(bidvData)

        Bidv.findOneAndUpdate({ symbol: bidvData.symbol }, {
            name: bidvData.name,
            symbol: bidvData.symbol,
            timeUpdate: bidvData.timeUpdate,

            usdBuyCast: bidvData.usdBuyCast,
            usdBuyTransfer: bidvData.usdBuyTransfer,
            usdSell: bidvData.usdSell,

            gbpBuyCast: bidvData.gbpBuyCast,
            gbpBuyTransfer: bidvData.gbpBuyTransfer,
            gbpSell: bidvData.gbpSell,

            hkdBuyCast: bidvData.hkdBuyCast,
            hkdBuyTransfer: bidvData.hkdBuyTransfer,
            hkdSell: bidvData.hkdSell,

            chfBuyCast: bidvData.chfBuyCast,
            chfBuyTransfer: bidvData.chfBuyTransfer,
            chfSell: bidvData.chfSell,

            jpyBuyCast: bidvData.jpyBuyCast,
            jpyBuyTransfer: bidvData.jpyBuyTransfer,
            jpySell: bidvData.jpySell,

            thbBuyCast: bidvData.thbBuyCast,
            thbBuyTransfer: bidvData.thbBuyTransfer,
            thbSell: bidvData.thbSell,

            audBuyCast: bidvData.audBuyCast,
            audBuyTransfer: bidvData.audBuyTransfer,
            audSell: bidvData.audSell,

            cadBuyCast: bidvData.cadBuyCast,
            cadBuyTransfer: bidvData.cadBuyTransfer,
            cadSell: bidvData.cadSell,

            sgdBuyCast: bidvData.sgdBuyCast,
            sgdBuyTransfer: bidvData.sgdBuyTransfer,
            sgdSell: bidvData.sgdSell,

            sekBuyCast: bidvData.sekBuyCast,
            sekBuyTransfer: bidvData.sekBuyTransfer,
            sekSell: bidvData.sekSell,

            lakBuyCast: bidvData.lakBuyCast,
            lakBuyTransfer: bidvData.lakBuyTransfer,
            lakSell: bidvData.lakSell,

            dkkBuyCast: bidvData.dkkBuyCast,
            dkkBuyTransfer: bidvData.dkkBuyTransfer,
            dkkSell: bidvData.dkkSell,

            nokBuyCast: bidvData.nokBuyCast,
            nokBuyTransfer: bidvData.nokBuyTransfer,
            nokSell: bidvData.nokSell,

            cnyBuyCast: bidvData.cnyBuyCast,
            cnyBuyTransfer: bidvData.cnyBuyTransfer,
            cnySell: bidvData.cnySell,

            rubBuyCast: bidvData.rubBuyCast,
            rubBuyTransfer: bidvData.rubBuyTransfer,
            rubSell: bidvData.rubSell,

            nzdBuyCast: bidvData.nzdBuyCast,
            nzdBuyTransfer: bidvData.nzdBuyTransfer,
            nzdSell: bidvData.nzdSell,

            krwBuyCast: bidvData.krwBuyCast,
            krwBuyTransfer: bidvData.krwBuyTransfer,
            krwSell: bidvData.krwSell,


            eurBuyCast: bidvData.eurBuyCast,
            eurBuyTransfer: bidvData.eurBuyTransfer,
            eurSell: bidvData.eurSell,

            twdBuyCast: bidvData.twdBuyCast,
            twdBuyTransfer: bidvData.twdBuyTransfer,
            twdSell: bidvData.twdSell,

            myrBuyCast: bidvData.myrBuyCast,
            myrBuyTransfer: bidvData.myrBuyTransfer,
            myrSell: bidvData.myrSell,
        }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(bidvData.symbol))

        await browser.close()
    } catch (error) {
        console.log(error)
    }
    // })
})

const crawlTechcombank = asyncHandler(async () => {
    // cron.schedule('*/50 * * * * *', async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
        await page.goto(urlTechcombank, { timeout: 0 })

        // await page.waitForTimeout(3000)

        let techcombankData = await page.evaluate(async () => {

            // const delay = (m) => new Promise((r) => setTimeout(r, m));

            // await delay(2000);

            let stocks = []


            let dataJson = {}

            try {
                dataJson.name = 'Ngân hàng Thương mại cổ phần Kỹ Thương Việt Nam'
                dataJson.symbol = 'Techcombank'

                let date = new Date()
                dataJson.timeUpdate = date.getHours() +
                    ":" + date.getMinutes() +
                    ":" + date.getSeconds() +
                    " " + date.getDate() +
                    "/" + (date.getMonth() + 1) +
                    "/" + date.getFullYear()

                dataJson.audBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(5) :nth-child(2) strong ')?.innerText
                dataJson.audBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(5) :nth-child(3) strong ')?.innerText
                dataJson.audSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(5) :nth-child(4) strong ')?.innerText

                dataJson.cadBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(7) :nth-child(2) strong ')?.innerText
                dataJson.cadBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(7) :nth-child(3) strong ')?.innerText
                dataJson.cadSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(7) :nth-child(4) strong ')?.innerText

                dataJson.chfBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(9) :nth-child(2) strong ')?.innerText
                dataJson.chfBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(9) :nth-child(3) strong ')?.innerText
                dataJson.chfSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(9) :nth-child(4) strong ')?.innerText

                dataJson.cnyBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(11) :nth-child(2) strong ')?.innerText
                dataJson.cnyBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(11) :nth-child(3) strong ')?.innerText
                dataJson.cnySell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(11) :nth-child(4) strong ')?.innerText

                dataJson.eurBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(13) :nth-child(2) strong ')?.innerText
                dataJson.eurBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(13) :nth-child(3) strong ')?.innerText
                dataJson.eurSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(13) :nth-child(4) strong ')?.innerText

                dataJson.gbpBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(15) :nth-child(2) strong ')?.innerText
                dataJson.gbpBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(15) :nth-child(3) strong ')?.innerText
                dataJson.gbpSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(15) :nth-child(4) strong ')?.innerText

                dataJson.hkdBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(17) :nth-child(2) strong ')?.innerText
                dataJson.hkdBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(17) :nth-child(3) strong ')?.innerText
                dataJson.hkdSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(17) :nth-child(4) strong ')?.innerText

                dataJson.jpyBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(19) :nth-child(2) strong ')?.innerText
                dataJson.jpyBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(19) :nth-child(3) strong ')?.innerText
                dataJson.jpySell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(19) :nth-child(4) strong ')?.innerText

                dataJson.krwBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(21) :nth-child(2) strong ')?.innerText
                dataJson.krwBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(21) :nth-child(3) strong ')?.innerText
                dataJson.krwSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(21) :nth-child(4) strong ')?.innerText

                dataJson.myrBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(23) :nth-child(2) strong ')?.innerText
                dataJson.myrBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(23) :nth-child(3) strong ')?.innerText
                dataJson.myrSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(23) :nth-child(4) strong ')?.innerText

                dataJson.sgdBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(25) :nth-child(2) strong ')?.innerText
                dataJson.sgdBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(25) :nth-child(3) strong ')?.innerText
                dataJson.sgdSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(25) :nth-child(4) strong ')?.innerText

                dataJson.thbBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(27) :nth-child(2) strong ')?.innerText
                dataJson.thbBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(27) :nth-child(3) strong ')?.innerText
                dataJson.thbSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(27) :nth-child(4) strong ')?.innerText

                dataJson.usdBuyCast = document.querySelector('#exchangeFilterContainer table tbody :nth-child(33) :nth-child(2) strong ')?.innerText
                dataJson.usdBuyTransfer = document.querySelector('#exchangeFilterContainer table tbody :nth-child(33) :nth-child(3) strong ')?.innerText
                dataJson.usdSell = document.querySelector('#exchangeFilterContainer table tbody :nth-child(33) :nth-child(4) strong ')?.innerText

            } catch (err) {
                console.log(err)
            }
            return dataJson
        })

        console.log(techcombankData)

        // Techcombank.findOneAndUpdate({ symbol: techcombankData.symbol }, {
        //     name: techcombankData.name,
        //     symbol: techcombankData.symbol,
        //     timeUpdate: techcombankData.timeUpdate,


        // }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(techcombankData.symbol))

        await browser.close()
    } catch (error) {
        console.log(error)
    }
    // })
})

module.exports = { crawlAbBank, crawlAgribank, crawlVietcombank, crawlBidv, crawlTechcombank }