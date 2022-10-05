const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const puppeteer = require('puppeteer');

const {
	collectQueryDataHeightScroll,
} = require('../../utils/pupperteer/collectQueryData');

const Petrolimex = require('../../model/petrol/petrolimexModel');

const urlPetrolimex =
	'https://www.petrolimex.com.vn/thong-tin-khach-hang.html#cuahangxangdau';

const crawlPetrolimex = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		const $ = document.querySelector.bind(document);

		let dataJson = {};

		try {
			dataJson.name = 'Petrolimex';

			let date = new Date();
			dataJson.timeUpdate =
				date.getHours() +
				':' +
				date.getMinutes() +
				':' +
				date.getSeconds() +
				' ' +
				date.getDate() +
				'/' +
				(date.getMonth() + 1) +
				'/' +
				date.getFullYear();

			const tableElement = $('tbody.product');

			dataJson.ron95v_1 = tableElement.querySelector(
				'tr:nth-child(1) td:nth-child(2)'
			)?.innerText;
			dataJson.ron95v_2 = tableElement.querySelector(
				'tr:nth-child(1) td:nth-child(3)'
			)?.innerText;

			dataJson.ron95III_1 = tableElement.querySelector(
				'tr:nth-child(2) td:nth-child(2)'
			)?.innerText;
			dataJson.ron95III_2 = tableElement.querySelector(
				'tr:nth-child(2) td:nth-child(3)'
			)?.innerText;

			dataJson.ron92II_1 = tableElement.querySelector(
				'tr:nth-child(3) td:nth-child(2)'
			)?.innerText;
			dataJson.ron92II_2 = tableElement.querySelector(
				'tr:nth-child(3) td:nth-child(3)'
			)?.innerText;

			dataJson.do0001SV_1 = tableElement.querySelector(
				'tr:nth-child(4) td:nth-child(2)'
			)?.innerText;
			dataJson.do0001SV_2 = tableElement.querySelector(
				'tr:nth-child(4) td:nth-child(3)'
			)?.innerText;

			dataJson.do005SII_1 = tableElement.querySelector(
				'tr:nth-child(5) td:nth-child(2)'
			)?.innerText;
			dataJson.do005SII_2 = tableElement.querySelector(
				'tr:nth-child(5) td:nth-child(3)'
			)?.innerText;

			dataJson.dauhoa_1 = tableElement.querySelector(
				'tr:nth-child(6) td:nth-child(2)'
			)?.innerText;
			dataJson.dauhoa_2 = tableElement.querySelector(
				'tr:nth-child(6) td:nth-child(3)'
			)?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryDataHeightScroll(
			urlPetrolimex,
			pageEvaluateFunc
		);
		attemps++;

		if (data) {
			console.log(data);
			Petrolimex.findOneAndUpdate(
				{ name: data.name },
				{
					name: data.name,
					timeUpdate: data.timeUpdate,
					ron95v_1: data.ron95v_1,
					ron95v_2: data.ron95v_2,
					ron95III_1: data.ron95III_1,
					ron95III_2: data.ron95III_2,
					ron92II_1: data.ron92II_1,
					ron92II_2: data.ron92II_2,
					do0001SV_1: data.do0001SV_1,
					do0001SV_2: data.do0001SV_2,
					do005SII_1: data.do005SII_1,
					do005SII_2: data.do005SII_2,
					dauhoa_1: data.dauhoa_1,
					dauhoa_2: data.dauhoa_2,
				},
				{ upsert: true }
			)
				// .then((doc) => console.log(doc))
				.catch((err) => console.log(data.symbol));

			// await browser.close();
		}

		if (data === false) {
			//wait a few second, also a good idea to swap proxy here
			console.log('Recrawl........' + attemps);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
});

module.exports = { crawlPetrolimex };

// const crawlPetrolimex = asyncHandler(async () => {
// 	// cron.schedule('*/60 * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			// headless: true,
// 			// executablePath: '/usr/bin/chromium-browser',
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.goto(urlPetrolimex, { timeout: 0 });
// 		// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
// 		// await page.click(`[data-value = ${symbol}]`)
// 		// const selector = await page.$(`#sym-328`)
// 		// await page.waitForSelector(`span[data-value=${symbol}]`)
// 		// await page.click('#sym-328')
// 		await page.waitForTimeout(2000);
// 		// await page.click(`[data-value=${symbol}]`)
// 		// await page.waitForSelector('#symbol-detail-popup', { visible: true })

// 		// await page.evaluate(selector, (selector) => selector.click())
// 		// await page.waitForTimeout(3000)

// 		const bodyHandle = await page.$('body');
// 		const { height } = await bodyHandle.boundingBox();
// 		await bodyHandle.dispose();

// 		// Scroll one viewport at a time, pausing to let content load
// 		const viewportHeight = page.viewport().height;
// 		let viewportIncr = 0;
// 		while (viewportIncr + viewportHeight < height) {
// 			await page.evaluate((_viewportHeight) => {
// 				window.scrollBy(0, _viewportHeight);
// 			}, viewportHeight);
// 			await page.waitForTimeout(2000);
// 			viewportIncr = viewportIncr + viewportHeight;
// 		}

// 		// Scroll back to top
// 		await page.evaluate((_) => {
// 			window.scrollTo(0, 0);
// 		});

// 		// Some extra delay to let all data load
// 		await page.waitForTimeout(1000);

// 		let petrolimexData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Petrolimex';

// 				let date = new Date();
// 				dataJson.timeUpdate =
// 					date.getHours() +
// 					':' +
// 					date.getMinutes() +
// 					':' +
// 					date.getSeconds() +
// 					' ' +
// 					date.getDate() +
// 					'/' +
// 					(date.getMonth() + 1) +
// 					'/' +
// 					date.getFullYear();

// 				const tableElement = $('tbody.product');

// 				dataJson.ron95v_1 = tableElement.querySelector(
// 					'tr:nth-child(1) td:nth-child(2)'
// 				)?.innerText;
// 				dataJson.ron95v_2 = tableElement.querySelector(
// 					'tr:nth-child(1) td:nth-child(3)'
// 				)?.innerText;

// 				dataJson.ron95III_1 = tableElement.querySelector(
// 					'tr:nth-child(2) td:nth-child(2)'
// 				)?.innerText;
// 				dataJson.ron95III_2 = tableElement.querySelector(
// 					'tr:nth-child(2) td:nth-child(3)'
// 				)?.innerText;

// 				dataJson.ron92II_1 = tableElement.querySelector(
// 					'tr:nth-child(3) td:nth-child(2)'
// 				)?.innerText;
// 				dataJson.ron92II_2 = tableElement.querySelector(
// 					'tr:nth-child(3) td:nth-child(3)'
// 				)?.innerText;

// 				dataJson.do0001SV_1 = tableElement.querySelector(
// 					'tr:nth-child(4) td:nth-child(2)'
// 				)?.innerText;
// 				dataJson.do0001SV_2 = tableElement.querySelector(
// 					'tr:nth-child(4) td:nth-child(3)'
// 				)?.innerText;

// 				dataJson.do005SII_1 = tableElement.querySelector(
// 					'tr:nth-child(5) td:nth-child(2)'
// 				)?.innerText;
// 				dataJson.do005SII_2 = tableElement.querySelector(
// 					'tr:nth-child(5) td:nth-child(3)'
// 				)?.innerText;

// 				dataJson.dauhoa_1 = tableElement.querySelector(
// 					'tr:nth-child(6) td:nth-child(2)'
// 				)?.innerText;
// 				dataJson.dauhoa_2 = tableElement.querySelector(
// 					'tr:nth-child(6) td:nth-child(3)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(petrolimexData)

// 		Petrolimex.findOneAndUpdate(
// 			{ name: petrolimexData.name },
// 			{
// 				name: petrolimexData.name,
// 				timeUpdate: petrolimexData.timeUpdate,
// 				ron95v_1: petrolimexData.ron95v_1,
// 				ron95v_2: petrolimexData.ron95v_2,
// 				ron95III_1: petrolimexData.ron95III_1,
// 				ron95III_2: petrolimexData.ron95III_2,
// 				ron92II_1: petrolimexData.ron92II_1,
// 				ron92II_2: petrolimexData.ron92II_2,
// 				do0001SV_1: petrolimexData.do0001SV_1,
// 				do0001SV_2: petrolimexData.do0001SV_2,
// 				do005SII_1: petrolimexData.do005SII_1,
// 				do005SII_2: petrolimexData.do005SII_2,
// 				dauhoa_1: petrolimexData.dauhoa_1,
// 				dauhoa_2: petrolimexData.dauhoa_2,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(petrolimexData.name));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });
