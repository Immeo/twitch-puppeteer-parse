const { timeout } = require('puppeteer');
const puppeteer = require('puppeteer');

const PARSE_CHANNEL = 'name_channel';

const checkStream = async () => {
	let statusStreamNow = false;
	let titleStreamNow = '';
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(`https://www.twitch.tv/${PARSE_CHANNEL}`, {
		waitUntil: 'domcontentloaded'
	});
	try {
		await page.waitForSelector('.bfNjIO', { timeout: 15000 });
		const checkHaveClass = await page.$('.bfNjIO', { timeout: 10000 });

		if (checkHaveClass) {
			statusStreamNow = true;
			console.log('Element found');
		} else {
			console.log(`Element ${checkHaveClass} not found`);
			statusStreamNow = false;
		}

		const titleStream = await page.$eval(
			'h2[data-a-target="stream-title"]',
			el => el.innerText
		);
		return { statusStreamNow, titleStream };
	} catch (error) {
		if (error) console.log(error);
	} finally {
		await browser.close();
	}
};

checkStream().then(res => {
	console.log(res);
});
