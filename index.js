const { timeout } = require('puppeteer');
const puppeteer = require('puppeteer');

const PARSE_CHANNEL = 'name_channel';

const checkStream = async () => {
	let statusStreamNow = false;
	let titleStreamNow = '';
	const browser = await puppeteer.launch({ headless: false });
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
	} catch (error) {
		if (error) console.log('Element not found');
	} finally {
		if (statusStreamNow) {
			titleStreamNow = await page.$eval('.bfNjIO', el => el.innerText);
			console.log(`Stream is on now: ${PARSE_CHANNEL}`);
		} else {
			console.log('Stream is off now');
		}
		await browser.close();
	}
};

checkStream();
