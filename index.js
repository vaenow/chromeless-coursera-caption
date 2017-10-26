const puppeteer = require('puppeteer')
const logger = require('./Logger')
const loginInfo = require('./login_info')
const API = require('./api')

async function run() {
	logger.time('打开浏览器')
	const browser = await puppeteer.launch({headless:false})
	logger.time('打开浏览器')

	logger.time('打开页面')
	const page = await browser.newPage()
	page.setViewport({width: 1024, height: 768}); //1290 800
	await page.setRequestInterceptionEnabled(true);
	page.on('request', interceptedRequest => {
		if (interceptedRequest.url.endsWith('.png') || interceptedRequest.url.endsWith('.jpg'))
			interceptedRequest.abort();
		else
			interceptedRequest.continue();
	});
	await page.goto('https://www.coursera.org/browse')
	
	logger.time('打开页面')

	logger.time('加载页面')
	const loginBtn = ".c-ph-right-nav-button.c-ph-log-in"
	await page.waitForSelector(loginBtn, { timeout: 3 * 1000 })
	logger.time('加载页面')


	logger.time('用户登录')
	await page.click(loginBtn)
	// await page.waitForSelector('input[type=email]', { timeout: 1000 })
	// await page.type('input[type=email]', loginInfo.username, {delay: 100})
	// await page.type('input[type=password]', loginInfo.password, {delay: 100})
	// await page.click('input[data-js=submit]')
	await page.click('input[type=email]')
	await page.type(loginInfo.username, {delay: 100})
	await page.press('Enter')
	await page.click('input[type=password]')
	await page.type(loginInfo.password, {delay: 100})
	await page.click('button[data-js=submit]')
	logger.time('用户登录')

	// const page2 = await browser.newPage()
	// await page2.goto(API.COURSE_WEEKS)





	// browser.close()
}

run()
