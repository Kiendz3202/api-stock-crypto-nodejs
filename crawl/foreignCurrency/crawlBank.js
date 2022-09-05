const asyncHandler = require('express-async-handler')
const cron = require('node-cron')
const puppeteer = require('puppeteer')

const AbBank = require('../../model/foreignCurrency/abBankModel')
const Acb = require('../../model/foreignCurrency/acbModel')

const urlAbBank = 'https://www.abbank.vn/thong-tin/ty-gia-ngoai-te-abbank.html'
const urlAcb = 'https://www.acb.com.vn/wps/portal/Home/exchange'


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

const crawlAcb = asyncHandler(async () => {
    // cron.schedule('*/50 * * * * *', async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(urlAcb, { timeout: 0 })
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
        let acbData = await page.evaluate(async () => {

            // const delay = (m) => new Promise((r) => setTimeout(r, m));

            // document.querySelector(`span[data-value=${symbol}]`).click()

            // await delay(2000);

            let stocks = []


            let dataJson = {}

            try {
                dataJson.name = 'Ngân hàng TMCP An Bình'
                dataJson.symbol = 'ABBank'
                // dataJson.timeUpdate = 

                dataJson.usdBuyCast = document.querySelector('#tygiant table tbody :nth-child(2) :nth-child(3)')?.innerText
                // dataJson.usdBuyTransfer = document.querySelector('#tygiant table tbody tr:nth-child(2) td:nth-child(4)')?.innerText
                // dataJson.usdSellCast = document.querySelector('#tygiant table tbody tr:nth-child(2) td:nth-child(5)')?.innerText
                // dataJson.usdSellTransfer = document.querySelector('#tygiant table tbody tr:nth-child(2) td:nth-child(6)')?.innerText



            } catch (err) {
                console.log(err)
            }
            return dataJson
        })

        console.log(acbData)

        // Acb.findOneAndUpdate({ name: acbData.symbol }, {
        //     name: abBankData.name,
        //     symbol: abBankData.symbol,
        //     timeUpdate: abBankData.timeUpdate,

        //     usdBuyCast: abBankData.usdBuyCast,
        //     usdBuyTransfer: abBankData.usdBuyTransfer,
        //     usdSellTransfer: abBankData.usdSellTransfer,
        //     usdSellCast: abBankData.usdSellCast,

        //     eurBuyCast: abBankData.eurBuyCast,
        //     eurBuyTransfer: abBankData.eurBuyTransfer,
        //     eurSellTransfer: abBankData.eurSellTransfer,
        //     eurSellCast: abBankData.eurSellCast,

        //     gbpBuyCast: abBankData.gbpBuyCast,
        //     gbpBuyTransfer: abBankData.gbpBuyTransfer,
        //     gbpSellTransfer: abBankData.gbpSellTransfer,
        //     gbpSellCast: abBankData.gbpSellCast,

        //     jpyBuyCast: abBankData.jpyBuyCast,
        //     jpyBuyTransfer: abBankData.jpyBuyTransfer,
        //     jpySellTransfer: abBankData.jpySellTransfer,
        //     jpySellCast: abBankData.jpySellCast,

        //     audBuyCast: abBankData.audBuyCast,
        //     audBuyTransfer: abBankData.audBuyTransfer,
        //     audSellTransfer: abBankData.audSellTransfer,
        //     audSellCast: abBankData.audSellCast,

        //     cadBuyCast: abBankData.cadBuyCast,
        //     cadBuyTransfer: abBankData.cadBuyTransfer,
        //     cadSellTransfer: abBankData.cadSellTransfer,
        //     cadSellCast: abBankData.cadSellCast,

        //     nzdBuyCast: abBankData.nzdBuyCast,
        //     nzdBuyTransfer: abBankData.nzdBuyTransfer,
        //     nzdSellTransfer: abBankData.nzdSellTransfer,
        //     nzdSellCast: abBankData.nzdSellCast,

        //     sgdBuyCast: abBankData.sgdBuyCast,
        //     sgdBuyTransfer: abBankData.sgdBuyTransfer,
        //     sgdSellTransfer: abBankData.sgdSellTransfer,
        //     sgdSellCast: abBankData.sgdSellCast,

        //     chfBuyCast: abBankData.chfBuyCast,
        //     chfBuyTransfer: abBankData.chfBuyTransfer,
        //     chfSellTransfer: abBankData.chfSellTransfer,
        //     chfSellCast: abBankData.chfSellCast,

        //     hkdBuyCast: abBankData.hkdBuyCast,
        //     hkdBuyTransfer: abBankData.hkdBuyTransfer,
        //     hkdSellTransfer: abBankData.hkdSellTransfer,
        //     hkdSellCast: abBankData.hkdSellCast,

        //     krwBuyCast: abBankData.krwBuyCast,
        //     krwBuyTransfer: abBankData.krwBuyTransfer,
        //     krwSellTransfer: abBankData.krwSellTransfer,
        //     krwSellCast: abBankData.krwSellCast,
        // }, { upsert: true }).then(doc => console.log(doc)).catch(err => console.log(acbData.symbol))

        await browser.close()
    } catch (error) {
        console.log(error)
    }
    // })
})

module.exports = { crawlAbBank, crawlAcb }