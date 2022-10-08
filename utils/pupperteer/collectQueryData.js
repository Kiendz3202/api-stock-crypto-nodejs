const puppeteer = require('puppeteer');

const collectQueryData = async (url, pageEvaluateFunc, props) => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		// await page.setUserAgent(
		// 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		// );
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
		);
		await page.goto(url, { waitUntil: 'load' });
		await page.waitForTimeout(2000);

		if (props) {
			return page
				.evaluate(pageEvaluateFunc, ...props)
				.then(() => browser.close());
		} else {
			return page.evaluate(pageEvaluateFunc).then(() => browser.close());
		}
	} catch (error) {
		console.log('co loi o day' + error);
		return false;
	}
};

const collectQueryDataHeightScroll = async (url, pageEvaluateFunc, props) => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		// await page.setUserAgent(
		// 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		// );
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
		);
		await page.goto(url, { waitUntil: 'load' });

		const bodyHandle = await page.$('body');
		const { height } = await bodyHandle.boundingBox();
		await bodyHandle.dispose();

		// Scroll one viewport at a time, pausing to let content load
		const viewportHeight = page.viewport().height;
		let viewportIncr = 0;
		while (viewportIncr + viewportHeight < height) {
			await page.evaluate((_viewportHeight) => {
				window.scrollBy(0, _viewportHeight);
			}, viewportHeight);
			await page.waitForTimeout(2000);
			viewportIncr = viewportIncr + viewportHeight;
		}

		// Scroll back to top
		await page.evaluate((_) => {
			window.scrollTo(0, 0);
		});

		// Some extra delay to let all data load
		await page.waitForTimeout(1000);

		if (props) {
			return page
				.evaluate(pageEvaluateFunc, ...props)
				.then(() => browser.close());
		} else {
			return page.evaluate(pageEvaluateFunc).then(() => browser.close());
		}
	} catch (error) {
		console.log('co loi o day' + error);
		return false;
	}
};

module.exports = { collectQueryData, collectQueryDataHeightScroll };
